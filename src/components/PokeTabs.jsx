// src/components/PokeTabs.jsx
import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

export default function PokeTabs() {
  const [hovered, setHovered] = React.useState(null);

  // Refs to each panel so we can measure their rendered heights
  const panelRefs = React.useRef([]);
  const [ballSizes, setBallSizes] = React.useState([]);

  // Measure visual height of each tab (includes transforms)
  const measure = React.useCallback(() => {
    const sizes = panelRefs.current.map((el) =>
      el ? Math.round(el.getBoundingClientRect().height) : 32
    );
    setBallSizes(sizes);
  }, []);

  // Initial + window resize
  React.useLayoutEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  // During hover changes, schedule a read next frame
  React.useEffect(() => {
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [hovered, measure]);

  const tabs = [
    { to: "/projects", label: "Projects", mon: `${BASE}gengar.png`,   monAlt: "Gengar appears!",   monOffsetY: "-56%" },
    { to: "/skills",   label: "Skills",   mon: `${BASE}jirachi.png`,  monAlt: "Jirachi appears!",  monOffsetY: "-56%" },
    { to: "/about",    label: "About",    mon: `${BASE}bulbasaur.png`,monAlt: "Bulbasaur appears!",monOffsetY: "-56%" },
  ];

  return (
    <div className="relative">
      <div className="flex flex-col gap-8 sm:gap-10">
        {tabs.map((t, i) => {
          const isHover  = hovered === i;
          const anyHover = hovered !== null;

          // pop/shrink settings (tune to taste)
          const POP = 1.14;
          const SHRINK = 0.90;
          const scale = isHover ? POP : anyHover ? SHRINK : 1;

          // Ball size equals the panel’s current visual height
          const ball = ballSizes[i] ?? 32;

          return (
            <div
              key={t.to}
              className="poke-tab group relative w-[min(760px,92vw)]"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "left center",
                transition: "transform 180ms cubic-bezier(.2,.9,.2,1)",
                willChange: "transform",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onTransitionEnd={(e) => {
                // Only remeasure when the scale transition finishes
                if (e.propertyName === "transform") measure();
              }}
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

              {/* Pokéball — size tracks tab height; gap fixed via `right` */}
              <button
                type="button"
                aria-label={`Open ${t.label}`}
                className="poke-ball absolute top-1/2 -translate-y-1/2 aspect-square"
                style={{ height: `${ball}px`, right: "-3rem" }}
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
