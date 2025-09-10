// src/components/FloatingAvatar.jsx
import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

export default function FloatingAvatar({
  email = "you@example.com",
  github = "yourhandle",
  linkedin = "yourhandle",
  // full body frames: closed / open
  closedSrc = `${BASE}converted_1.png`,
  openSrc   = `${BASE}converted_2.png`,
}) {
  const [bubbleOpen, setBubbleOpen] = React.useState(false);
  const [mouthOn, setMouthOn] = React.useState(false);

  // keyframes live here so they ship with the component
  const KF = `
    @keyframes chomp { 0%{opacity:0} 50%{opacity:1} 100%{opacity:0} }
  `;

  return createPortal(
    <div
      className="fixed z-[60] select-none"
      style={{
        // hugs the right + respects notches and on-screen bars
        right: 'max(12px, calc(env(safe-area-inset-right, 0px) + 12px))',
        bottom: 'max(14px, calc(env(safe-area-inset-bottom, 0px) + 14px))',
      }}
    >
      <style>{KF}</style>

      <div
        className="relative flex items-end gap-3"
        onMouseEnter={() => { setMouthOn(true); setBubbleOpen(true); }}
        onMouseLeave={() => { setMouthOn(false); setBubbleOpen(false); }}
      >
        {/* Contact bubble – clamps to viewport on small screens */}
        <AnimatePresence>
          {bubbleOpen && (
            <motion.div
              initial={{ opacity: 0, x: 14, y: 6 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 8, y: 4 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="relative -translate-y-6 panel p-4"
              style={{
                maxWidth: "min(300px, calc(100vw - 140px))", // never overflow
              }}
            >
              <div className="text-[11px] font-press">Let’s connect</div>
              <ul className="mt-3 space-y-2 text-[12px] text-gb-800">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a className="hover:underline" href={`mailto:${email}`} aria-label="Email">Email</a>
                </li>
                <li className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  <a className="hover:underline" href={`https://www.linkedin.com/in/${linkedin}`} target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a>
                </li>
                <li className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <a className="hover:underline" href={`https://github.com/${github}`} target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
                </li>
              </ul>
              <div className="absolute bottom-3 -right-2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-[color:var(--poke-panel)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full-body avatar button */}
        <button
          type="button"
          aria-label="Contact avatar"
          onClick={() => setBubbleOpen(v => !v)}
          className="relative block cursor-pointer bg-transparent p-0 border-0"
          style={{ width: "clamp(92px, 14vw, 120px)" }}  // fluid but capped
        >
          {/* closed frame */}
          <img src={closedSrc} alt="" className="w-full h-auto drop-shadow pixelated pointer-events-none" />
          {/* open-mouth overlay */}
          <img
            src={openSrc}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-auto drop-shadow pixelated pointer-events-none"
            style={{
              opacity: mouthOn ? undefined : 0,
              animation: mouthOn ? "chomp .55s steps(1,end) infinite" : "none",
            }}
          />
        </button>
      </div>
    </div>,
    document.body
  );
}
