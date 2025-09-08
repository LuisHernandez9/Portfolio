import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import FloatingAvatar from "./components/FloatingAvatar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import About from "./pages/About";

const pageVariants = {
  initial: { x: 40, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.28, ease: "easeOut" },
  },
  exit: {
    x: -40,
    opacity: 0,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen body-tiles text-gb-800 overflow-x-hidden">
      {/* NAV */}
      <nav className="nav-poke fixed top-0 inset-x-0 z-40 backdrop-blur bg-white/60 border-b-2 border-poke-border">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="h1-poke">My Pokéfolio</Link>
          {/* keep empty per your request; you’re using PokéTabs on Home */}
          <ul className="hidden sm:flex items-center gap-6" />
        </div>
      </nav>

      {/* ROUTES WITH TRANSITIONS */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="pt-14" /* keep content below fixed nav */
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      {/* Floating avatar stays across pages */}
      <FloatingAvatar email="you@example.com" github="yourhandle" linkedin="yourhandle" />

      {/* scanlines overlay */}
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
