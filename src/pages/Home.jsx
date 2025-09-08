import React from "react";
import PokeTabs from "../components/PokeTabs";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-24">
      {/* Big cream panel like Projects/Skills/About */}
      <section className="panel p-6 sm:p-8">
        <header>
          <h1 className="h1-poke">
            Building reliable,<br /> delightful software.
          </h1>
          <p className="mt-4 max-w-prose text-gb-700">
            I love turning ideas into production-ready tools—clean code, practical design,
            and a splash of fun.
          </p>
        </header>

        {/* Tabs inside the panel */}
        <div className="mt-8">
          <PokeTabs />
        </div>
      </section>
    </div>
  );
}
