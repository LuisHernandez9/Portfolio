import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

export default function FloatingAvatar() {
  const [open, setOpen] = React.useState(false);
  const boxRef = React.useRef(null);

  // close on outside click / Esc
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

  const toggle = () => setOpen((v) => !v);

  return (
    <div className="fixed bottom-8 right-0 z-50 pr-2 select-none" aria-live="polite">
      <div
        ref={boxRef}
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* peeking head */}
        <motion.button
          type="button"
          aria-label="Open contact avatar"
          onClick={toggle}
          className="outline-none"
          initial={false}
          animate={{ x: open ? 0 : 20 }}    // adjust peek amount
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <div className="w-16 h-16 rounded-full border-2 border-slate-300 bg-white shadow-md grid place-items-center cursor-pointer">
            <AvatarHead />
          </div>
        </motion.button>

        {/* expanded bubble + body */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="absolute bottom-0 right-16 flex items-end gap-3"
            >
              <div className="relative max-w-[280px] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                <div className="text-sm font-semibold">Let’s connect</div>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:you@example.com" className="hover:underline">you@example.com</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    <a href="https://github.com/yourhandle" target="_blank" rel="noreferrer" className="hover:underline">
                      github.com/yourhandle
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    <a href="https://www.linkedin.com/in/yourhandle" target="_blank" rel="noreferrer" className="hover:underline">
                      linkedin.com/in/yourhandle
                    </a>
                  </li>
                </ul>
                {/* tail */}
                <div className="absolute bottom-3 -right-2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-white" />
              </div>

              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="w-32 rounded-2xl border-2 border-slate-300 bg-white shadow-xl"
              >
                <div className="p-3">
                  <AvatarFull />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* --- Simple SVGs (replace with your own art anytime) --- */
function AvatarHead() {
  return (
    <svg viewBox="0 0 120 120" className="w-12 h-12">
      <defs>
        <linearGradient id="hair" x1="0" x2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="#f8fafc" />
      <circle cx="60" cy="64" r="28" fill="#fde68a" />
      <path d="M28 58c8-18 28-30 51-22 8 3 10 7 13 14-6-10-19-9-31-9-12 0-23 3-33 17z" fill="url(#hair)" />
      <circle cx="48" cy="66" r="3" fill="#0f172a" />
      <circle cx="72" cy="66" r="3" fill="#0f172a" />
      <path d="M48 78c6 6 18 6 24 0" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function AvatarFull() {
  return (
    <svg viewBox="0 0 200 240" className="w-full h-auto">
      <defs>
        <linearGradient id="shirt" x1="0" x2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="70" r="36" fill="#fde68a" />
      <path d="M64 65c10-22 36-36 65-26 10 4 12 8 16 16-8-12-24-11-40-11-16 0-29 4-41 21z" fill="#334155" />
      <circle cx="88" cy="76" r="4" fill="#0f172a" />
      <circle cx="112" cy="76" r="4" fill="#0f172a" />
      <path d="M86 92c9 9 27 9 36 0" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M52 210c0-40 22-72 48-72s48 32 48 72H52z" fill="url(#shirt)" />
      <rect x="88" y="132" width="24" height="28" rx="6" fill="#475569" />
    </svg>
  );
}
