// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
  const BASE = import.meta.env.BASE_URL; // "/Portfolio/" on Pages

  return (
    <div
      className="min-h-screen text-gb-800 overflow-x-hidden"
      style={{
        // put your file name here; it lives in /public
        backgroundImage: `url("${BASE}bg2.png")`,
        backgroundRepeat: "repeat",
        backgroundSize: "300px 300px",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <FloatingAvatar email="hernandez.luis.e.2004@gmail.com" github="LuisHernandez9" linkedin="luis-hernandez-lh0209" />

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
