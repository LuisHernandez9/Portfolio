import { useMemo } from "react";

/**
 * Props:
 *  - isOpen: boolean   (controls lid + reveal)
 *  - sprite: string    (path in /public, e.g. "/gengar.png")
 *  - label: string     (aria-label for accessibility)
 */
export default function PokeballReveal({ isOpen, sprite, label }) {
  // replay animation when reopened
  const popKey = useMemo(() => (isOpen ? Date.now() : "closed"), [isOpen]);

  return (
    <div
      className={[
        "relative inline-flex items-center justify-center",
        "w-44 h-44 sm:w-56 sm:h-56",
        isOpen ? "pokeball-open" : "",
      ].join(" ")}
      role="group"
      aria-label={label}
    >
      {/* Pokémon sprite */}
      <img
        key={popKey}
        src={sprite}
        alt={label}
        className={[
          "pointer-events-none select-none absolute z-10",
          "h-28 sm:h-36 object-contain",
          isOpen ? "opacity-100" : "opacity-0",
          "motion-safe:animate-[pop-out_380ms_ease-out_forwards]",
        ].join(" ")}
        style={{ transformOrigin: "50% 100%" }}
        draggable="false"
      />

      {/* Pokéball */}
      <div className="relative w-36 h-36 sm:w-48 sm:h-48">
        {/* Top half */}
        <div
          className="pokeball-top absolute inset-x-0 top-0 h-1/2 rounded-t-full
                     bg-red-600 border-4 border-black"
        />
        {/* Bottom half */}
        <div
          className="pokeball-bottom absolute inset-x-0 bottom-0 h-1/2 rounded-b-full
                     bg-white border-4 border-black"
        />
        {/* Center band */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-black" />
        {/* Button */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-4 border-black shadow"
        />
      </div>
    </div>
  );
}
