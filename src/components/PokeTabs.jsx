import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL; // "/Portfolio/" on GitHub Pages

/** Pixel Pokéball that switches closed → open with a snap */
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
      {/* open state (snaps via CSS in index.css: .poke-open-sprite) */}
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

/** A single tab row (left/right aligned) */
function PokeTab({ to, align = "left", label }) {
  const isLeft = align === "left";

  // Stronger tab surface (cream) + faint scanlines so it stands off the bg
  const TAB_BG = "rgba(247,244,232,0.96)"; // #F7F4E8-ish
  const scanlines =
    "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 4px)";

  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"} w-full`}>
      {/* group lets the pixel ball react when the bar is hovered/focused */}
      <div className="relative group w-[min(760px,60vw)] h-14 sm:h-16">
        {/* Tab bar (chunky triple border + creamy surface + scanlines) */}
        <Link
          to={to}
          className="
            relative flex h-full w-full items-center justify-center
            rounded-[12px]
            border-[3px] border-[#0f2e3a]  /* outer dark border */
            shadow-[0_0_0_4px_#F7F4E8,0_0_0_7px_#0f2e3a] /* pixel triple frame */
            focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-[#0f2e3a] focus:ring-offset-transparent
            transition-transform duration-150 ease-out
            group-hover:-translate-y-[1px]
          "
          style={{
            backgroundColor: TAB_BG,
            backgroundImage: scanlines,
            backdropFilter: "saturate(110%)",
          }}
          aria-label={label}
        >
          <span className="font-press text-[14px] sm:text-[16px] text-[#0b2833]">
            {label}
          </span>
        </Link>

        {/* Pixel Pokéball outside the bar */}
        <Link
          to={to}
          aria-label={label}
          className={[
            "poke-ball absolute top-1/2 -translate-y-1/2 z-30",
            isLeft ? "-right-20 sm:-right-24" : "-left-20 sm:-left-24",
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
    <div className="mx-auto max-w-6xl px-4 mt-10 space-y-16 sm:space-y-20 overflow-hidden">
      <PokeTab to="/projects" align="left"  label="Projects" />
      <PokeTab to="/skills"   align="right" label="Skills" />
      <PokeTab to="/about"    align="left"  label="About" />
    </div>
  );
}
