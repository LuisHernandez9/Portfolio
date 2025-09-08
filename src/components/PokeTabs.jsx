import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

export default function PokeTabs() {
  const [hovered, setHovered] = React.useState(null);

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
          const isHover = hovered === i;
          const anyHover = hovered !== null;
          const scale = isHover ? 1.06 : anyHover ? 0.96 : 1;

          return (
            // Make THIS the positioning context + same width as the bar
            <div
              key={t.to}
              className="poke-tab relative w-[min(760px,92vw)]"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Bar (fills the positioning box) */}
              <Link
                to={t.to}
                className="block w-full"
                style={{ transform: `scale(${scale})`, transition: "transform 140ms ease" }}
              >
                <div className="panel px-5 sm:px-6 py-3 sm:py-[14px]">
                  <div className="font-press text-[14px] sm:text-[15px] tracking-wider text-center">
                    {t.label}
                  </div>
                </div>
              </Link>

              {/* Ball (now positioned to THIS box’s right edge) */}
              <button
                type="button"
                aria-label={`Open ${t.label}`}
                className="poke-ball absolute -right-8 top-1/2 -translate-y-1/2"
              >
                <img
                  src={`${BASE}closed_poke.png`}
                  alt=""
                  className="poke-closed-sprite pixelated w-8 h-8 pointer-events-none select-none"
                />
                <img
                  src={`${BASE}open_poke.png`}
                  alt=""
                  className="poke-open-sprite pixelated w-8 h-8 absolute inset-0 opacity-0 pointer-events-none select-none"
                />
              </button>

              {/* Pokémon pops away to the RIGHT of the ball */}
              <img
                src={t.mon}
                alt={t.monAlt}
                className="poke-mon pixelated absolute right-[-54px] top-1/2 -translate-y-1/2 opacity-0 pointer-events-none select-none pop-right"
                style={{ ["--mon-ty"]: t.monOffsetY }}
                width={34}
                height={34}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
