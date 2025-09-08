import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL; // "/Portfolio/" on GitHub Pages

function SpriteBall({ className = "", alt = "Pokéball" }) {
  const closed = `${BASE}closed_poke.png`;
  const open   = `${BASE}open_poke.png`;

  return (
    <span className={`relative inline-block select-none ${className}`} aria-hidden="true">
      <img
        src={closed}
        alt=""
        className="poke-closed-sprite block w-full h-full pixelated transition-opacity duration-150 ease-out"
        draggable="false"
      />
      <img
        src={open}
        alt={alt}
        className="poke-open-sprite block w-full h-full pixelated absolute inset-0 opacity-0 transition-opacity duration-150 ease-out"
        draggable="false"
      />
    </span>
  );
}

function PokeTab({ to, align = "left", label, pokemonFile }) {
  // align="left" → bar aligned left → BALL ON THE RIGHT
  const ballOnRight = align === "left";

  const TAB_BG = "rgba(247,244,232,0.96)";
  const scanlines =
    "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 4px)";

  const monSrc = `${BASE}${pokemonFile}`;

  return (
    <div className={`flex ${ballOnRight ? "justify-start" : "justify-end"} w-full`}>
      <div className="poke-tab relative w-[min(760px,60vw)] h-14 sm:h-16 overflow-visible">
        {/* Tab bar */}
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

        {/* === Anchor exactly on the bar edge === */}
        <div
          className={[
            "absolute top-1/2 -translate-y-1/2 z-30 flex items-center overflow-visible",
            ballOnRight ? "right-0 flex-row" : "left-0 flex-row-reverse",
          ].join(" ")}
        >
          {/* Ball: push a full ball-width OUTSIDE the bar + add tiny gap */}
          <Link
            to={to}
            aria-label={label}
            className={[
              "poke-ball outline-none focus-visible:ring-2 ring-[#0f2e3a] rounded",
              ballOnRight ? "translate-x-full ml-1.5" : "-translate-x-full mr-1.5",
            ].join(" ")}
          >
            <SpriteBall className="w-12 h-12 sm:w-14 sm:h-14" alt={`${label} tab`} />
          </Link>

          {/* Pokémon: sits just beyond the ball, then animates away (CSS handles motion) */}
          <img
            src={monSrc}
            alt=""
            aria-hidden="true"
            draggable="false"
            className={[
              "poke-mon pointer-events-none relative pixelated opacity-0",
              "w-16 h-16 sm:w-20 sm:h-20",
              ballOnRight ? "dir-right ml-2" : "dir-left mr-2",
            ].join(" ")}
          />
        </div>
      </div>
    </div>
  );
}

export default function PokeTabs() {
  return (
    <div className="px-2 sm:px-4 space-y-12 sm:space-y-14 overflow-visible">
      {/* Projects → ball on right → Gengar pops to the RIGHT of the ball */}
      <PokeTab to="/projects" align="left"  label="Projects"  pokemonFile="gengar.png"  />
      {/* Skills → ball on left → Jirachi pops to the LEFT of the ball */}
      <PokeTab to="/skills"   align="right" label="Skills"    pokemonFile="jirachi.png" />
      {/* About → ball on right → Bulbasaur pops to the RIGHT of the ball */}
      <PokeTab to="/about"    align="left"  label="About"     pokemonFile="bulbasaur.png" />
    </div>
  );
}
