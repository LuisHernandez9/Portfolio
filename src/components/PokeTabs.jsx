import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

/**
 * Vertical Pokédex-style rail:
 * - All tabs sit on the LEFT.
 * - Hovered tab scales up; the others subtly scale down.
 * - Pokéballs stay on the left; Pokémon pop AWAY from the rail (to the left).
 *
 * Uses local hover state so siblings can react together.
 */

export default function PokeTabs() {
  const [hovered, setHovered] = React.useState(null); // 0 | 1 | 2 | null

  const tabs = [
    {
      to: "/projects",
      label: "Projects",
      ballSide: "left",
      mon: `${BASE}gengar.png`,
      monAlt: "Gengar appears!",
      // how far up/down to align monster relative to ball center
      monOffsetY: "-56%",
    },
    {
      to: "/skills",
      label: "Skills",
      ballSide: "left",
      mon: `${BASE}jirachi.png`,
      monAlt: "Jirachi appears!",
      monOffsetY: "-56%",
    },
    {
      to: "/about",
      label: "About",
      ballSide: "left",
      mon: `${BASE}bulbasaur.png`,
      monAlt: "Bulbasaur appears!",
      monOffsetY: "-56%",
    },
  ];

  return (
    <div className="relative">
      {/* Vertical rail */}
      <div className="flex flex-col gap-8 sm:gap-10">
        {tabs.map((t, i) => {
          const isHovering = hovered === i;
          const someHover = hovered !== null;
          // scale: hovered grows, others shrink a touch
          const scale =
            isHovering ? 1.06 : someHover ? 0.96 : 1.0;

          return (
            <div
              key={t.to}
              className="relative poke-tab"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Pokéball (left of the bar) */}
              <button
                type="button"
                aria-label={`Open ${t.label}`}
                className="poke-ball absolute -left-10 top-1/2 -translate-y-1/2"
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

              {/* Pokémon that pops AWAY from the rail (to the left) */}
              <img
                src={t.mon}
                alt={t.monAlt}
                className={`poke-mon pixelated absolute left-[-54px] top-1/2 -translate-y-1/2 opacity-0 pointer-events-none select-none pop-left`}
                style={{
                  // keep baseline aligned with the ball center using the CSS var
                  // (your index.css animations read this var)
                  // negative pushes upward a bit; adjust per sprite if needed
                  // Example: "-56%" usually looks right for 32–48px sprites.
                  ["--mon-ty"]: t.monOffsetY,
                }}
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
