import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/** inline Pokéball SVG */
function PokeBall({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
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
      <div className="relative w-1/2 max-w-[680px] h-10 sm:h-12">
        {/* The bar acts as the tab button and is visibly labeled */}
        <Link
          to={to}
          className="group relative flex h-full w-full items-center justify-center
                     bg-[var(--poke-panel)] border-2 border-[var(--poke-border)]
                     shadow-[0_0_0_2px_var(--poke-border),0_0_0_4px_var(--poke-panel),0_0_0_6px_var(--poke-border)]
                     rounded-[0.25rem] focus:outline-none focus:ring-2 focus:ring-offset-2
                     focus:ring-[var(--poke-border)] focus:ring-offset-transparent"
          aria-label={label}
        >
          <span className="font-press text-[12px] sm:text-[13px] text-gb-800">
            {label}
          </span>
        </Link>

        {/* The Pokéball – transforms only (no layout shift), higher zIndex on hover */}
        <motion.div
          className={[
            "absolute top-1/2 -translate-y-1/2",
            isLeft ? "-right-10 sm:-right-12" : "-left-10 sm:-left-12",
            "pointer-events-none", // click goes through to the bar Link
          ].join(" ")}
          whileHover={{}} // noop (ball itself doesn't own hover)
        >
          <motion.div
            // Raise above neighbors on hover
            whileHover={{ scale: 1.06, rotate: -10, zIndex: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="pointer-events-auto" // allow direct clicking if desired
          >
            <Link to={to} aria-label={label} className="block">
              <PokeBall className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow pixelated" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function PokeTabs() {
  return (
    <div className="mx-auto max-w-6xl px-4 mt-10 space-y-10 sm:space-y-12">
      {/* Left – Projects */}
      <PokeBar to="/projects" align="left"  label="Projects" />
      {/* Right – Skills */}
      <PokeBar to="/skills"   align="right" label="Skills" />
      {/* Left – About */}
      <PokeBar to="/about"    align="left"  label="About" />
    </div>
  );
}
