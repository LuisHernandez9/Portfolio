// src/components/PokeTabs.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

export default function PokeTabs() {
  const [hovered, setHovered] = React.useState(null);
  const navigate = useNavigate();

  // --- Tuning knobs (kept as-is) ---
  const POP = 1.14;          // tab scale when hovered
  const SHRINK = 0.90;       // tab scale when other tabs are hovered
  const BALL_MULT = 1.35;    // 1.0 = same height as tab; >1 bigger, <1 smaller
  const GAP_REM = 5.0;       // distance between tab and Pokéball (rem)
  const MON_MULT = 5.0;      // Pokémon size relative to Pokéball
  const MON_GAP_MULT = 3.6;  // gap from Pokéball in terms of ball size
  // ---------------------------------

  // Refs to panels; store their UN-SCALED base heights.
  const panelRefs = React.useRef([]);
  const linkRefs  = React.useRef([]);
  const ballRefs  = React.useRef([]);
  const [baseHeights, setBaseHeights] = React.useState([]);

  const measureBaseHeights = React.useCallback(() => {
    const sizes = panelRefs.current.map((el) => (el ? el.offsetHeight : 32));
    setBaseHeights(sizes);
  }, []);

  // Use ResizeObserver so size changes re-measure even without a window resize
  React.useLayoutEffect(() => {
    measureBaseHeights();
    const ros = panelRefs.current.map((el) => {
      if (!el || typeof ResizeObserver === "undefined") return null;
      const ro = new ResizeObserver(() => measureBaseHeights());
      ro.observe(el);
      return ro;
    });
    const onResize = () => measureBaseHeights();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ros.forEach((ro) => ro && ro.disconnect());
    };
  }, [measureBaseHeights]);

  const tabs = [
    { to: "/projects", label: "Work Experience and Projects", mon: `${BASE}gengar.png`,    monAlt: "Gengar appears!",    monOffsetY: "-56%" },
    { to: "/skills",   label: "Technical and Soft Skills",   mon: `${BASE}jirachi.png`,   monAlt: "Jirachi appears!",   monOffsetY: "-56%" },
    { to: "/about",    label: "About Me",                    mon: `${BASE}bulbasaur.png`, monAlt: "Bulbasaur appears!", monOffsetY: "-56%" },
  ];

  // Keyboard navigation between tabs (Up/Down/Left/Right)
  const onTabKeyDown = (idx) => (e) => {
    const prev = () => {
      const target = linkRefs.current[idx - 1] || linkRefs.current[0];
      target?.focus();
      setHovered(Math.max(0, idx - 1));
    };
    const next = () => {
      const target = linkRefs.current[idx + 1] || linkRefs.current[linkRefs.current.length - 1];
      target?.focus();
      setHovered(Math.min(linkRefs.current.length - 1, idx + 1));
    };

    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <nav className="relative" aria-label="Main sections">
      <div className="flex flex-col gap-16 sm:gap-20 mt-3 sm:mt-8">
        {tabs.map((t, i) => {
          const isHover  = hovered === i;
          const anyHover = hovered !== null;
          const scale    = isHover ? POP : anyHover ? SHRINK : 1;

          // Dynamic Pokéball height: base × current tab scale × multiplier
          const base = baseHeights[i] ?? 32;
          const ball = Math.round(base * scale * BALL_MULT);

          // Pokémon dynamic size + offset
          const monSize  = Math.round(ball * MON_MULT);
          const monRight = -(GAP_REM * 16 + Math.round(ball * MON_GAP_MULT)); // convert rem→px and add spacing

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
              // Pointer + keyboard focus both drive the animation
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocusCapture={() => setHovered(i)}
              onBlurCapture={(e) => {
                // If focus left this tab entirely, clear hover state
                const current = e.currentTarget;
                requestAnimationFrame(() => {
                  if (current && !current.contains(document.activeElement)) {
                    setHovered(null);
                  }
                });
              }}
            >
              {/* Tab bar (Link) */}
              <Link
                to={t.to}
                ref={(el) => (linkRefs.current[i] = el)}
                onKeyDown={onTabKeyDown(i)}
                className="block w-full touch-target focus:outline-none"
                aria-label={t.label}
              >
                <div
                  ref={(el) => (panelRefs.current[i] = el)}
                  className="panel px-5 sm:px-6 py-3 sm:py-[14px]"
                >
                  <div className="font-press text-[14px] sm:text-[15px] tracking-wider text-center">
                    {t.label}
                  </div>
                </div>
              </Link>

              {/* Pokéball — perfectly centered, dynamic size, custom gap */}
              <button
                ref={(el) => (ballRefs.current[i] = el)}
                type="button"
                aria-label={`Open ${t.label}`}
                className="poke-ball absolute top-1/2 -translate-y-1/2 aspect-square touch-target focus:outline-none"
                style={{
                  height: `${ball}px`,
                  right: `-${GAP_REM}rem`,
                  transition: "height 220ms cubic-bezier(.2,.9,.2,1)",
                  willChange: "height",
                }}
                onClick={() => navigate(t.to)}
                onKeyDown={onTabKeyDown(i)}
              >
                <img
                  src={`${BASE}closed_poke.png`}
                  alt=""
                  className="poke-closed-sprite pixelated absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                  draggable={false}
                  decoding="async"
                />
                <img
                  src={`${BASE}open_poke.png`}
                  alt=""
                  className="poke-open-sprite pixelated absolute inset-0 w-full h-full object-contain opacity-0 pointer-events-none select-none"
                  draggable={false}
                  decoding="async"
                />
              </button>

              {/* Pokémon sprite — dynamic size & spacing */}
              <img
                src={t.mon}
                alt={t.monAlt}
                className="poke-mon pixelated absolute top-1/2 -translate-y-1/2 opacity-0 pointer-events-none select-none pop-right"
                style={{
                  ["--mon-ty"]: t.monOffsetY,
                  right: `${monRight}px`,
                }}
                width={monSize}
                height={monSize}
                draggable={false}
                decoding="async"
              />
            </div>
          );
        })}
      </div>
    </nav>
  );
}
