// src/pages/Skills.jsx
import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

const TECH_SKILLS = [
  { name: "AI / Machine Learning", desc: "Have knowledge in how an AI/ML is developed and maintained. Knows the ins and outs of training AI models.", tags: ["Scikit-learn", "Pytorch"] },
  { name: "Data Science",           desc: "Have knowledge on tools that can help dive deep into data.", tags: ["Matplotlib", "NumPy", "Pandas"] },
  { name: "CLI Proficiency",        desc: "Have the knowledge to use Linux/Unix commands in a command line environment.", tags: ["Linux/Unix"] },
  { name: "Software Development",   desc: "Have the knowledge in a software development pipeline, from initial planning up to tests and debugging." },
  { name: "Front-end Development",  desc: "Is able to use tools to make appealing front-end to a software or website.", tags: ["HTML", "JavaScript", "React", "Tailwind CSS"] },
  { name: "Back-end Development",   desc: "Is able to use tools to make a functional back-end environment for a software or website.", tags: ["Python", "C#"] },
  { name: "Database Management",    desc: "Have knowledge on using SQL to manage a database in conjunction with other software.", tags: ["SQL"] },
  { name: "Convolutional Neural Networks", desc: "Have used and trained Convolutional Neural Networks for various tasks.", tags: ["UNet", "YOLO"] },
  { name: "Transformer-Based Models",      desc: "Have used and trained Transformer-Based Models for various tasks.", tags: ["Mask2Former", "Maskformer", "Segformer"] },
  { name: "High Performance Computing",    desc: "Have utilized and ran tasks on a HPC cluster.", tags: ["GPU", "CPU"] },
];

const SOFT_SKILLS = [
  { name: "Communication",   desc: "Can communicate project updates or needs effectively, either verbally, electronically, or having to present to an audience or to a team. Can also properly document workflows." },
  { name: "Teamwork",        desc: "Can work efficiently and cohesively with a team. Can take and give proper critique and code reviews." },
  { name: "Hard-Working",    desc: "Can and will work done. Is willing to go 'above and beyond' and does not shy away from responsibilities or challenges." },
  { name: "Problem Solving", desc: "Can use critical thinking to solve blockers or to create efficient solutions/workflows to a project." },
  { name: "Leadership",      desc: "Can effectively lead a team towards a common goal. Can properly allocate tasks and is able to 'take the reigns' when things go wrong." },
  { name: "Time Management", desc: "Can plan, manage, and execute multiple tasks or projects in a timely manner." },
];

