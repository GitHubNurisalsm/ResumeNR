import Orb from "./components/Orb";
import PrintButton from "./components/PrintButton";
import SkillCube from "./components/SkillCube";
import Tilt from "./components/Tilt";
import { education, jobs, languages, profile, projects, skills, stats } from "./data/resume";

const nav = [
  { href: "#about", label: "Обо мне" },
  { href: "#experience", label: "Опыт" },
  { href: "#skills", label: "Навыки" },
  { href: "#projects", label: "Проекты" },
  { href: "#contact", label: "Контакты" },
];

function SectionHead({ index, title }: { index: string; title: string }) {
  return (
    <div className="section-head mb-12 flex items-baseline gap-4 print:mb-5 print:pb-3 border-b border-[var(--line)] pb-5">
      <span className="font-mono text-sm text-[var(--accent)]">{index}</span>
      <h2 className="font-display text-3xl tracking-tight sm:text-4xl print:text-2xl">{title}</h2>
    </div>
  );
}

export default function Home() {
  const initials = profile.firstName[0] + profile.lastName[0];
  const allTech = [...new Set(jobs.flatMap((j) => j.stack).concat(skills.flatMap((s) => s.items)))];
  const telegramUrl = `https://t.me/${profile.telegram.replace("@", "")}`;
  const phoneUrl = `tel:${profile.phone.replace(/\s/g, "")}`;
  const githubShort = profile.github.replace("https://", "");
  const hasEmail = profile.email.includes("@");

  return (
    <>
      <header className="no-print fixed inset-x-0 top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="font-display text-sm tracking-widest" aria-label="Наверх">
            {initials}
            <span className="text-[var(--accent)]">.</span>
          </a>
          <nav className="hidden gap-7 text-sm text-[var(--muted)] md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-[var(--ink)]">
                {n.label}
              </a>
            ))}
          </nav>
          <PrintButton />
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ---------- Hero ---------- */}
        <section className="relative grid min-h-[100svh] items-center print:min-h-0 gap-8 pt-24 pb-16 lg:grid-cols-[1.1fr_1fr] print:pt-0 print:pb-4">
          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {profile.status}
            </div>

            <h1 className="font-display text-[clamp(2rem,8.6vw,4.2rem)] lg:text-[clamp(2.6rem,4.6vw,4.2rem)] print:text-5xl leading-[0.95] font-semibold tracking-tight">
              {profile.firstName}
              <br />
              <span className="text-[var(--muted)]">{profile.lastName}</span>
            </h1>

            <p className="mt-6 font-mono text-sm tracking-wide text-[var(--accent)]">
              {"// "}
              {profile.role}
            </p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-[var(--muted)]">{profile.pitch}</p>

            <div className="no-print mt-10 flex flex-wrap gap-3">
              <a href={telegramUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                Написать в Telegram
              </a>
              <a href="#experience" className="btn btn-ghost">
                Смотреть опыт ↓
              </a>
            </div>

            <dl className="mt-14 grid max-w-md grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="label">Локация</dt>
                <dd className="mt-1.5">{profile.location}</dd>
              </div>
              <div>
                <dt className="label">Телефон</dt>
                <dd className="mt-1.5">
                  <a href={phoneUrl} className="hover:text-[var(--accent)]">
                    {profile.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="no-print relative aspect-square w-full max-w-[560px] justify-self-center lg:justify-self-end">
            <div className="absolute inset-[18%] rounded-full bg-[var(--accent)] opacity-[0.12] blur-[90px]" />
            <Orb />
          </div>
        </section>

        {/* ---------- Бегущая строка стека ---------- */}
        <div className="no-print -mx-4 overflow-hidden border-y border-[var(--line)] py-5 sm:-mx-6" aria-hidden="true">
          <div className="marquee">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0">
                {allTech.map((t) => (
                  <span key={t} className="font-display px-6 text-2xl whitespace-nowrap text-[var(--muted)]">
                    {t} <span className="pl-6 text-[var(--accent)]">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Обо мне ---------- */}
        <section id="about" className="reveal py-28">
          <SectionHead index="01" title="Обо мне" />
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] print:grid-cols-[1.4fr_1fr] print:gap-6 print:text-base">
            <div className="space-y-5 text-lg leading-relaxed sm:text-xl">
              {profile.about.map((p, i) => (
                <p key={i} className={i === 0 ? "" : "text-[var(--muted)]"}>
                  {p}
                </p>
              ))}
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] break-inside-avoid self-start">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-5 bg-[var(--bg)] p-6">
                  <span className="font-display text-4xl text-[var(--accent)]">{s.value}</span>
                  <span className="text-sm text-[var(--muted)]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Опыт ---------- */}
        <section id="experience" className="py-28">
          <SectionHead index="02" title="Опыт" />
          <ol className="space-y-6">
            {jobs.map((job) => (
              <li key={job.company + job.period} className="reveal">
                <Tilt max={4} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-9 print:p-5">
                  <div className="grid gap-8 md:grid-cols-[220px_1fr] print:grid-cols-[120px_1fr] print:gap-5">
                    <div>
                      <p className="font-mono text-sm text-[var(--accent)]">{job.period}</p>
                      <p className="mt-2 text-sm text-[var(--muted)]">{job.place}</p>
                    </div>
                    <div className="lift">
                      <h3 className="font-display text-xl sm:text-2xl">{job.role}</h3>
                      <p className="mt-1 text-[var(--muted)]">
                        {job.link ? (
                          <a href={job.link} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">
                            {job.company} ↗
                          </a>
                        ) : (
                          job.company
                        )}
                      </p>
                      <p className="mt-5 leading-relaxed">{job.summary}</p>
                      <ul className="mt-5 space-y-2.5">
                        {job.wins.map((w) => (
                          <li key={w} className="flex gap-3 leading-relaxed text-[var(--muted)]">
                            <span className="mt-[0.6em] h-px w-4 shrink-0 bg-[var(--accent)]" />
                            {w}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {job.stack.map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Навыки ---------- */}
        <section id="skills" className="reveal py-28">
          <SectionHead index="03" title="Навыки" />
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.3fr]">
            <div className="no-print flex flex-col items-center gap-6">
              <SkillCube groups={skills} />
              <p className="label">Потяни куб ← →</p>
            </div>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 print:grid-cols-3 print:gap-y-5">
              {skills.map((g) => (
                <div key={g.title}>
                  <h3 className="label mb-3 !text-[var(--ink)]">{g.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Проекты ---------- */}
        <section id="projects" className="py-28">
          <SectionHead index="04" title="Проекты" />
          <div className="grid gap-6 md:grid-cols-2 print:grid-cols-2 print:gap-4">
            {projects.map((p, i) => (
              <Tilt
                key={p.name}
                className="reveal group flex min-h-72 flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7 print:min-h-0 print:p-5"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-[var(--muted)]">0{i + 1}</span>
                  <span className="chip">{p.kind}</span>
                </div>
                <div className="lift mt-auto pt-10 print:pt-3">
                  <h3 className="font-display text-2xl transition-colors group-hover:text-[var(--accent)]">
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noreferrer">
                        {p.name} <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[var(--muted)]">{p.about}</p>
                  <p className="mt-5 font-mono text-xs text-[var(--muted)]">{p.stack.join(" / ")}</p>
                </div>
              </Tilt>
            ))}
          </div>
        </section>

        {/* ---------- Образование и языки ---------- */}
        <section id="education" className={`reveal grid gap-16 py-28 ${languages.length ? "md:grid-cols-2" : ""}`}>
          <div>
            <SectionHead index="05" title="Образование" />
            <ol className={`grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] break-inside-avoid ${languages.length ? "" : "md:grid-cols-3 print:grid-cols-3"}`}>
              {education.map((e, i) => (
                <li key={e.place} className="bg-[var(--bg)] p-6">
                  <span className="font-mono text-sm text-[var(--accent)]">{e.period ?? `0${i + 1}`}</span>
                  <h3 className="font-display mt-6 text-xl">{e.place}</h3>
                  {e.degree && <p className="mt-1 text-[var(--muted)]">{e.degree}</p>}
                </li>
              ))}
            </ol>
          </div>
          {languages.length > 0 && (
            <div>
              <SectionHead index="06" title="Языки" />
              <ul className="space-y-4">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-baseline justify-between gap-4 border-b border-dashed border-[var(--line)] pb-4">
                    <span className="font-display text-lg">{l.name}</span>
                    <span className="text-right text-sm text-[var(--muted)]">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>

      {/* ---------- Контакты ---------- */}
      <footer id="contact" className="border-t border-[var(--line)]">
        <div className="reveal mx-auto max-w-6xl px-4 py-28 sm:px-6">
          <p className="label">Давай поработаем вместе</p>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="font-display mt-6 block text-[clamp(2rem,7vw,5.5rem)] print:text-4xl leading-none tracking-tight break-words transition-colors hover:text-[var(--accent)]"
          >
            {profile.telegram}
          </a>
          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <a href={phoneUrl} className="hover:text-[var(--accent)]">
              <span className="label mr-3">Тел</span>
              {profile.phone}
            </a>
            {hasEmail && (
              <a href={`mailto:${profile.email}`} className="hover:text-[var(--accent)]">
                <span className="label mr-3">Mail</span>
                {profile.email}
              </a>
            )}
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">
              <span className="label mr-3">GH</span>
              {githubShort}
            </a>
          </div>
          <p className="mt-20 font-mono text-xs text-[var(--muted)]">
            © 2026 {profile.firstName} {profile.lastName}. Собрано руками на Next.js.
          </p>
        </div>
      </footer>
    </>
  );
}
