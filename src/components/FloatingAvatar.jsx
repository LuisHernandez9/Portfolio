import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

/**
 * FloatingAvatar
 * - Head-only peeks from right edge.
 * - On hover/tap, slides in full body + speech bubble.
 */
export default function FloatingAvatar({ email, github, linkedin }) {
  const [open, setOpen] = React.useState(false);
  const boxRef = React.useRef(null);

  // Close on outside click / Esc
  React.useEffect(() => {
    const onClick = (e) => {
      if (open && boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const toggle = () => setOpen(v => !v);

  return (
    <div className="fixed bottom-8 right-0 z-50 pr-1 sm:pr-2 select-none" aria-live="polite">
      <div
        ref={boxRef}
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* ==== Head-only (peeking from the right edge) ==== */}
        <motion.button
          type="button"
          aria-label="Open contact avatar"
          onClick={toggle}
          className="outline-none"
          initial={false}
          animate={{ x: open ? 0 : 22 }}   // how far the head peeks off-screen
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <HeadOnlySVG />
        </motion.button>

        {/* ==== Expanded: full body + bubble (to the LEFT) ==== */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="absolute bottom-0 right-[84px] flex items-end gap-3"
            >
              {/* Speech bubble */}
              <div className="relative max-w-[300px] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                <div className="text-sm font-semibold">Let’s connect</div>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a className="hover:underline" href={`mailto:${email}`}>{email}</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    <a className="hover:underline" href={`https://github.com/${github}`} target="_blank" rel="noreferrer">
                      github.com/{github}
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    <a className="hover:underline" href={`https://www.linkedin.com/in/${linkedin}`} target="_blank" rel="noreferrer">
                      linkedin.com/in/{linkedin}
                    </a>
                  </li>
                </ul>
                {/* Bubble tail */}
                <div className="absolute bottom-3 -right-2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-white" />
              </div>

              {/* Full body */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="w-[110px] sm:w-[128px] rounded-2xl border-2 border-slate-300 bg-white shadow-xl"
              >
                <div className="p-3">
                  <FullBodySVG />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================
   SVG: Head-only (peeking)
   - curly hair, light-brown skin
   ============================ */
function HeadOnlySVG() {
  return (
    <svg viewBox="0 0 130 90" className="h-[72px] w-[104px] drop-shadow-md">
      {/* We render the head on the LEFT side of the SVG so the right edge can sit off-screen */}
      <defs>
        <linearGradient id="curl" x1="0" x2="1">
          <stop offset="0%" stopColor="#2b2b2b" />
          <stop offset="100%" stopColor="#1b1b1b" />
        </linearGradient>
      </defs>
      {/* Curly hair cap */}
      <path d="M15 52 C20 24, 62 18, 86 36 C100 46, 108 62, 92 72 C74 84, 40 86, 26 72 C18 64, 12 60, 15 52Z" fill="url(#curl)"/>
      {/* Skin (light brown) */}
      <circle cx="54" cy="54" r="26" fill="#f1c27d"/>
      {/* Eyes */}
      <circle cx="46" cy="56" r="3" fill="#111" />
      <circle cx="62" cy="56" r="3" fill="#111" />
      {/* Smile */}
      <path d="M46 66 C54 72, 62 72, 70 66" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ============================
   SVG: Full body
   - curly hair, light-brown skin, polo shirt
   ============================ */
function FullBodySVG() {
  return (
    <svg viewBox="0 0 200 260" className="w-full h-auto">
      <defs>
        <linearGradient id="curlFull" x1="0" x2="1">
          <stop offset="0%" stopColor="#2b2b2b" />
          <stop offset="100%" stopColor="#1b1b1b" />
        </linearGradient>
        <linearGradient id="polo" x1="0" x2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Head */}
      <circle cx="100" cy="64" r="34" fill="#f1c27d" />
      {/* Curly hair mass */}
      <path d="M58 58 C66 30, 128 26, 148 56 C156 68, 150 86, 130 92 C118 96, 84 96, 70 90 C58 84, 54 72, 58 58Z" fill="url(#curlFull)"/>

      {/* Face details */}
      <circle cx="88" cy="70" r="3.5" fill="#111" />
      <circle cx="112" cy="70" r="3.5" fill="#111" />
      <path d="M86 84 C96 92, 104 92, 114 84" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Neck */}
      <rect x="92" y="94" width="16" height="12" rx="4" fill="#e0ac69" />

      {/* Polo shirt torso */}
      <path d="M54 210 C54 150, 80 120, 100 120 C120 120, 146 150, 146 210 Z" fill="url(#polo)"/>
      {/* Collar */}
      <path d="M84 112 L100 126 L116 112" fill="#ffffff" opacity="0.9"/>
      {/* Placket */}
      <rect x="98" y="126" width="4" height="40" fill="#ffffff" opacity="0.9" rx="1"/>
      {/* Buttons */}
      <circle cx="100" cy="138" r="2" fill="#1f2937"/>
      <circle cx="100" cy="150" r="2" fill="#1f2937"/>
    </svg>
  );
}
