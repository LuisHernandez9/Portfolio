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
  animate: { x: 0, opacity: 1, transition: { duration: 0.28, ease: "easeOut" } },
  exit:    { x: -40, opacity: 0, transition: { duration: 0.22, ease: "easeIn" } },
};

export default function App() {
  const location = useLocation();

  return (
    // overflow-x-hidden prevents any horizontal scroll caused by off-screen balls
    <div className="min-h-screen body-tiles text-gb-800 overflow-x-hidden">
      <nav className="nav-poke fixed top-0 inset-x-0 z-40 backdrop-blur bg-white/60 border-b-2 border-poke-border">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="h1-poke">My Pokéfolio</Link>
          <ul className="hidden sm:flex items-center gap-6" />
        </div>
      </nav>

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

      <FloatingAvatar email="you@example.com" github="yourhandle" linkedin="yourhandle" />

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
