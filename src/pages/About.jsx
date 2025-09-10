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
              {/* put me.jpg in /public (or adjust path) */}
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
          <div className="panel p-4 sm:p-5 md:p-6">
            <div className="font-press mb-3 tracking-wide text-[15px]">Trainer Stats</div>

            <ul className="divide-y divide-gb-600/30">
              <StatRow label="Name" value="Luis E. Hernandez" />
              <StatRow label="School" value="Fayetteville State University" />
              <StatRow label="Education" value="B.S. in Computer Science, Minor in Cybersecurity" />
              <StatRow
                label="Type"
                value={
                  <div className="flex flex-wrap gap-2">
                    <TypeBadge>ASIAN</TypeBadge>
                  </div>
                }
              />
              <StatRow label="Height" value={`6'0"`} />
              <StatRow label="Current Region" value="Fayetteville, NC" />
              <StatRow label="Interests" value="AI/ML, Data Science, Computer Hardware/Software, Gaming, Anime, Sports, Working Out, Food" />
            </ul>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/" className="btn-ghost">Back to Home</Link>
            </div>
          </div>
        </div>

        {/* Description strip */}
        <div className="mt-6 sm:mt-8 panel p-4 sm:p-5 md:p-6">
          <p className="text-gb-700 leading-relaxed text-[clamp(14px,1.1vw,17px)]">
            Born and raised in Saudi Arabia, Luis moved to the US back in 2022.
            He entered Fayetteville State University as a freshman in Fall 2022 and earned his Bachelor's Degree in
            Computer Science with a Minor in Cybersecurity as Suma Cum Laude in Spring 2025. Some highlights of his academic life include
            being a 3-time Chancellor's List Honoree, having maintained a 3.96 GPA throughout his time in college, and a Summer 2024
            Internship with NASA Jet propulsion Laboratory. Known for his hardworking and fast-learning nature, Luis usually stays indoors
            and works on AI/ML, Data Science, and Software Development projects. When outside, Luis can usually be spotted eating food or
            playing basketball, a sport rumored to be his favorite. Other interests of Luis includes maintaining computer systems, having built
            3 computers from parts, playing games, working out, and watching/reading his favorite animes.
          </p>
        </div>

        <div className="flex-1" />
      </div>
    </section>
  );
}

/* Helpers */
function StatRow({ label, value }) {
  return (
    <li className="py-2.5 sm:py-3 flex items-center justify-between gap-4">
      <span className="text-gb-700">{label}</span>
      <span className="font-press tracking-wide text-[14px] sm:text-[15px] text-right">
        {value}
      </span>
    </li>
  );
}

function TypeBadge({ children }) {
  return (
    <span
      className="
        inline-flex items-center px-2.5 py-1
        rounded-sm border border-gb-800/60 bg-gb-100
        font-press text-[12px] tracking-widest
        shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)]
      "
    >
      {children}
    </span>
  );
}
