import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const BASE = import.meta.env.BASE_URL; // "/Portfolio/" on Pages
const AVATAR_WIDTH = 120;              // both head + full avatar size

// Optional tiny nudge if you want it to overlap the scrollbar by 1–2px
const FUDGE_PX = 0; // try 1 or 2 if you still see a hairline gap

export default function FloatingAvatar({
  email = "you@example.com",
  github = "yourhandle",
  linkedin = "yourhandle",
}) {
  const [open, setOpen] = React.useState(false);
  const [sbw, setSbw] = React.useState(0); // scrollbar width in px
  const rootRef = React.useRef(null);

  // Measure scrollbar width so we can nudge to the scrollbar's inside edge.
  React.useEffect(() => {
    const calc = () => {
      const width = window.innerWidth - document.documentElement.clientWidth;
      setSbw(Math.max(0, width)); // usually ~17px on Windows, 0 on overlay scrollbars
    };
    calc();
    window.addEventListener("resize", calc);
    // Some browsers change when scrollbars appear/disappear:
    window.addEventListener("orientationchange", calc);
    return () => {
      window.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
    };
  }, []);

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

  // When the peeking head is offset to the very edge, keep the bubble spacing
  // identical by adding the same amount to the bubble's right offset.
  const baseBubbleRight = 88;             // your original spacing
  const bubbleRightOffsetPx = baseBubbleRight + sbw + FUDGE_PX;

  const avatarNode = (
    <div
      ref={rootRef}
      className="fixed bottom-8 z-[60] select-none"
      // Position relative to viewport, minus scrollbar width, plus safe-area if any.
      style={{
        right: `calc(env(safe-area-inset-right, 0px) - ${sbw + FUDGE_PX}px)`,
      }}
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
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setOpen((v) => !v);
          }}
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
              // Keep bubble spacing identical after we moved the head to the scrollbar.
              style={{ right: `${bubbleRightOffsetPx}px` }}
            >
              {/* Bubble — nudged up and themed */}
              <div className="relative -translate-y-6 max-w-[300px] panel p-4">
                <div className="text-[11px] font-press">Let’s connect</div>
                <ul className="mt-3 space-y-2 text-[12px] text-gb-800">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a className="hover:underline" href={`mailto:${email}`}>
                      {email}
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
