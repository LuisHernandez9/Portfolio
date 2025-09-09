import React, { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

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

function PokeTabItem({ to, label, mon, monAlt, monOffsetY = "-56%" }) {
  // Measure the clickable tab panel itself
  const [panelRef, panelH] = useElementHeight();

  // Fallback to a sane minimum so things don’t collapse at first paint
  const TAB_H = Math.max(panelH || 0, 44);

  // Scale factors (tweak to taste)
  const ballSize = TAB_H * 0.70;      // ball diameter ~70% of tab height
  const monSize  = TAB_H * 0.80;      // pokemon sprite slightly larger
  const ballRight = TAB_H * -0.90;    // how far outside the tab (negative = to the right)
  const monRight  = TAB_H * -1.45;    // pokemon sits a bit farther than the ball

  return (
    <div className="relative group">
      {/* The sized/observed tab */}
      <div ref={panelRef} className="relative">
        <Link
          to={to}
          className="panel block px-6 py-3 font-press text-lg sm:text-xl md:text-2xl text-center
                     transition-all duration-200"
        >
          {label}
        </Link>

        {/* Ball: positioned just outside the right edge of THIS SAME wrapper */}
        <button
          type="button"
          aria-label={`Open ${label}`}
          className="poke-ball absolute top-1/2 -translate-y-1/2"
          style={{
            right: `${ballRight}px`,
            width: `${ballSize}px`,
            height: `${ballSize}px`,
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

        {/* Pokémon: pops away to the right of the ball, scales with the tab */}
        <img
          src={mon}
          alt={monAlt}
          className="poke-mon pixelated absolute top-1/2 -translate-y-1/2 opacity-0 pointer-events-none select-none pop-right"
          style={{
            right: `${monRight}px`,
            width: `${monSize}px`,
            height: `${monSize}px`,
            ["--mon-ty"]: monOffsetY, // keeps the vertical alignment during animations
          }}
        />
      </div>
    </div>
  );
}

export default function PokeTabs() {
  const tabs = [
    {
      to: "/projects",
      label: "Projects",
      mon: `${BASE}gengar.png`,
      monAlt: "Gengar",
      monOffsetY: "-56%",
    },
    {
      to: "/skills",
      label: "Skills",
      mon: `${BASE}jirachi.png`,
      monAlt: "Jirachi",
      monOffsetY: "-50%",
    },
    {
      to: "/about",
      label: "About",
      mon: `${BASE}bulbasaur.png`,
      monAlt: "Bulbasaur",
      monOffsetY: "-52%",
    },
  ];

  return (
    <div className="space-y-6">
      {tabs.map((t) => (
        <PokeTabItem key={t.to} {...t} />
      ))}
    </div>
  );
}
