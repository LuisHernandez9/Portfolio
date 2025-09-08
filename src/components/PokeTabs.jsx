import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL; // "/Portfolio/" on GitHub Pages

/** Pixel Pokéball that switches closed → open. Opacity/animation now controlled by CSS
    using .poke-tab:hover and .poke-ball:hover so it works no matter what you hover. */
function SpriteBall({ className = "", alt = "Pokéball" }) {
  const closed = `${BASE}closed_poke.png`;
  const open   = `${BASE}open_poke.png`;

  return (
    <span className={`relative inline-block select-none ${className}`} aria-hidden="true">
      {/* closed state */}
      <img
        src={closed}
        alt=""
        className="poke-closed-sprite block w-full h-full pixelated transition-opacity duration-150 ease-out"
        draggable="false"
      />
      {/* open state (snaps via CSS in index.css) */}
      <img
        src={open}
        alt={alt}
        className="poke-open-sprite block w-full h-full pixelated absolute inset-0 opacity-0 transition-opacity duration-150 ease-out"
        draggable="false"
      />
    </span>
  );
}

function PokeTab({ to, align = "left", label }) {
  const isLeft = align === "left";

  const TAB_BG = "rgba(247,244,232,0.96)";
  const scanlines =
    "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 4px)";

  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"} w-full`}>
      {/* IMPORTANT: .poke-tab is the hover target used by CSS */}
      <div className="poke-tab relative w-[min(760px,60vw)] h-14 sm:h-16">
        {/* The tab bar */}
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
            hover:-translate-y-[1px]
          "
          style={{ backgroundColor: TAB_BG, backgroundImage: scanlines }}
          aria-label={label}
        >
          <span className="font-press text-[14px] sm:text-[16px] text-[#0b2833]">
            {label}
          </span>
        </Link>

        {/* Pokéball — give the link a .poke-ball class so CSS can target it */}
        <Link
          to={to}
          aria-label={label}
          className={[
            "poke-ball absolute top-1/2 -translate-y-1/2 z-30",
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
    // overflow visible so balls aren’t clipped by the surrounding panel
    <div className="px-2 sm:px-4 space-y-12 sm:space-y-14 overflow-visible">
      <PokeTab to="/projects" align="left"  label="Projects" />
      <PokeTab to="/skills"   align="right" label="Skills" />
      <PokeTab to="/about"    align="left"  label="About" />
    </div>
  );
}
