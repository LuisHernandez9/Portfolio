import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const BASE = import.meta.env.BASE_URL; // "/Portfolio/" on GitHub Pages

export default function FloatingAvatar({
  email = "you@example.com",
  github = "yourhandle",
  linkedin = "yourhandle",
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef(null);

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

  const toggle = () => setOpen((v) => !v);

  return (
    <div className="fixed bottom-8 right-0 z-50 pr-1 sm:pr-2 select-none">
      <div
        ref={rootRef}
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* --- PEEKING HEAD (left half only) --- */}
        <motion.button
          type="button"
          aria-label="Open contact avatar"
          onClick={toggle}
          className="outline-none"
          initial={false}
          animate={{ x: open ? 0 : 22 }}   // how far it peeks off-screen
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          {/* Clip to left 50% */}
          <img
            src={`${BASE}converted_1.png`}
            alt="Avatar head"
            className="h-20 w-auto [clip-path:polygon(0_0,50%_0,50%_100%,0_100%)] drop-shadow"
          />
        </motion.button>

        {/* --- EXPANDED: FULL BODY + BUBBLE --- */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="absolute bottom-0 right-[88px] flex items-end gap-3"
            >
              {/* Bubble (to the left) */}
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
                <div className="absolute bottom-3 -right-2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-white" />
              </div>

              {/* Full image (swap to mouth-open) */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="w-[120px] rounded-2xl bg-transparent"
              >
                <img
                  src={`${BASE}converted_2.png`}
                  alt="Avatar open"
                  className="w-full h-auto drop-shadow"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
