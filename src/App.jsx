import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/60 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">My Portfolio</h1>
          <nav className="hidden sm:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#projects" className="hover:text-slate-900 transition">Projects</a>
            <a href="#skills" className="hover:text-slate-900 transition">Skills</a>
            <a href="#about" className="hover:text-slate-900 transition">About</a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-14">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-block rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-semibold">Computer Science</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
              Building reliable, delightful software.
            </h2>
            <p className="mt-4 text-slate-600 md:text-lg">
              I love turning ideas into production-ready tools—clean code, practical design, and a splash of fun.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#projects" className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:shadow transition">
                View Projects
              </a>
              <a href="#contact" className="inline-flex items-center rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-slate-800 transition">
                Contact
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
      {/* ... all your header, hero, sections, footer ... */}

      {/* Floating avatar (always visible bottom-right) */}
      <FloatingAvatar />
    </div>
  )
}
