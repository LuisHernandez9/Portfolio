import React, { useState } from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

/* Map each tab to its Pokémon sprite in /public */
const POKEMON_BY_LABEL = {
  Projects: `${BASE}gengar.png`,
  Skills: `${BASE}jirachi.png`,
  About: `${BASE}bulbasaur.png`,
};

/** Pixel Pokéball that switches closed → open (your original visuals) */
function SpriteBall({ className = "", alt = "Pokéball" }) {
  const closed = `${BASE}closed_poke.png`;
  const open = `${BASE}open_poke.png`;
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

function PokeTab({ to, align = "left", label, openLabel, setOpenLabel }) {
  const isLeft = align === "left";
  const isOpen = openLabel === label;
  const TAB_BG = "rgba(247,244,232,0.96)";
  const scanlines =
    "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 4px)";
  const sprite = POKEMON_BY_LABEL[label];

  // handlers to open/close via state (works for mouse + keyboard)
  const open = () => setOpenLabel(label);
  const close = () => setOpenLabel(null);

  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"} w-full`}>
      {/* .poke-tab enables your existing hover styles; we ALSO add/remove .pokeball-open via state */}
      <div
        className={`poke-tab relative w-[min(760px,60vw)] h-14 sm:h-16 ${
          isOpen ? "pokeball-open" : ""
        }`}
        onMouseEnter={open}
        onMouseLeave={close}
        onFocus={open}
        onBlur={close}
      >
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
          <span className="font-press text-[14px] sm:text-[16px] text-[#0b2833]">{label}</span>
        </Link>

        {/* Ball + Pokémon. `relative` ensures the sprite positions off the ball */}
        <Link
          to={to}
          aria-label={label}
          className={[
            "poke-ball absolute top-1/2 -translate-y-1/2 z-30 inline-block relative",
            isLeft ? "-right-16 sm:-right-20" : "-left-16 sm:-left-20",
            "outline-none focus-visible:ring-2 ring-[#0f2e3a] rounded",
          ].join(" ")}
          onMouseEnter={open}
          onMouseLeave={close}
          onFocus={open}
          onBlur={close}
        >
          {/* Pokémon sprite — visibility now controlled by .pokeball-open as well */}
          <img
            src={sprite}
            alt={`${label} Pokémon`}
            className="pokemon-sprite h-24 sm:h-28 md:h-32 object-contain pixelated"
            draggable="false"
          />

          {/* The pokéball images */}
          <SpriteBall className="w-12 h-12 sm:w-14 sm:h-14" alt={`${label} tab`} />
        </Link>
      </div>
    </div>
  );
}

export default function PokeTabs() {
  const [openLabel, setOpenLabel] = useState(null);
  return (
    <div className="px-2 sm:px-4 space-y-12 sm:space-y-14 overflow-visible">
      <PokeTab to="/projects" align="left" label="Projects" openLabel={openLabel} setOpenLabel={setOpenLabel} />
      <PokeTab to="/skills" align="right" label="Skills" openLabel={openLabel} setOpenLabel={setOpenLabel} />
      <PokeTab to="/about" align="left" label="About" openLabel={openLabel} setOpenLabel={setOpenLabel} />
    </div>
  );
}
