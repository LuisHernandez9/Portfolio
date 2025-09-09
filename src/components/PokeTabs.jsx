// src/components/PokeTabs.jsx
import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

export default function PokeTabs() {
  const [hovered, setHovered] = React.useState(null);

  // refs to read panel sizes
  const panelRefs = React.useRef([]);
  // store the UN-SCALED base height for each tab
  const [baseHeights, setBaseHeights] = React.useState([]);

  // pop/shrink factors (same ones you’re using for the tabs)
  const POP = 1.14;
  const SHRINK = 0.90;

  // helper: what scale is applied to tab i right now?
  const scaleFor = (i, hoveredIdx) => {
    if (hoveredIdx === i) return POP;
    if (hoveredIdx !== null) return SHRINK;
    return 1;
  };

  // measure base (unscaled) heights; we derive it by dividing the
  // current visual height by the current scale for each row.
  const measureBaseHeights = React.useCallback(() => {
    const sizes = panelRefs.current.map((el, i) => {
      if (!el) return 32;
      const visual = el.getBoundingClientRect().height; // current visible height
      const s = scaleFor(i, hovered);                    // current scale for this row
      return Math.max(1, Math.round(visual / s));        // unscaled/base height
    });
    setBaseHeights(sizes);
  }, [hovered]);

  // initial measure + on window resize
  React.useLayoutEffect(() => {
    measureBaseHeights();
    const onResize = () => measureBaseHeights();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measureBaseHeights]);

  const tabs = [
    { to: "/projects", label: "Projects", mon: `${BASE}gengar.png`,    monAlt: "Gengar appears!",    monOffsetY: "-56%" },
    { to: "/skills",   label: "Skills",   mon: `${BASE}jirachi.png`,   monAlt: "Jirachi appears!",   monOffsetY: "-56%" },
    { to: "/about",    label: "About",    mon: `${BASE}bulbasaur.png`, monAlt: "Bulbasaur appears!", monOffsetY: "-56%" },
  ];

  return (
    <div className="relative">
      <div className="flex flex-col gap-8 sm:gap-10">
        {tabs.map((t, i) => {
          const isHover  = hovered === i;
          const anyHover = hovered !== null;
          const scale    = isHover ? POP : anyHover ? SHRINK : 1;

          // ball height follows tab scale smoothly: base × scale
          const base = baseHeights[i] ?? 32;
          const ball = Math.round(base * scale);

          return (
            <div
              key={t.to}
              className="poke-tab group relative w-[min(760px,92vw)]"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "left center",
                transition: "transform 220ms cubic-bezier(.2,.9,.2,1)",
                willChange: "transform",
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

              {/* Pokéball — height animates; gap fixed via right */}
              <button
                type="button"
                aria-label={`Open ${t.label}`}
                className="poke-ball absolute top-1/2 -translate-y-1/2 aspect-square"
                style={{
                  height: `${ball}px`,                  // dynamic height = base × scale
                  right: "-3rem",                       // keep your preferred gap
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
