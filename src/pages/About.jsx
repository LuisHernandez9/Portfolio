// src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

export default function About() {
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
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <h1 className="font-press leading-[1.1] text-[clamp(22px,3.2vw,44px)]">
            About Me
          </h1>
          <p className="mt-3 text-gb-700 leading-relaxed max-w-[75ch] text-[clamp(14px,1.2vw,18px)]">
            Learn more about me, where I'm from, and my interests.
          </p>
        </header>

        {/* Pokédex body */}
        <div className="grid w-full grid-cols-1 md:grid-cols-[340px,1fr] gap-6 sm:gap-8">
          {/* LEFT: portrait “dex screen” */}
          <div className="panel p-3 sm:p-4 flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-square bg-[#cfeff0]/40 flex items-center justify-center">
              <img
                src={`${BASE}me.jpg`}
                alt="Trainer portrait"
                className="pixelated max-h-full max-w-full object-contain"
              />
              {/* corner lights */}
              <div className="absolute left-2 top-2 h-2 w-2 bg-red-500 shadow-[0_0_6px_#f00]" />
              <div className="absolute right-2 top-2 h-2 w-2 bg-green-500 shadow-[0_0_6px_#0f0]" />
            </div>
          </div>

          {/* RIGHT: stats */}
          <div className="panel p-4 sm:p-5 md:p-6 relative overflow-hidden">
            {/* glossy header + title */}
            <div className="relative">
              {/* gloss strip */}
              <div className="absolute inset-x-0 -top-2 h-6 bg-gradient-to-b from-white/45 to-transparent rounded-sm pointer-events-none" />
              <div className="font-press tracking-wide text-[14px] sm:text-[15px]">
                Trainer Stats
              </div>
              <div className="mt-1 h-[2px] bg-sky-700/60" />
            </div>

            <ul className="mt-3 divide-y divide-gb-600/30">
              <StatRow label="NAME"            value="Luis E. Hernandez" />
              <StatRow label="SCHOOL"          value="Fayetteville State University" />
              <StatRow label="EDUCATION"       value="B.S. in Computer Science, Minor in Cybersecurity" />
              <StatRow
                label="TYPE"
                value={
                  <div className="flex flex-wrap gap-2">
                    <TypeBadge variant="orange">ASIAN</TypeBadge>
                  </div>
                }
              />
              <StatRow label="HEIGHT"          value={`6'0"`} />
              <StatRow label="CURRENT REGION"  value="Fayetteville, NC" />
              <StatRow
                label="INTERESTS"
                value="AI/ML, Data Science, Computer Hardware/Software, Gaming, Anime, Sports, Working Out, Food"
              />
            </ul>
          </div>
        </div>

        {/* Description strip */}
        <div className="mt-6 sm:mt-8 panel p-4 sm:p-5 md:p-6">
          <p className="text-gb-700 leading-relaxed text-[clamp(13px,1.05vw,16px)]">
            Born and raised in Saudi Arabia, Luis moved to the US back in 2022.
            He entered Fayetteville State University as a freshman in Fall 2022 and earned his Bachelor's Degree in
            Computer Science with a Minor in Cybersecurity as Suma Cum Laude in Spring 2025. Some highlights of his academic life include
            being a 3-time Chancellor's List Honoree, having maintained a <strong className="font-press font-bold">3.96 GPA</strong> throughout his time in college, and a <strong className="font-press font-bold">Summer 2024 Internship with NASA Jet Propulsion Laboratory</strong>.
            Known for his <strong className="font-press font-bold">hardworking and fast-learning nature</strong>, Luis usually stays indoors
            and works on <strong className="font-press font-bold">AI/ML, Data Science, and Software Development projects</strong>. When outside, Luis can usually be spotted eating food or
            playing basketball, a sport rumored to be his favorite. Other interests of Luis includes maintaining computer systems, having built
            3 computers from parts, playing games, working out, and watching/reading his favorite animes.
          </p>
        </div>

        {/* Bottom-left "Back to Home" tab */}
        <div className="mt-4">
          <Link to="/" className="panel inline-block px-4 py-2">
            <span className="font-press tracking-wider text-[12px] sm:text-[13px]">Back to Home</span>
          </Link>
        </div>

        <div className="flex-1" />
      </div>
    </section>
  );
}

/* Helpers */
function StatRow({ label, value }) {
  return (
    <li className="py-2 sm:py-2.5 flex items-center justify-between gap-4">
      {/* LABEL: bold, caps, smaller */}
      <span className="font-press uppercase font-bold tracking-widest text-gb-800 text-[11px] sm:text-[12px]">
        {label}
      </span>
      {/* VALUE: a bit smaller than before */}
      <span className="font-press tracking-wide text-[12px] sm:text-[13px] text-right">
        {value}
      </span>
    </li>
  );
}

function TypeBadge({ children, variant = "default" }) {
  const styles =
    variant === "orange"
      ? "bg-orange-500 border-orange-700 text-white"
      : "bg-gb-100 border-gb-800/60 text-gb-900";

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-1
        rounded-sm border ${styles}
        font-press text-[12px] tracking-widest
        shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)]
      `}
    >
      {children}
    </span>
  );
}
