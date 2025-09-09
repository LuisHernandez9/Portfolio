// src/components/PokeTabs.jsx
import React, { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

// Measure an element's height reactively
function useElementHeight() {
  const ref = useRef(null);
  const [h, setH] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (r) setH(r.height);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, h];
}

function PokeTabRow({
  to,
  label,
  monSrc,
  monAlt,
  // fine-tune vertical visual alignment while animating
  monOffsetY = "-56%",
}) {
  // Measure the tab’s height but DO NOT change its classes/styles
  const [tabRef, tabH] = useElementHeight();

  // Derive sizes from the measured height (tweak these ratios if desired)
  const H = Math.max(tabH || 0, 44);   // fallback so it's not 0 before mount
  const ball = H * 0.72;               // ball diameter ~72% of tab height
  const mon  = H * 0.82;               // pokemon slightly larger than the ball
  const gap  = H * 0.30;               // spacing between tab edge and ball
  const ballRight = -(gap + ball * 0.10);
  const monRight  = ballRight - ball * 0.85; // sprite sits a bit farther out

  return (
    <div className="relative group">
      {/* YOUR TAB – unchanged classes */}
      <Link
        ref={tabRef}
        to={to}
        className="panel block px-6 py-3 font-press text-lg sm:text-xl md:text-2xl text-center transition-all duration-200"
      >
        {label}
      </Link>

      {/* Pokéball – sized/positioned from the measured height */}
      <button
        type="button"
        aria-label={`Open ${label}`}
        className="poke-ball absolute top-1/2 -translate-y-1/2"
        style={{
          right: `${ballRight}px`,
          width: `${ball}px`,
          height: `${ball}px`,
        }}
      >
        <img
          src={`${BASE}closed_poke.png`}
          alt=""
          className="poke-closed-sprite pixelated w-full h-full pointer-events-none select-none"
        />
        <img
          src={`${BASE}open_poke.png`}
          alt=""
          className="poke-open-sprite pixelated absolute inset-0 w-full h-full opacity-0 pointer-events-none select-none"
        />
      </button>

      {/* Pokémon – also sized from tab height */}
      <img
        src={monSrc}
        alt={monAlt}
        className="poke-mon pixelated absolute top-1/2 -translate-y-1/2 opacity-0 pointer-events-none select-none pop-right"
        style={{
          right: `${monRight}px`,
          width: `${mon}px`,
          height: `${mon}px`,
          ["--mon-ty"]: monOffsetY, // keeps the vertical offset during your animation
        }}
      />
    </div>
  );
}

export default function PokeTabs() {
  const tabs = [
    {
      to: "/projects",
      label: "Projects",
      monSrc: `${BASE}gengar.png`,
      monAlt: "Gengar",
      monOffsetY: "-56%",
    },
    {
      to: "/skills",
      label: "Skills",
      monSrc: `${BASE}jirachi.png`,
      monAlt: "Jirachi",
      monOffsetY: "-50%",
    },
    {
      to: "/about",
      label: "About",
      monSrc: `${BASE}bulbasaur.png`,
      monAlt: "Bulbasaur",
      monOffsetY: "-52%",
    },
  ];

  return (
    <div className="space-y-6">
      {tabs.map((t) => (
        <PokeTabRow key={t.to} {...t} />
      ))}
    </div>
  );
}
