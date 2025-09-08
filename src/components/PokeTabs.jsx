import React from "react";
import { motion } from "framer-motion";

/** Tiny inline Pokéball so you don’t need an image file */
function PokeBall({ className = "w-10 h-10" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id="half">
          <rect x="0" y="0" width="100" height="50" />
        </clipPath>
      </defs>
      {/* outer ring */}
      <circle cx="50" cy="50" r="48" fill="#1C3B4A" />
      <circle cx="50" cy="50" r="44" fill="#F8F8F0" />
      {/* top half red */}
      <g clipPath="url(#half)">
        <circle cx="50" cy="50" r="44" fill="#D64545" />
      </g>
      {/* center button */}
      <circle cx="50" cy="50" r="18" fill="#1C3B4A" />
      <circle cx="50" cy="50" r="14" fill="#F8F8F0" />
      <circle cx="50" cy="50" r="8"  fill="#CFE0E6" />
      {/* horizontal band */}
      <rect x="6" y="46" width="88" height="8" fill="#1C3B4A" />
    </svg>
  );
}

/** One bar + ball */
function PokeBar({ href, align = "left", label }) {
  const isLeft = align === "left";

  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"} w-full`}>
      <div className="relative w-1/2 max-w-[680px] h-8 sm:h-10">
        {/* the “bar” */}
        <a
          href={href}
          aria-label={label}
          className="block h-full w-full bg-[var(--poke-panel)] border-2 border-[var(--poke-border)] shadow-[0_0_0_2px_var(--poke-border),0_0_0_4px_var(--poke-panel),0_0_0_6px_var(--poke-border)] rounded-[0.25rem]"
        >
          <span className="sr-only">{label}</span>
        </a>

        {/* the Pokéball, anchored to the side the bar points to */}
        <motion.a
          href={href}
          aria-label={label}
          whileHover={{ rotate: -10, scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className={[
            "absolute top-1/2 -translate-y-1/2",
            isLeft ? "-right-6 sm:-right-8" : "-left-6 sm:-left-8",
          ].join(" ")}
        >
          <PokeBall className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow pixelated" />
        </motion.a>
      </div>
    </div>
  );
}

export default function PokeTabs() {
  return (
    <div className="mx-auto max-w-6xl px-4 mt-10 space-y-6">
      {/* Left – Projects */}
      <PokeBar href="#projects" align="left"  label="Go to Projects" />
      {/* Right – Skills */}
      <PokeBar href="#skills"   align="right" label="Go to Skills" />
      {/* Left – About */}
      <PokeBar href="#about"    align="left"  label="Go to About" />
    </div>
  );
}
