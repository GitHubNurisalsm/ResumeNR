"use client";

import { useEffect, useRef } from "react";
import type { SkillGroup } from "../data/resume";

const FACES = [
  "rotateY(0deg)",
  "rotateY(90deg)",
  "rotateY(180deg)",
  "rotateY(-90deg)",
  "rotateX(90deg)",
  "rotateX(-90deg)",
];

export default function SkillCube({ groups }: { groups: SkillGroup[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const cube = cubeRef.current;
    if (!stage || !cube) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const idleSpeed = still ? 0 : 0.12;

    let rx = -20;
    let ry = 35;
    let vx = 0;
    let vy = idleSpeed;
    let drag: { x: number; y: number } | null = null;
    let frame = 0;

    const apply = () => {
      cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };

    const tick = () => {
      if (!drag) {
        rx += vx;
        ry += vy;
        vx *= 0.94;
        // после броска плавно возвращаемся к медленному вращению
        vy += (idleSpeed - vy) * 0.02;
      }
      apply();
      frame = requestAnimationFrame(tick);
    };

    const down = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY };
      stage.setPointerCapture(e.pointerId);
      stage.dataset.grabbing = "";
    };

    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag = { x: e.clientX, y: e.clientY };
      ry += dx * 0.45;
      rx -= dy * 0.45;
      vy = dx * 0.45;
      vx = -dy * 0.45;
    };

    const up = () => {
      drag = null;
      delete stage.dataset.grabbing;
    };

    const key = (e: KeyboardEvent) => {
      const step = 15;
      if (e.key === "ArrowLeft") ry -= step;
      else if (e.key === "ArrowRight") ry += step;
      else if (e.key === "ArrowUp") rx += step;
      else if (e.key === "ArrowDown") rx -= step;
      else return;
      e.preventDefault();
      vx = 0;
      vy = 0;
      apply();
    };

    stage.addEventListener("pointerdown", down);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);
    stage.addEventListener("keydown", key);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointerdown", down);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerup", up);
      stage.removeEventListener("pointercancel", up);
      stage.removeEventListener("keydown", key);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="cube-stage"
      tabIndex={0}
      role="group"
      aria-label="Куб навыков — покрутите мышкой или стрелками"
    >
      <div ref={cubeRef} className="cube">
        {groups.slice(0, 6).map((g, i) => (
          <div key={g.title} className="cube-face" style={{ transform: `${FACES[i]} translateZ(var(--half))` }}>
            <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent)] uppercase">
              0{i + 1}
            </span>
            <span className="font-display text-xl">{g.title}</span>
            <span className="text-xs leading-relaxed text-[var(--muted)]">{g.items.slice(0, 4).join(" · ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
