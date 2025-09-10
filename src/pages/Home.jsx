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
          min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh]
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
            Data Science, AI/ML,<br /> and Software Development
          </h1>

          <p
            className="
              mt-4 text-gb-700 leading-relaxed max-w-[75ch]
              text-[clamp(14px,1.2vw,18px)]
            "
          >
            You name it, I've done it! Welcome to my digital portfolio. Please feel free to explore
            it to get to know me more. If you want to contact me, give Bolb a hover on the lower right part of your screen.
            He knows where I live ;)
          </p>
        </header>

        {/* Tabs region (keeps all animations; adds a11y label) */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14" role="region" aria-label="Site sections">
          <PokeTabs />
        </div>

        <div className="flex-1" />
      </div>
    </section>
  );
}
