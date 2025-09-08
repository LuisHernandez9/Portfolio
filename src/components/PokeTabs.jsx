import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

/**
 * Left-aligned Pokédex rail
 * - Balls on the RIGHT of each bar
 * - Monsters pop AWAY to the RIGHT
 * - Hovered bar scales up; siblings scale down
 */
export default function PokeTabs() {
  const [hovered, setHovered] = React.useState(null); // 0 | 1 | 2 | null

  const tabs = [
    {
      to: "/projects",
      label: "Projects",
      mon: `${BASE}gengar.png`,
      monAlt: "Gengar appears!",
      monOffsetY: "-56%",
    },
    {
      to: "/skills",
      label: "Skills",
      mon: `${BASE}jirachi.png`,
      monAlt: "Jirachi appears!",
      monOffsetY: "-56%",
    },
    {
      to: "/about",
      label: "About",
      mon: `${BASE}bulbasaur.png`,
      monAlt: "Bulbasaur appears!",
      monOffsetY: "-56%",
    },
  ];

  return (
    <div className="relative">
      <div className="flex flex-col gap-8 sm:gap-10">
        {tabs.map((t, i) => {
          const isHovering = hovered === i;
          const someHover = hovered !== null;
          const scale = isHovering ? 1.06 : someHover ? 0.96 : 1;

          return (
            <div
              key={t.to}
              className="relative poke-tab"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Pokéball (RIGHT of the bar) */}
              <button
                type="button"
                aria-label={`Open ${t.label}`}
                className="poke-ball absolute -right-10 top-1/2 -translate-y-1/2"
              >
                {/* closed */}
                <img
                  src={`${BASE}closed_poke.png`}
                  alt=""
                  className="poke-closed-sprite pixelated w-8 h-8 pointer-events-none select-none"
                />
                {/* open (fades in on hover) */}
                <img
                  src={`${BASE}open_poke.png`}
                  alt=""
                  className="poke-open-sprite pixelated w-8 h-8 absolute inset-0 opacity-0 pointer-events-none select-none"
                  style={{ filter: "drop-shadow(0 1px 0 rgba(0,0,0,.2))" }}
                />
              </button>

              {/* Pokémon pops AWAY to the RIGHT */}
              <img
                src={t.mon}
                alt={t.monAlt}
                className="poke-mon pixelated absolute right-[-54px] top-1/2 -translate-y-1/2 opacity-0 pointer-events-none select-none pop-right"
                style={{ ["--mon-ty"]: t.monOffsetY }}
                width={34}
                height={34}
              />

              {/* The tab bar */}
              <Link
                to={t.to}
                className="block"
                style={{ transform: `scale(${scale})`, transition: "transform 140ms ease" }}
              >
                <div className="panel px-5 sm:px-6 py-3 sm:py-[14px] w-[min(780px,90vw)]">
                  <div className="font-press text-[14px] sm:text-[15px] tracking-wider text-center">
                    {t.label}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
