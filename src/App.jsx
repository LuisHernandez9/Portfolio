import React from "react";
// (Optional) remove these if you’re not using them in this file:
// import { motion, AnimatePresence } from "framer-motion";
// import { Mail, Github, Linkedin } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
      {/* Header */}
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

      {/* Hero */}
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

      {/* 👇 Floating avatar pinned bottom-right */}
      <FloatingAvatar />
    </div>
  );
}

function FloatingAvatar() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed right-6 bottom-6 md:right-8 md:bottom-8 select-none">
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        tabIndex={0}
        aria-label="Chat avatar — hover to see contact info"
      >
        {/* Avatar head (always visible) */}
        <div className="size-16 rounded-full border-2 border-slate-300 bg-white shadow-md grid place-items-center cursor-pointer">
          <AvatarHead />
        </div>

        {/* Popup */}
        {open && (
          <div className="absolute -top-48 right-0 flex items-end gap-3">
            {/* Speech bubble */}
            <div className="max-w-[260px] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
              <div className="text-sm font-semibold">Let’s connect</div>
              <ul className="mt-2 space-y-2 text-sm">
                <li><a href="mailto:you@example.com" className="hover:underline">you@example.com</a></li>
                <li><a href="https://github.com/yourhandle" target="_blank" rel="noreferrer" className="hover:underline">github.com/yourhandle</a></li>
                <li><a href="https://linkedin.com/in/yourhandle" target="_blank" rel="noreferrer" className="hover:underline">linkedin.com/in/yourhandle</a></li>
              </ul>
            </div>

            {/* Full avatar body */}
            <div className="w-32 rounded-2xl border-2 border-slate-300 bg-white shadow-xl">
              <AvatarFull />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AvatarHead() {
  return (
    <svg viewBox="0 0 120 120" className="w-14 h-14">
      {/* TODO: paste the head SVG you had earlier */}
      <circle cx="60" cy="60" r="56" fill="#f8fafc" />
      <circle cx="60" cy="64" r="28" fill="#fde68a" />
      <circle cx="48" cy="66" r="3" fill="#0f172a" />
      <circle cx="72" cy="66" r="3" fill="#0f172a" />
      <path d="M48 78c6 6 18 6 24 0" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function AvatarFull() {
  return (
    <svg viewBox="0 0 200 240" className="w-full h-auto">
      {/* TODO: paste the full-body SVG you had earlier */}
      <circle cx="100" cy="70" r="36" fill="#fde68a" />
      <path d="M52 210c0-40 22-72 48-72s48 32 48 72H52z" fill="#a78bfa" />
    </svg>
  );
}
