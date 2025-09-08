// src/components/PokeTabs.jsx
import { Link } from "react-router-dom";
import { useState } from "react";

function PokeTab({ to, align, label, pokemon }) {
  const [isHovered, setIsHovered] = useState(false);

  const ballOnRight = align === "right";

  return (
    <div
      className={`relative flex items-center ${
        ballOnRight ? "justify-end" : "justify-start"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tab panel */}
      <Link
        to={to}
        className="retro-panel w-72 sm:w-96 px-4 py-2 text-center text-xl font-bold"
      >
        {label}
      </Link>

      {/* Pokéball */}
      <img
        src={isHovered ? "/open_poke.png" : "/closed_poke.png"}
        alt="pokeball"
        className={`w-10 h-10 sm:w-12 sm:h-12 absolute ${
          ballOnRight
            ? "right-[-2.5rem] sm:right-[-3rem]"
            : "left-[-2.5rem] sm:left-[-3rem]"
        } z-10 transition-transform duration-200 ease-in-out hover:scale-110 bob`}
      />

      {/* Pokémon that pops out */}
      <img
        src={`/${pokemon}`}
        alt={label}
        className={[
          "poke-mon pointer-events-none absolute z-20 pixelated opacity-0",
          "w-16 h-16 sm:w-20 sm:h-20",
          // align with pokeball but slightly higher
          "top-[50%] -translate-y-[60%]",
          ballOnRight
            ? "-right-28 sm:-right-32 dir-right"
            : "-left-28 sm:-left-32 dir-left",
        ].join(" ")}
      />
    </div>
  );
}

export default function PokeTabs() {
  return (
    <div className="mx-auto max-w-6xl px-4 mt-10 space-y-16 sm:space-y-20 overflow-hidden">
      <PokeTab to="/projects" align="right" label="Projects" pokemon="gengar.png" />
      <PokeTab to="/skills" align="left" label="Skills" pokemon="jirachi.png" />
      <PokeTab to="/about" align="right" label="About" pokemon="bulbasaur.png" />
    </div>
  );
}
