// src/pages/Home.jsx
import React from "react";
import PokeTabs from "../components/PokeTabs";

export default function Home() {
  return (
    <>
      <header className="pt-24 mx-auto max-w-6xl px-4">
        <h1 className="h1-poke">
          Building reliable,<br /> delightful software.
        </h1>
        <p className="mt-4 max-w-prose text-gb-700">
          I love turning ideas into production-ready tools—clean code, practical design,
          and a splash of fun.
        </p>
        {/* (Removed) buttons:
            <div className="mt-6 flex gap-3">
              <a href="#projects" className="btn-poke">View Projects</a>
              <a href="#contact" className="btn-ghost">Contact</a>
            </div>
        */}
      </header>

      <PokeTabs />
    </>
  );
}
