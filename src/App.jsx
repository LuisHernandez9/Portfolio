import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import FloatingAvatar from "./components/FloatingAvatar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import About from "./pages/About";

const BASE = import.meta.env.BASE_URL; // "/Portfolio/" on GitHub Pages

const pageVariants = {
  initial: { x: 40, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.28, ease: "easeOut" } },
  exit:    { x: -40, opacity: 0, transition: { duration: 0.22, ease: "easeIn" } },
};

export default function App() {
  const location = useLocation();
import { Routes, Route } from "react-router-dom";
import PokeTabs from "./components/PokeTabs";

function Home() {
  return (
    // IMPORTANT: use bg-tiles and set the image inline with BASE so it resolves on Pages
    <div
      className="min-h-screen bg-tiles text-gb-800 overflow-x-hidden"
      style={{
        // 👇 rename "bg_pattern.png" here if your file is named differently
        backgroundImage: `url("${BASE}bg_pattern.png")`,
      }}
    >
      {/* NAV */}
      <nav className="nav-poke fixed top-0 inset-x-0 z-40 backdrop-blur bg-white/60 border-b-2 border-poke-border">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="h1-poke">My Pokéfolio</Link>
          <ul className="hidden sm:flex items-center gap-6" />
        </div>
      </nav>
    <div className="main-panel">
      <h1 className="text-3xl sm:text-4xl font-press mb-6 text-center">
        Building reliable, <br /> delightful software.
      </h1>
      <p className="mb-10 text-center max-w-2xl">
        I love turning ideas into production-ready tools—clean code, practical design, and a splash of fun.
      </p>
      <PokeTabs />
    </div>
  );
}

      {/* ROUTES WITH SLIDE TRANSITIONS */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="pt-14"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
function Projects() {
  return (
    <div className="main-panel">
      <h2 className="text-2xl sm:text-3xl font-press mb-6 text-center">Projects</h2>
      <p className="text-center">Showcase your projects here in retro panels or cards.</p>
    </div>
  );
}

      {/* Floating avatar persists across pages */}
      <FloatingAvatar email="you@example.com" github="yourhandle" linkedin="yourhandle" />
function Skills() {
  return (
    <div className="main-panel">
      <h2 className="text-2xl sm:text-3xl font-press mb-6 text-center">Skills</h2>
      <p className="text-center">List your skills here in fun retro style.</p>
    </div>
  );
}

      {/* optional scanlines overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.35) 3px)",
        }}
      />
function About() {
  return (
    <div className="main-panel">
      <h2 className="text-2xl sm:text-3xl font-press mb-6 text-center">About</h2>
      <p className="text-center">Some fun info about you!</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
