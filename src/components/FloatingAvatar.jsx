import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const BASE = import.meta.env.BASE_URL; // "/Portfolio/" on GitHub Pages

// One knob to size BOTH images
const FULL_W = 176;          // full-body width in px (try 160–200)
const HEAD_W = FULL_W / 2;   // peeking container width (shows left half)

export default function FloatingAvatar({
  email = "you@example.com",
  github = "yourhandle",
  linkedin = "yourhandle",
}) {
  const [open, setOpen] = React.useState(false);
  const boxRef = React.useRef(null);

  // Close on outside click / Esc
  React.useEffect(() => {
    const onDown = (e) => {
      if (!open) return;
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
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
    <div className="fixed bottom-8 right-0 z-50 select-none">
      <div ref={boxRef} className="relative">
        {/* ===== Peeking head (flush right, left half only). Hidden when open. ===== */}
        {!open && (
          <motion.button
            type="button"
            aria-label="Open contact avatar"
            onClick={toggle}
            className="outline-none"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
          >
            {/* Wrapper defines visible area = half width */}
            <div
              className="overflow-hidden drop-shadow"
              style={{ width: HEAD_W }}
            >
              {/* Full image is double the wrapper width so only left half shows */}
              <img
                src={`${BASE}converted_1.png`}
                alt="Avatar head"
                style={{ width: FULL_W }}
                className="block"
              />
            </div>
          </motion.button>
        )}

        {/* ===== Expanded: ONLY full body + bubble ===== */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3"
              onMouseLeave={() => setOpen(false)}
            >
              {/* Speech bubble aligned to mouth height (center of image) */}
              <div className="relative max-w-[320px] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
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

                {/* Tail pointing toward mouth (middle of full image) */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-white" />
              </div>

              {/* Full-body image (same scale as peeking) */}
              <motion.img
                src={`${BASE}converted_2.png`}
                alt="Avatar open"
                style={{ width: FULL_W }}
                className="block drop-shadow"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                onClick={toggle}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