export default function Skills() {
  const [mode, setMode] = React.useState("tech"); // "tech" | "soft"
  const skills = mode === "tech" ? TECH_SKILLS : SOFT_SKILLS;

  const [activeIdx, setActiveIdx] = React.useState(0);

  // TM open/close animation
  const [tmOpen, setTmOpen] = React.useState(true);
  const blinkTM = React.useCallback(() => {
    setTmOpen(false);
    setTimeout(() => setTmOpen(true), 200);
  }, []);

  // LED blink on selection
  const [ledBlink, setLedBlink] = React.useState(false);

  const selectSkill = (i) => {
    setActiveIdx(i);
    blinkTM();
    setLedBlink(true);
    setTimeout(() => setLedBlink(false), 250);
  };

  React.useEffect(() => {
    setActiveIdx(0);
    blinkTM();
  }, [mode, blinkTM]);

  // Theme swap for soft skills
  const isSoft = mode === "soft";
  const tileIdle = isSoft
    ? "bg-[#eaf4ff] border-[#9fbfe6] hover:bg-[#f2f8ff]"
    : "bg-[#fff6d5] border-[#bfae7a] hover:bg-[#ffefbb]";
  const tileActive = isSoft
    ? "bg-[#d7ebff] border-[#7aa7dc] ring-2 ring-[#5f8fc6]"
    : "bg-[#ffe9a6] border-[#b59d4b] ring-2 ring-[#9a7d2b]";

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
            {isSoft ? "Soft Skills" : "Technical Skills"}
          </h1>

          <button
            type="button"
            onClick={() =>
              setMode((m) => (m === "tech" ? "soft" : "tech"))
            }
            className="
              panel px-3 py-2 font-press text-[12px] sm:text-[13px]
              hover:scale-[1.02] active:scale-[0.98] transition-transform
            "
            aria-label="Switch skills category"
          >
            {isSoft ? "◀ Technical Skills" : "▶ Soft Skills"}
          </button>
        </div>

        {/* Body: TM case (left) + skills (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-6 sm:gap-8">
          {/* LEFT: Animated TM Case with teal stripes */}
          <div
            className="panel relative p-4 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.04) 100%), repeating-linear-gradient(180deg,#6fd0cf 0 6px,#63c5c4 6px 12px)",
            }}
          >
            <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px]">
              {/* open */}
              <img
                src={`${BASE}tmcase_open.png`}
                alt=""
                className={`
                  absolute inset-0 w-full h-full object-contain select-none pointer-events-none
                  transition-all duration-200 ease-out
                  ${tmOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-[6px] scale-[0.98]"}
                `}
                draggable={false}
                decoding="async"
              />
              {/* closed */}
              <img
                src={`${BASE}tmcase_closed.png`}
                alt="TM case"
                className={`
                  absolute inset-0 w-full h-full object-contain select-none pointer-events-none
                  transition-all duration-150 ease-in
                  ${tmOpen ? "opacity-0 translate-y-[6px] scale-[1.02]" : "opacity-100 translate-y-0 scale-100"}
                `}
                draggable={false}
                decoding="async"
              />
            </div>

            {/* corner LEDs (blink on selection) */}
            <div className={`absolute left-3 top-3 h-2 w-2 rounded-sm bg-red-500 shadow-[0_0_6px_#f00] ${ledBlink ? "animate-pulse" : ""}`} />
            <div className={`absolute right-3 top-3 h-2 w-2 rounded-sm bg-green-500 shadow-[0_0_6px_#0f0] ${ledBlink ? "animate-pulse" : ""}`} />
          </div>

          {/* RIGHT: Skills list + description */}
          <div
            className={`
              panel p-4 sm:p-5 md:p-6 relative overflow-hidden
              ${isSoft
                ? "bg-gradient-to-b from-[#eaf4ff]/70 via-[#eaf4ff]/55 to-[#eaf4ff]/40"
                : "bg-gradient-to-b from-[#fff6d5]/70 via-[#fff6d5]/55 to-[#fff6d5]/40"}
            `}
          >
            {/* header strip + number */}
            <div className="flex items-center justify-between mb-2">
              <div className="font-press tracking-wide text-[14px] sm:text-[15px]">
                SKILL LIST
              </div>
              <div className="font-press text-[12px] opacity-80">No. 0209</div>
            </div>
            <div className="h-[2px] bg-sky-700/60 mb-3" />

            {/* List — colored like the GBA TM menu */}
            <ul className="grid md:grid-cols-2 gap-3">
              {skills.map((s, i) => {
                const active = i === activeIdx;
                return (
                  <li key={s.name} className="relative">
                    {/* GBA cursor ▶ */}
                    {active && (
                      <span className="absolute -left-4 top-1/2 -translate-y-1/2 font-press text-[14px]">
                        ▶
                      </span>
                    )}
                    <button
                      type="button"
                      onMouseEnter={() => selectSkill(i)}
                      onClick={() => selectSkill(i)}
                      role="option"
                      aria-selected={active}
                      className={`
                        w-full text-left px-3 py-2 font-press text-[13px] tracking-wide
                        rounded-sm border transition
                        ${active ? tileActive : tileIdle}
                        shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)]
                      `}
                    >
                      {s.name}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="my-4 h-[2px] bg-sky-700/60" />

            {/* Description area */}
            <div className="min-h-[92px]">
              <div className="font-press text-[12px] tracking-widest text-gb-800 mb-2">
                MOVE DESCRIPTION
              </div>

              {/* Badges (if present) */}
              {skills[activeIdx]?.tags && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {skills[activeIdx].tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-sm border border-gb-800/60 bg-gb-100 font-press text-[11px] tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-gb-800 leading-relaxed text-[clamp(13px,1.05vw,16px)]">
                {skills[activeIdx]?.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home (own pixel tab) */}
        <div className="mt-6">
          <Link
            to="/"
            className="panel inline-block px-4 py-2 font-press text-[12px] sm:text-[13px]"
          >
            Back to Home
          </Link>
        </div>

        <div className="flex-1" />
      </div>
    </section>
  );
}
