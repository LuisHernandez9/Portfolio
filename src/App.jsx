import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import FloatingAvatar from "./components/FloatingAvatar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import About from "./pages/About";

export default function App() {
  return (
    <div className="min-h-screen body-tiles text-gb-800">
      {/* NAV (kept minimal; you can re-add text links if you want) */}
      <nav className="nav-poke fixed top-0 inset-x-0 z-40 backdrop-blur bg-white/60 border-b-2 border-poke-border">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="h1-poke">My Pokéfolio</Link>
          <ul className="hidden sm:flex items-center gap-6">
            {/* optional direct links */}
            {/* <li><Link className="hover:underline" to="/projects">Projects</Link></li>
            <li><Link className="hover:underline" to="/skills">Skills</Link></li>
            <li><Link className="hover:underline" to="/about">About</Link></li> */}
          </ul>
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* Floating avatar stays across pages */}
      <FloatingAvatar email="you@example.com" github="yourhandle" linkedin="yourhandle" />

      {/* scanlines */}
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
