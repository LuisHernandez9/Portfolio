import React from "react";
import FloatingAvatar from "./components/FloatingAvatar";
import PokeTabs from "./components/PokeTabs";

export default function App() {
  return (
    <div className="min-h-screen body-tiles text-gb-800">
      {/* NAV (you can keep or strip text links) */}
      <nav className="nav-poke fixed top-0 inset-x-0 z-40 backdrop-blur bg-white/60 border-b-2 border-poke-border">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <span className="h1-poke">My Pokéfolio</span>
          {/* remove captions per your request (optional) */}
          <ul className="hidden sm:flex items-center gap-6">
            {/* <li><a className="hover:underline" href="#projects">Projects</a></li>
            <li><a className="hover:underline" href="#skills">Skills</a></li>
            <li><a className="hover:underline" href="#about">About</a></li> */}
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <header className="pt-24 mx-auto max-w-6xl px-4">
        <h1 className="h1-poke">
          Building reliable,<br /> delightful software.
        </h1>
        <p className="mt-4 max-w-prose text-gb-700">
          I love turning ideas into production-ready tools—clean code, practical design,
          and a splash of fun.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="#projects" className="btn-poke">View Projects</a>
          <a href="#contact" className="btn-ghost">Contact</a>
        </div>
      </header>

      {/* NEW: Alternating Poké tabs */}
      <PokeTabs />

      {/* Sections */}
      <section id="projects" className="mt-20 mx-auto max-w-6xl px-4">
        <div className="panel p-5">
          <h2 className="font-press text-lg mb-4">Projects</h2>
          <p className="text-sm text-gb-700">
            Your portfolio projects go here. Wrap each in a <code>panel</code> for the retro frame.
          </p>
        </div>
      </section>

      <section id="skills" className="mt-20 mx-auto max-w-6xl px-4">
        <div className="panel p-5">
          <h2 className="font-press text-lg mb-4">Skills</h2>
          <p className="text-sm text-gb-700">List your skills with a 16-bit flavor.</p>
        </div>
      </section>

      <section id="about" className="mt-20 mx-auto max-w-6xl px-4">
        <div className="panel p-5">
          <h2 className="font-press text-lg mb-4">About</h2>
          <p className="text-sm text-gb-700">A short description about you, styled in a retro panel.</p>
        </div>
      </section>

      <FloatingAvatar email="you@example.com" github="yourhandle" linkedin="yourhandle" />

      {/* optional scanlines */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.35) 3px)",
        }}
      />
    </div>
  );
}
