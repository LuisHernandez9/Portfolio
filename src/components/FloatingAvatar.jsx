// src/components/FloatingAvatar.jsx
import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const BASE = import.meta.env.BASE_URL;
const AVATAR_WIDTH = 120;

export default function FloatingAvatar({
  email = "you@example.com",
  github = "yourhandle",
  linkedin = "yourhandle",
  // optionally override sprite names
  closedSrc = `${BASE}converted_2.png`,
  openSrc = `${BASE}converted_2_open.png`, // put this image in /public
}) {
  const [open, setOpen] = React.useState(false);
  const [sbw, setSbw] = React.useState(0);
  const rootRef = React.useRef(null);

  // measure scrollbar width (keeps position tight to the inside edge)
  React.useEffect(() => {
    const calc = () => {
      const width = window.innerWidth - document.documentElement.clientWidth;
      setSbw(Math.max(0, width));
    };
    calc();
    window.addEventListener("resize", calc);
    window.addEventListener("orientationchange", calc);
    return () => {
      window.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
    };
  }, []);

  // close on outside / Esc
  React.useEffect(() => {
    const onDown = (e) => {
      if (!open) return;
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const avatarNode = (
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
        className="group relative flex items-end gap-3"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* bubble (appears on hover) */}
        <AnimatePresence>
          {open && (
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
              {/* tail */}
              <div className="absolute bottom-3 -right-2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-[color:var(--poke-panel)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* full avatar (always fully visible) */}
        <button
          type="button"
          aria-label="Contact avatar"
          onClick={() => setOpen((v) => !v)}
          className="relative block cursor-pointer bg-transparent p-0 border-0"
          style={{ width: AVATAR_WIDTH }}
        >
          {/* closed frame */}
          <img
            src={closedSrc}
            alt="Avatar"
            className="w-full h-auto drop-shadow pixelated pointer-events-none"
            draggable={false}
            decoding="async"
          />
          {/* open-mouth frame overlaid; animate opacity on hover */}
          <img
            src={openSrc}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-auto drop-shadow pixelated pointer-events-none opacity-0 group-hover:[animation:chomp_.6s_steps(1,end)_infinite]"
            draggable={false}
            decoding="async"
          />
        </button>
      </div>
    </div>
  );

  return createPortal(avatarNode, document.body);
}
