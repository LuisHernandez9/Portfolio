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
  // align="left" ⇒ bar aligned left ⇒ BALL ON THE RIGHT
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
            transition-transform duration-150 ease-out
            hover:-translate-y-[1px]
            focus:outline-none focus:ring-2 focus:ring-[#0f2e3a]
          "
          style={{ backgroundColor: TAB_BG, backgroundImage: scanlines }}
          aria-label={label}
        >
          <span className="font-press text-[14px] sm:text-[16px] text-[#0b2833]">
            {label}
          </span>
        </Link>

        {/* Ball — OUTSIDE the panel edge */}
        <Link
          to={to}
          aria-label={label}
          className={[
            "poke-ball absolute top-1/2 -translate-y-1/2 z-30 outline-none focus-visible:ring-2 ring-[#0f2e3a] rounded",
            ballOnRight ? "-right-16 sm:-right-20" : "-left-16 sm:-left-20",
          ].join(" ")}
        >
          <SpriteBall className="w-12 h-12 sm:w-14 sm:h-14" alt={`${label} tab`} />
        </Link>

        {/* Pokémon — starts beyond the ball, pops further OUT.
            We set a CSS variable --mon-ty so animations preserve the Y offset. */}
        <img
          src={monSrc}
          alt=""
          aria-hidden="true"
          draggable="false"
          className={[
            "poke-mon pointer-events-none absolute z-20 pixelated opacity-0",
            "w-16 h-16 sm:w-20 sm:h-20",
            "top-1/2", // Y anchor comes from the CSS var below (not translate utility)
            ballOnRight
              ? "-right-28 sm:-right-32 pop-right"
              : "-left-28  sm:-left-32  pop-left",
          ].join(" ")}
          // Raise a touch above the ball's visual center (tweak -56% to taste)
          style={{ "--mon-ty": "-56%" }}
        />
      </div>
    </div>
  );
}

export default function PokeTabs() {
  return (
    <div className="px-2 sm:px-4 space-y-12 sm:space-y-14 overflow-visible">
      {/* Projects → ball on right → Gengar pops OUT to the right */}
      <PokeTab to="/projects" align="left"  label="Projects"  pokemonFile="gengar.png"  />
      {/* Skills → ball on left → Jirachi pops OUT to the left */}
      <PokeTab to="/skills"   align="right" label="Skills"    pokemonFile="jirachi.png" />
      {/* About → ball on right → Bulbasaur pops OUT to the right */}
      <PokeTab to="/about"    align="left"  label="About"     pokemonFile="bulbasaur.png" />
    </div>
  );
}
