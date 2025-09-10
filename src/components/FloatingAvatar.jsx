// src/components/FloatingAvatar.jsx
import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const BASE = import.meta.env.BASE_URL || "/";
const AVATAR_WIDTH = 120;

export default function FloatingAvatar({
  email = "you@example.com",
  github = "yourhandle",
  linkedin = "yourhandle",
  // 👇 filenames you said you’re using
  closedSrc = `${BASE}converted_1.png`,   // mouth CLOSED (base frame)
  openSrc   = `${BASE}converted_2.png`,   // mouth OPEN (overlay)
}) {
  const [bubbleOpen, setBubbleOpen] = React.useState(false);
  const [mouthOn, setMouthOn] = React.useState(false);
  const [sbw, setSbw] = React.useState(0);
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    const calc = () =>
      setSbw(Math.max(0, window.innerWidth - document.documentElement.clientWidth));
    calc();
    window.addEventListener("resize", calc);
    window.addEventListener("orientationchange", calc);
    return () => {
      window.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
    };
  }, []);

  React.useEffect(() => {
    const onDown = (e) => {
      if (!bubbleOpen) return;
      if (rootRef.current && !rootRef.current.contains(e.target)) setBubbleOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setBubbleOpen(false);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onEsc);
    };
  }, [bubbleOpen]);

  return createPortal(
    <div
      ref={rootRef}
      className="fixed bottom-8 right-4 sm:right-6 z-[60] select-none"
      style={{ right: `calc(${sbw}px + 1rem)` }}
    >
      {/* keyframes for the mouth swap */}
      <style>{`
        @keyframes chomp { 0%{opacity:0} 50%{opacity:1} 100%{opacity:0} }
      `}</style>

      <div
        className="relative flex items-end gap-3"
        onMouseEnter={() => { setMouthOn(true); setBubbleOpen(true); }}
        onMouseLeave={() => { setMouthOn(false); setBubbleOpen(false); }}
      >
        {/* Contact bubble */}
        <AnimatePresence>
          {bubbleOpen && (
            <motion.div
              initial={{ opacity: 0, x: 16, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 10, y: 6 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="relative -translate-y-6 max-w-[300px] panel p-4"
            >
              <div className="text-[11px] font-press">Let’s connect</div>
              <ul className="mt-3 space-y-2 text-[12px] text-gb-800">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a className="hover:underline" href={`mailto:${email}`}>Email</a>
                </li>
                <li className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  <a
                    className="hover:underline"
                    href={`https://www.linkedin.com/in/${linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <a
                    className="hover:underline"
                    href={`https://github.com/${github}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
              <div className="absolute bottom-3 -right-2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-[color:var(--poke-panel)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avatar button (full body always visible) */}
        <button
          type="button"
          aria-label="Contact avatar"
          onClick={() => setBubbleOpen((v) => !v)}
          className="relative block cursor-pointer bg-transparent p-0 border-0"
          style={{ width: AVATAR_WIDTH }}
        >
          {/* base: CLOSED mouth */}
          <img
            src={closedSrc}
            alt="Avatar"
            className="w-full h-auto drop-shadow pixelated pointer-events-none"
            draggable={false}
            decoding="async"
          />
          {/* overlay: OPEN mouth (animates while hovered) */}
          <img
            src={openSrc}
            alt=""
            aria-hidden
            onError={() => console.warn("[FloatingAvatar] open mouth image not found:", openSrc)}
            className="absolute inset-0 w-full h-auto drop-shadow pixelated pointer-events-none"
            style={{
              animation: mouthOn ? "chomp .55s steps(2,end) infinite" : "none",
              willChange: "opacity",
            }}
            draggable={false}
            decoding="async"
          />
        </button>
      </div>
    </div>,
    document.body
  );
}
