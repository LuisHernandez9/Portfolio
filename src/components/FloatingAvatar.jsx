import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const BASE = import.meta.env.BASE_URL; // "/Portfolio/" on Pages

/** ========= SIZING (change one number to scale both images) ========= */
const AVATAR_W = 200;        // full-body width in px (try 180–240)
const HEAD_WRAPPER_W = AVATAR_W / 2;   // width of peeking area (left half)
/** fine-tune mouth alignment (moves bubble up/down relative to the image center) */
const BUBBLE_OFFSET_Y = -8;  // px; negative = slightly up, positive = down

export default function FloatingAvatar({
  email = "you@example.com",
  github = "yourhandle",
  linkedin = "yourhandle",
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef(null);

  // Close on outside click / Esc
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
    <div className="fixed bottom-8 right-0 z-50 select-none" ref={rootRef}>
      {/* We handle hover on the whole widget area */}
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* ===== PEEKING HALF (flush-right) — hidden when open ===== */}
        <button
          type="button"
          aria-label="Open contact avatar"
          onClick={toggle}
          className={open ? "hidden" : "block"}
          style={{ padding: 0, margin: 0 }}
        >
          {/* Wrapper defines visible region = EXACTLY left half */}
          <div
            className="overflow-hidden"
            style={{
              width: HEAD_WRAPPER_W,
              // keep it *flush* with the right edge, no shadow spacing
              boxShadow: "none",
            }}
          >
            {/* Full image is AVATAR_W wide; only its left half is visible */}
            <img
              src={`${BASE}converted_1.png`}
              alt="Avatar head"
              style={{ width: AVATAR_W, display: "block" }}
            />
          </div>
        </button>

        {/* ===== EXPANDED: only full body + bubble ===== */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              // anchor to the right edge, vertically centered so bubble is at mouth level
              className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3"
              style={{ pointerEvents: "auto" }}
            >
              {/* Bubble to the LEFT of the avatar, centered at mouth */}
              <div
                className="relative max-w-[320px] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl"
                style={{ transform: `translateY(${BUBBLE_OFFSET_Y}px)` }}
              >
                <div className="text-sm font-semibold">Let’s connect</div>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a className="hover:underline" href={`mailto:${email}`}>{email}</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    <a
                      className="hover:underline"
                      href={`https://github.com/${github}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      github.com/{github}
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    <a
                      className="hover:underline"
                      href={`https://www.linkedin.com/in/${linkedin}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      linkedin.com/in/{linkedin}
                    </a>
                  </li>
                </ul>
                {/* Tail aiming toward the mouth (center of the avatar image) */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-white" />
              </div>

              {/* Full body — SAME size as the peeking image */}
              <motion.img
                src={`${BASE}converted_2.png`}
                alt="Avatar open"
                style={{ width: AVATAR_W, display: "block" }}
                initial={{ y: 12, opacity: 0 }}
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
