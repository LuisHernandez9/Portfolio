// src/components/PokeTabs.jsx
import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

export default function PokeTabs() {
  const [hovered, setHovered] = React.useState(null);

  // Refs to panels (the bars) to read layout height
  const panelRefs = React.useRef([]);
  // Store UN-SCALED base heights (ignore transforms)
  const [baseHeights, setBaseHeights] = React.useState([]);

  // pop/shrink factors
  const BALL_MULT = 1.20;   // 1.0 = same height as tab; >1 bigger, <1 smaller
  const GAP_REM   = 3.5;    // distance from tab in rem (use any number)
  const POP = 1.14;
  const SHRINK = 0.90;

  const tabs = [
    { to: "/projects", label: "Projects", mon: `${BASE}gengar.png`,    monAlt: "Gengar appears!",    monOffsetY: "-56%" },
    { to: "/skills",   label: "Skills",   mon: `${BASE}jirachi.png`,   monAlt: "Jirachi appears!",   monOffsetY: "-56%" },
    { to: "/about",    label: "About",    mon: `${BASE}bulbasaur.png`, monAlt: "Bulbasaur appears!", monOffsetY: "-56%" },
  ];

  // Measure unscaled heights. Use offsetHeight so transforms don't affect it.
  const measureBaseHeights = React.useCallback(() => {
    const sizes = panelRefs.current.map((el) =>
      el ? el.offsetHeight : 32
    );
    setBaseHeights(sizes);
  }, []);

  // Initial measure + on resize
  React.useLayoutEffect(() => {
    measureBaseHeights();
    const onResize = () => measureBaseHeights();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measureBaseHeights]);

  return (
    <div className="relative">
      <div className="flex flex-col gap-8 sm:gap-10">
        {tabs.map((t, i) => {
          const anyHover = hovered !== null;
          const isHover = hovered === i;
          const scale = isHover ? POP : anyHover ? SHRINK : 1;

          // ball size = base (unscaled) × current scale
          const base = baseHeights[i] ?? 32;
          const ball = Math.round(base * scale * BALL_MULT);

          return (
            <div
              key={t.to}
              className="poke-tab group relative w-[min(760px,92vw)]"
              style={{
                height: `${ball}px`,
                right: `-${GAP_REM}rem`,                      // <-- gap control
                transition: "height 220ms cubic-bezier(.2,.9,.2,1)",
                willChange: "height",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Tab bar */}
              <Link to={t.to} className="block w-full">
                <div
                  ref={(el) => (panelRefs.current[i] = el)}
                  className="panel px-5 sm:px-6 py-3 sm:py-[14px]"
                >
                  <div className="font-press text-[14px] sm:text-[15px] tracking-wider text-center">
                    {t.label}
                  </div>
                </div>
              </Link>

              {/* Pokéball — height animates smoothly with the tab scale */}
              <button
                type="button"
                aria-label={`Open ${t.label}`}
                className="poke-ball absolute top-1/2 -translate-y-1/2 aspect-square"
                style={{
                  height: `${ball}px`,                       // dynamic: base × scale
                  right: "-3rem",                             // keep your chosen gap
                  transition: "height 220ms cubic-bezier(.2,.9,.2,1)",
                  willChange: "height",
                }}
              >
                <img
                  src={`${BASE}closed_poke.png`}
                  alt=""
                  className="poke-closed-sprite pixelated absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                />
                <img
                  src={`${BASE}open_poke.png`}
                  alt=""
                  className="poke-open-sprite pixelated absolute inset-0 w-full h-full object-contain opacity-0 pointer-events-none select-none"
                />
              </button>

              {/* Pokémon sprite */}
              <img
                src={t.mon}
                alt={t.monAlt}
                className="poke-mon pixelated absolute right-[-82px] top-1/2 -translate-y-1/2 opacity-0 pointer-events-none select-none pop-right"
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
