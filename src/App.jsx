import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import PokeTabs from "./components/PokeTabs";

function HomePage() {
  return (
    <div className="panel app-window">
      <h1 className="font-press text-3xl sm:text-5xl leading-tight mb-6 text-center">
        Building reliable, <br className="hidden sm:block"/> delightful software.
      </h1>

      <p className="text-[13px] sm:text-[14px] text-gb-800 text-center max-w-3xl mx-auto mb-10">
        I love turning ideas into production-ready tools—clean code, practical design, and a splash of fun.
      </p>

      {/* Your existing tabs/balls/animations */}
      <PokeTabs />
    </div>
  );
}

function ProjectsPage() {
  return (
    <div className="panel app-window">
      <h2 className="font-press text-2xl sm:text-3xl mb-6">Projects</h2>
      <div className="space-y-4">
        <div className="panel p-4">
          <h3 className="font-press text-xl mb-2">Project One</h3>
          <p>Short description of the project.</p>
        </div>
        <div className="panel p-4">
          <h3 className="font-press text-xl mb-2">Project Two</h3>
          <p>Another cool thing you built.</p>
        </div>
      </div>

      <div className="mt-8">
        <Link to="/" className="inline-block panel px-4 py-2">Back to Home</Link>
      </div>
    </div>
  );
}

function SkillsPage() {
  return (
    <div className="panel app-window">
      <h2 className="font-press text-2xl sm:text-3xl mb-6">Skills</h2>
      <div className="space-y-4">
        <div className="panel p-4">JavaScript / TypeScript</div>
        <div className="panel p-4">React / Vite / Tailwind</div>
        <div className="panel p-4">Node / Express</div>
      </div>

      <div className="mt-8">
        <Link to="/" className="inline-block panel px-4 py-2">Back to Home</Link>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="panel app-window">
      <h2 className="font-press text-2xl sm:text-3xl mb-6">About</h2>
      <p className="max-w-3xl">
        A short bio. Keep the retro vibes rolling ✨
      </p>

      <div className="mt-8">
        <Link to="/" className="inline-block panel px-4 py-2">Back to Home</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
