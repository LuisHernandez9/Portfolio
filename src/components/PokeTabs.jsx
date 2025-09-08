import React from "react";
import { Link } from "react-router-dom";

/** Inline Pokéball SVG */
function PokeBall({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="half">
          <rect x="0" y="0" width="100" height="50" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="48" fill="#1C3B4A" />
      <circle cx="50" cy="50" r="44" fill="#F8F8F0" />
      <g clipPath="url(#half)">
        <circle cx="50" cy="50" r="44" fill="#D64545" />
      </g>
      <rect x="6" y="46" width="88" height="8" fill="#1C3B4A" />
      <circle cx="50" cy="50" r="18" fill="#1C3B4A" />
      <circle cx="50" cy="50" r="14" fill="#F8F8F0" />
      <circle cx="50" cy="50" r="8"  fill="#CFE0E6" />
    </svg>
  );
}

function PokeTab({ to, align = "left", label }) {
  const isLeft = align === "left";

  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"} w-full`}>
      {/* group = lets the ball react to tab hover too */}
      <div className="relative group w-[min(680px,50vw)] h-12 sm:h-14">
        {/* Tab (bar) */}
        <Link
          to={to}
          className="relative flex h-full w-full items-center justify-center
                     bg-[var(--poke-panel)] border-2 border-[var(--poke-border)]
                     shadow-[0_0_0_2px_var(--poke-border),0_0_0_4px_var(--poke-panel),0_0_0_6px_var(--poke-border)]
                     rounded-[0.25rem] focus:outline-none focus:ring-2 focus:ring-offset-2
                     focus:ring-[var(--poke-border)] focus:ring-offset-transparent
                     transition-transform duration-150 ease-out
                     group-hover:-translate-y-[1px]"
          aria-label={label}
        >
          <span className="font-press text-[12px] sm:text-[14px] text-gb-800">
            {label}
          </span>
        </Link>

        {/* Pokéball — reacts to ball hover AND bar (group) hover; no layout shift */}
        <Link
          to={to}
          aria-label={label}
          className={[
            "absolute top-1/2 -translate-y-1/2 z-30 will-change-transform",
            // push farther out so scaling never touches the bar/neighbor
            isLeft ? "-right-24 sm:-right-28" : "-left-24 sm:-left-28",
            "transition-transform duration-150 ease-out",
            "group-hover:translate-y-[-2px] group-hover:scale-[1.05]",
            "hover:scale-[1.07] hover:-rotate-3",
          ].join(" ")}
        >
          <PokeBall className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow pixelated" />
        </Link>
      </div>
    </div>
  );
}

export default function PokeTabs() {
  return (
    {/* clip any off-canvas transform so no horizontal scrollbar is created */}
    <div className="mx-auto max-w-6xl px-4 mt-10 space-y-16 sm:space-y-20 overflow-hidden">
      <PokeTab to="/projects" align="left"  label="Projects" />
      <PokeTab to="/skills"   align="right" label="Skills" />
      <PokeTab to="/about"    align="left"  label="About" />
    </div>
  );
}
