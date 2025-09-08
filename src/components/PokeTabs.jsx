import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL; // "/Portfolio/" on GitHub Pages

/** Pixel Pokéball that switches closed → open on hover/focus */
function SpriteBall({ className = "", alt = "Pokéball" }) {
  const closed = `${BASE}closed_poke.png`;
  const open   = `${BASE}open_poke.png`;

  return (
    <span className={`relative inline-block select-none ${className}`} aria-hidden="true">
      {/* closed state */}
      <img
        src={closed}
        alt=""
        className="block w-full h-full pixelated transition-opacity duration-150 ease-out 
                   group-hover:opacity-0 group-focus-visible:opacity-0"
        draggable="false"
      />
      {/* open state */}
      <img
        src={open}
        alt={alt}
        className="block w-full h-full pixelated absolute inset-0 opacity-0 
                   transition-opacity duration-150 ease-out 
                   group-hover:opacity-100 group-focus-visible:opacity-100"
        draggable="false"
      />
    </span>
  );
}

function PokeTab({ to, align = "left", label }) {
  const isLeft = align === "left";

  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"} w-full`}>
      {/* group = hover/focus propagates to SpriteBall */}
      <div className="relative group w-[min(680px,50vw)] h-12 sm:h-14">
        {/* Tab (label visible) */}
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

        {/* Pokéball positioned outside the bar */}
        <Link
          to={to}
          aria-label={label}
          className={[
            "absolute top-1/2 -translate-y-1/2 z-30",
            isLeft ? "-right-20 sm:-right-24" : "-left-20 sm:-left-24",
            "outline-none focus-visible:ring-2 ring-[var(--poke-border)] rounded",
          ].join(" ")}
        >
          <SpriteBall className="w-12 h-12 sm:w-14 sm:h-14" alt={`${label} tab`} />
        </Link>
      </div>
    </div>
  );
}

export default function PokeTabs() {
  return (
    <div className="mx-auto max-w-6xl px-4 mt-10 space-y-16 sm:space-y-20 overflow-hidden">
      <PokeTab to="/projects" align="left"  label="Projects" />
      <PokeTab to="/skills"   align="right" label="Skills" />
      <PokeTab to="/about"    align="left"  label="About" />
    </div>
  );
}
