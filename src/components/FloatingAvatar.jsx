import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const BASE = import.meta.env.BASE_URL; // "/Portfolio/" on Pages
const AVATAR_WIDTH = 120;              // both head + full avatar size

// Tune this to match your outer page frame thickness.
// From your screenshot, 10–14px looks right; using 12px here.
const FRAME_PX = 12;

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

  // We offset the avatar past the page frame and also
  // add the same amount into the bubble group's right offset
  const bubbleRightOffsetPx = 88 + FRAME_PX;

  const avatarNode = (
    <div
      ref={rootRef}
      className="fixed bottom-8 z-[60] select-none"
      // Push past the page frame to the *real* screen edge.
      // Also respect iOS safe-area inset so it never clips under the notch.
      style={{ right: `calc(env(safe-area-inset-right, 0px) - ${FRAME_PX}px)` }}
    >
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Peeking head (left half only) — the image is the button */}
        <img
          src={`${BASE}converted_1.png`}
          alt="Avatar head"
          style={{ width: AVATAR_WIDTH, height: "auto" }}
          role="button"
          aria-label="Open contact avatar"
          tabIndex={0}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpen((v) => !v); }}
          className={`block cursor-pointer drop-shadow pixelated transition-opacity duration-300 ease-out [clip-path:polygon(0_0,50%_0,50%_100%,0_100%)] ${
            open ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {/* Expanded: full body + bubble */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="absolute bottom-0 flex items-end gap-3"
              // Move the bubble group inward by (88 + FRAME_PX) so layout
              // stays identical after we pushed the avatar past the frame.
              style={{ right: `${bubbleRightOffsetPx}px` }}
            >
              {/* Bubble — nudged up and themed */}
              <div className="relative -translate-y-6 max-w-[300px] panel p-4">
                <div className="text-[11px] font-press">Let’s connect</div>
                <ul className="mt-3 space-y-2 text-[12px] text-gb-800">
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
                {/* tail */}
                <div className="absolute bottom-3 -right-2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-[color:var(--poke-panel)]" />
              </div>

              {/* Full image */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                style={{ width: AVATAR_WIDTH }}
                className="rounded-2xl bg-transparent"
              >
                <img
                  src={`${BASE}converted_2.png`}
                  alt="Avatar open"
                  className="w-full h-auto drop-shadow pixelated"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  // Mount at <body> so it's relative to the viewport, not the page frame
  return createPortal(avatarNode, document.body);
}
