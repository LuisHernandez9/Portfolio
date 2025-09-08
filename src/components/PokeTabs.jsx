import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/** inline Pokéball SVG */
function PokeBall({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs><clipPath id="half"><rect x="0" y="0" width="100" height="50" /></clipPath></defs>
      <circle cx="50" cy="50" r="48" fill="#1C3B4A" />
      <circle cx="50" cy="50" r="44" fill="#F8F8F0" />
      <g clipPath="url(#half)"><circle cx="50" cy="50" r="44" fill="#D64545" /></g>
      <rect x="6" y="46" width="88" height="8" fill="#1C3B4A" />
      <circle cx="50" cy="50" r="18" fill="#1C3B4A" />
      <circle cx="50" cy="50" r="14" fill="#F8F8F0" />
      <circle cx="50" cy="50" r="8"  fill="#CFE0E6" />
    </svg>
  );
}

function PokeBar({ to, align = "left", label }) {
  const isLeft = align === "left";
  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"} w-full`}>
      <div className="relative w-1/2 max-w-[680px] h-8 sm:h-10">
        {/* the bar acts as the tab button */}
        <Link
          to={to}
          aria-label={label}
          className="block h-full w-full bg-[var(--poke-panel)] border-2 border-[var(--poke-border)]
                     shadow-[0_0_0_2px_var(--poke-border),0_0_0_4px_var(--poke-panel),0_0_0_6px_var(--poke-border)]
                     rounded-[0.25rem]"
        >
          <span className="sr-only">{label}</span>
        </Link>

        {/* the Pokéball */}
        <motion.div
          whileHover={{ rotate: -10, scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className={[
            "absolute top-1/2 -translate-y-1/2",
            isLeft ? "-right-6 sm:-right-8" : "-left-6 sm:-left-8",
          ].join(" ")}
        >
          <Link to={to} aria-label={label} className="block">
            <PokeBall className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow pixelated" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function PokeTabs() {
  return (
    <div className="mx-auto max-w-6xl px-4 mt-10 space-y-6">
      <PokeBar to="/projects" align="left"  label="Go to Projects" />
      <PokeBar to="/skills"   align="right" label="Go to Skills" />
      <PokeBar to="/about"    align="left"  label="Go to About" />
    </div>
  );
}
