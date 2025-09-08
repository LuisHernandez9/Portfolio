import React from "react";
import { Routes, Route } from "react-router-dom";
import PokeTabs from "./components/PokeTabs";

function Home() {
  return (
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

function Projects() {
  return (
    <div className="main-panel">
      <h2 className="text-2xl sm:text-3xl font-press mb-6 text-center">Projects</h2>
      <p className="text-center">Showcase your projects here in retro panels or cards.</p>
    </div>
  );
}

function Skills() {
  return (
    <div className="main-panel">
      <h2 className="text-2xl sm:text-3xl font-press mb-6 text-center">Skills</h2>
      <p className="text-center">List your skills here in fun retro style.</p>
    </div>
  );
}

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
