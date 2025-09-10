// src/pages/Skills.jsx
import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

const TECH_SKILLS = [
  { name: "JavaScript / TypeScript", desc: "Modern ESNext, strong typing with TS, modules, tooling, and patterns (FP-lite, composition over inheritance)." },
  { name: "React / Vite", desc: "Hooks, context, suspense, performant rendering, code-splitting, and DX with Vite + SWC/ESBuild." },
  { name: "Tailwind / CSS", desc: "Utility-first styling, responsive design, custom themes, and accessible component patterns." },
  { name: "Python / ML", desc: "NumPy, Pandas, scikit-learn, Matplotlib; data prep, modeling, and quick visualization." },
  { name: "Node / APIs", desc: "Express/Fastify, REST patterns, auth, validation, and structured logging." },
  { name: "SQL / Data", desc: "PostgreSQL basics, schema design, aggregate queries, and query optimization 101." },
];

const SOFT_SKILLS = [
  { name: "Communication", desc: "Clear async updates, concise documentation, and audience-aware presentations." },
  { name: "Teamwork", desc: "Pairing, code reviews that enable, and respectful disagreement + resolution." },
  { name: "Ownership", desc: "Drive tasks from spec to ship; follow-through, testing, and post-ship care." },
  { name: "Problem Solving", desc: "Decompose, prioritize, and iterate with tight feedback loops." },
  { name: "Leadership", desc: "Mentoring, setting quality bars, and unblocking teammates." },
  { name: "Time Management", desc: "Plan, estimate, and protect focus with healthy defaults." },
];

export default function Skills() {
  const [mode, setMode] = React.useState<"tech" | "soft">("tech");
  const skills = mode === "tech" ? TECH_SKILLS : SOFT_SKILLS;

  const [activeIdx, setActiveIdx] = React.useState(0);

  // TM open/close "blink"
  const [tmOpen, setTmOpen] = React.useState(true);
  const blinkTM = React.useCallback(() => {
    setTmOpen(false);
    // quick close-open pulse (tweak 180–260ms)
    setTimeout(() => setTmOpen(true), 220);
  }, []);

  const selectSkill = (i: number) => {
    setActiveIdx(i);
    blinkTM();
  };

  // also blink when switching tabs
  React.useEffect(() => {
    setActiveIdx(0);
    blinkTM();
  }, [mode, blinkTM]);

  return (
    <section
      className="
        mx-auto
        max-w-[1200px] md:max-w-[1320px] lg:max-w-[1400px]
        px-4 sm:px-6 lg:px-8
      "
    >
      <div
        className="
          panel
          mt-6 sm:mt-10
          p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14
          min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh]
          flex flex-col
        "
      >
        {/* Header row: title + mode switch */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <h1 className="font-press leading-[1.1] text-[clamp(22px,3.2vw,44px)]">
            {mode === "tech" ? "Technical Skills" : "Soft Skills"}
          </h1>

          <button
            type="button"
            onClick={() => setMode((m) => (m === "tech" ? "soft" : "tech"))}
            className="
              panel px-3 py-2 font-press text-[12px] sm:text-[13px]
              hover:scale-[1.02] active:scale-[0.98] transition-transform
            "
            aria-label="Switch skills category"
          >
            {mode === "tech" ? "▶ Soft Skills" : "◀ Technical Skills"}
          </button>
        </div>

        {/* Body: TM case (left) + skills (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-6 sm:gap-8">
          {/* LEFT: Animated TM Case */}
          <div className="panel relative p-4 flex items-center justify-center">
            <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px]">
              {/* OPEN sprite */}
              <img
                src={`${BASE}tm_open.png`}
                alt=""
                className={`
                  absolute inset-0 w-full h-full object-contain select-none pointer-events-none
                  transition-opacity duration-150 ${tmOpen ? "opacity-100" : "opacity-0"}
                `}
                draggable={false}
                decoding="async"
              />
              {/* CLOSED sprite */}
              <img
                src={`${BASE}tm_closed.png`}
                alt="TM case"
                className={`
                  absolute inset-0 w-full h-full object-contain select-none pointer-events-none
                  transition-opacity duration-120 ${tmOpen ? "opacity-0" : "opacity-100"}
                `}
                draggable={false}
                decoding="async"
              />
            </div>

            {/* decorative little shelf lights */}
            <div className="absolute left-3 top-3 h-2 w-2 bg-red-500 shadow-[0_0_6px_#f00]" />
            <div className="absolute right-3 top-3 h-2 w-2 bg-green-500 shadow-[0_0_6px_#0f0]" />
          </div>

          {/* RIGHT: Skills list + description */}
          <div
            className="
              panel p-4 sm:p-5 md:p-6 relative overflow-hidden
              bg-gradient-to-b from-sky-200/45 via-sky-100/50 to-sky-50
            "
          >
            {/* List */}
            <ul className="grid md:grid-cols-2 gap-3">
              {skills.map((s, i) => {
                const active = i === activeIdx;
                return (
                  <li key={s.name}>
                    <button
                      type="button"
                      onMouseEnter={() => selectSkill(i)}
                      onClick={() => selectSkill(i)}
                      className={`
                        panel w-full text-left px-3 py-2
                        font-press text-[13px] tracking-wide
                        transition
                        ${active ? "ring-2 ring-sky-700 shadow-md" : "opacity-90 hover:opacity-100"}
                      `}
                    >
                      {s.name}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Divider */}
            <div className="my-4 h-[2px] bg-sky-700/60" />

            {/* Description */}
            <div className="min-h-[84px]">
              <div className="font-press text-[12px] tracking-widest text-gb-800 mb-1">
                MOVE DESCRIPTION
              </div>
              <p className="text-gb-800 leading-relaxed text-[clamp(13px,1.05vw,16px)]">
                {skills[activeIdx]?.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6">
          <Link to="/" className="btn-ghost">Back to Home</Link>
        </div>

        <div className="flex-1" />
      </div>
    </section>
  );
}
