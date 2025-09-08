import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL; // "/Portfolio/" on GitHub Pages

/** Pixel Pokéball that switches closed → open with a snap (CSS in index.css) */
function SpriteBall({ className = "", alt = "Pokéball" }) {
  const closed = `${BASE}closed_poke.png`;
  const open   = `${BASE}open_poke.png`;

  return (
    <span className={`relative inline-block select-none ${className}`} aria-hidden="true">
      <img
        src={closed}
        alt=""
        className="block w-full h-full pixelated transition-opacity duration-150 ease-out 
                   group-hover:opacity-0 group-focus-visible:opacity-0"
        draggable="false"
      />
      <img
        src={open}
        alt={alt}
        className="poke-open-sprite block w-full h-full pixelated absolute inset-0 opacity-0 
                   transition-opacity duration-150 ease-out 
                   group-hover:opacity-100 group-focus-visible:opacity-100"
        draggable="false"
      />
    </span>
  );
}

function PokeTab({ to, align = "left", label }) {
  const isLeft = align === "left";

  // High-contrast tab surface so it doesn’t blend with bg
  const TAB_BG = "rgba(247,244,232,0.96)";
  const scanlines =
    "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 4px)";

  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"} w-full`}>
      <div className="relative group w-[min(760px,60vw)] h-14 sm:h-16">
        <Link
          to={to}
          className="
            relative flex h-full w-full items-center justify-center
            rounded-[12px]
            border-[3px] border-[#0f2e3a]
            shadow-[0_0_0_4px_#F7F4E8,0_0_0_7px_#0f2e3a]
            focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-[#0f2e3a] focus:ring-offset-transparent
            transition-transform duration-150 ease-out
            group-hover:-translate-y-[1px]
          "
          style={{ backgroundColor: TAB_BG, backgroundImage: scanlines }}
          aria-label={label}
        >
          <span className="font-press text-[14px] sm:text-[16px] text-[#0b2833]">
            {label}
          </span>
        </Link>

        {/* Pixel Pokéball just outside the bar */}
        <Link
          to={to}
          aria-label={label}
          className={[
            "poke-ball absolute top-1/2 -translate-y-1/2 z-30",
            // nudged a touch closer so it sits nicely inside the panel padding
            isLeft ? "-right-16 sm:-right-20" : "-left-16 sm:-left-20",
            "outline-none focus-visible:ring-2 ring-[#0f2e3a] rounded",
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
    // overflow visible so the balls aren’t clipped by the panel box
    <div className="px-2 sm:px-4 space-y-12 sm:space-y-14 overflow-visible">
      <PokeTab to="/projects" align="left"  label="Projects" />
      <PokeTab to="/skills"   align="right" label="Skills" />
      <PokeTab to="/about"    align="left"  label="About" />
    </div>
  );
}
