// src/components/PokeTabs.jsx
import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

export default function PokeTabs() {
  const [hovered, setHovered] = React.useState(null);

  // --- measure each tab's panel height so the Pokéball matches it ---
  const panelRefs = React.useRef([]);
  const [ballSizes, setBallSizes] = React.useState([]);

  React.useLayoutEffect(() => {
    const measure = () => {
      const sizes = panelRefs.current.map((el) =>
        el ? Math.round(el.getBoundingClientRect().height) : 32
      );
      setBallSizes(sizes);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  // -------------------------------------------------------------------

  const tabs = [
    { to: "/projects", label: "Projects", mon: `${BASE}gengar.png`,   monAlt: "Gengar appears!",   monOffsetY: "-56%" },
    { to: "/skills",   label: "Skills",   mon: `${BASE}jirachi.png`,  monAlt: "Jirachi appears!",  monOffsetY: "-56%" },
    { to: "/about",    label: "About",    mon: `${BASE}bulbasaur.png`,monAlt: "Bulbasaur appears!",monOffsetY: "-56%" },
  ];

  return (
    <div className="relative">
      <div className="flex flex-col gap-8 sm:gap-10">
        {tabs.map((t, i) => {
          const isHover = hovered === i;
          const anyHover = hovered !== null;
          const scale = isHover ? 1.06 : anyHover ? 0.96 : 1;

          const ball = ballSizes[i] ?? 32; // fallback until measured

          return (
            // APPLY SCALE TO THE ROW WRAPPER so bar+ball+mon move together
            <div
              key={t.to}
              className="poke-tab group relative w-[min(760px,92vw)]"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "left center",
                transition: "transform 140ms ease",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* The bar fills the wrapper */}
              <Link to={t.to} className="block w-full">
                <div
                  // ref used ONLY to read the rendered height
                  ref={(el) => (panelRefs.current[i] = el)}
                  className="panel px-5 sm:px-6 py-3 sm:py-[14px]"
                >
                  <div className="font-press text-[14px] sm:text-[15px] tracking-wider text-center">
                    {t.label}
                  </div>
                </div>
              </Link>

              {/* Ball: sized to match the panel height (keeps aspect by setting width=height) */}
              <button
                type="button"
                aria-label={`Open ${t.label}`}
                className="poke-ball absolute -right-12 top-1/2 -translate-y-1/2 relative"
                style={{ width: ball, height: ball }}
              >
                <img
                  src={`${BASE}closed_poke.png`}
                  alt=""
                  className="poke-closed-sprite pixelated block pointer-events-none select-none"
                  style={{ width: ball, height: ball }}
                />
                <img
                  src={`${BASE}open_poke.png`}
                  alt=""
                  className="poke-open-sprite pixelated absolute inset-0 opacity-0 pointer-events-none select-none"
                  style={{ width: ball, height: ball }}
                />
              </button>

              {/* Pokémon: pops away to the right of the ball */}
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
