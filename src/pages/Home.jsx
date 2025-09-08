// src/pages/Home.jsx
import React from "react";
import PokeTabs from "../components/PokeTabs";

export default function Home() {
  return (
    <section
      className="
        mx-auto
        max-w-[1200px] md:max-w-[1320px] lg:max-w-[1400px]
        px-4 sm:px-6 lg:px-8
      "
    >
      <div
        className="
          panel
          mt-6 sm:mt-10
          p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14
          min-h-[58vh] md:min-h-[62vh] lg:min-h-[70vh]  /* expand downward */
          flex flex-col
        "
      >
        <header>
          <h1
            className="
              font-press leading-[1.1]
              text-[clamp(22px,3.2vw,44px)]
            "
          >
            Building reliable,<br /> delightful software.
          </h1>

          <p
            className="
              mt-4 text-gb-700 leading-relaxed max-w-[75ch]
              text-[clamp(14px,1.2vw,18px)]
            "
          >
            I love turning ideas into production-ready tools—clean code, practical
            design, and a splash of fun.
          </p>
        </header>

        {/* push tabs down a bit so the panel feels taller */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14">
          <PokeTabs />
        </div>

        {/* optional spacer so the bottom border has air on short screens */}
        <div className="flex-1" />
      </div>
    </section>
  );
}
