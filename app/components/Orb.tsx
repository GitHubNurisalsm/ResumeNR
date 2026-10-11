"use client";

import { useEffect, useRef } from "react";

const DOTS = 900;
const RING = 160;

// Равномерно раскидываем точки по сфере (спираль Фибоначчи)
function sphere(n: number) {
  const out: [number, number, number][] = [];
  const step = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    out.push([Math.cos(step * i) * r, y, Math.sin(step * i) * r]);
  }
  return out;
}

function ring(n: number, radius: number, tilt: number) {
  const out: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const x = Math.cos(a) * radius;
    const z = Math.sin(a) * radius;
    out.push([x, z * Math.sin(tilt), z * Math.cos(tilt)]);
  }
  return out;
}

export default function Orb() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dots = sphere(DOTS);
    const orbit = ring(RING, 1.45, 0.45);
    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue("--ink").trim() || "#ecebe6";
    const accent = css.getPropertyValue("--accent").trim() || "#ff6a3d";
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let mouseX = 0;
    let mouseY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let frame = 0;
    let onScreen = true;

    function resize() {
      const box = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.width;
      h = box.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function project(p: [number, number, number], ay: number, ax: number, wobble: number) {
      const [x0, y0, z0] = p;
      const x = x0 * wobble;
      const y = y0 * wobble;
      const z = z0 * wobble;
      // поворот вокруг Y, потом вокруг X
      const x1 = x * Math.cos(ay) - z * Math.sin(ay);
      const z1 = x * Math.sin(ay) + z * Math.cos(ay);
      const y1 = y * Math.cos(ax) - z1 * Math.sin(ax);
      const z2 = y * Math.sin(ax) + z1 * Math.cos(ax);
      const persp = 2.8 / (2.8 + z2);
      return { x: x1 * persp, y: y1 * persp, z: z2, s: persp };
    }

    function draw(t: number) {
      smoothX += (mouseX - smoothX) * 0.04;
      smoothY += (mouseY - smoothY) * 0.04;

      const ay = 0.6 + t * 0.00012 + smoothX * 1.1;
      const ax = -0.35 + smoothY * 0.7;
      const R = Math.min(w, h) * 0.34;
      const cx = w / 2;
      const cy = h / 2;

      ctx!.clearRect(0, 0, w, h);

      for (const p of dots) {
        // лёгкое «дыхание» поверхности, чтобы сфера не выглядела мёртвой
        const wob = 1 + 0.07 * Math.sin(p[0] * 4 + t * 0.0011) * Math.cos(p[1] * 3 + t * 0.0008);
        const q = project(p, ay, ax, wob);
        const near = (1 - q.z) / 2; // 0 — дальняя сторона, 1 — ближняя
        const size = (0.5 + near * 1.7) * q.s;

        ctx!.globalAlpha = 0.08 + near * 0.9;
        ctx!.fillStyle = near > 0.86 ? accent : ink;
        ctx!.beginPath();
        ctx!.arc(cx + q.x * R, cy + q.y * R, size, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (let i = 0; i < orbit.length; i++) {
        const q = project(orbit[i], ay * 0.6 + t * 0.0003, ax, 1);
        const near = (1 - q.z / 1.45) / 2;
        ctx!.globalAlpha = 0.1 + near * 0.5;
        ctx!.fillStyle = ink;
        ctx!.fillRect(cx + q.x * R, cy + q.y * R, 1.2, 1.2);
      }

      // спутник на орбите
      const sat = project(orbit[Math.floor((t * 0.02) % RING)], ay * 0.6 + t * 0.0003, ax, 1);
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = accent;
      ctx!.beginPath();
      ctx!.arc(cx + sat.x * R, cy + sat.y * R, 3.5 * sat.s, 0, Math.PI * 2);
      ctx!.fill();
    }

    function loop(t: number) {
      if (onScreen) draw(t);
      frame = requestAnimationFrame(loop);
    }

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    const ro = new ResizeObserver(() => {
      resize();
      if (still) draw(0);
    });

    resize();
    io.observe(canvas);
    ro.observe(canvas);

    if (still) {
      draw(0);
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="h-full w-full" aria-hidden="true" />;
}
