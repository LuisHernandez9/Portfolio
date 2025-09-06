import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";

const BASE = import.meta.env.BASE_URL; // "/Portfolio/" on GitHub Pages

/** ======= ONE KNOB to size both images ======= */
const AVATAR_W = 210;                  // full-body width in px (try 190–240)
const HALF_W = Math.round(AVATAR_W/2); // peeking area (left half only)
/** Fine-tune bubble vertical position relative to the avatar’s mouth (0 = center) */
const BUBBLE_OFFSET_Y = -6;

export default function FloatingAvatar({
  email = "you@example.com",
  github = "yourhandle",
  linkedin = "yourhandle",
}) {
  const [open, setOpen] = React.useState(false);
  const hostRef = React.useRef(null);

  // Close on outside click / Esc
  React.useEffect(() => {
    const onDown = (e) => {
      if (!open) return;
      if (hostRef.current && !hostRef.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const toggle = () => setOpen(v => !v);

  return (
    <div className="fixed bottom-8 right-0 z-50 select-none" ref={hostRef}>
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* ===== PEEKING HALF (flush-right) — hidden when open ===== */}
        {!open && (
          <button
            type="button"
            aria-label="Open contact avatar"
            onClick={toggle}
            className="block"
            style={{ padding: 0, margin: 0 }}
          >
            {/* Wrapper defines visible region = EXACT left half */}
            <div
              className="overflow-hidden"
              style={{
                width: HALF_W,       // show only half
                // keep right edge perfectly flush
                marginRight: 0,
              }}
            >
              {/* Full image (same scale as expanded) */}
              <img
                src={`${BASE}converted_1.png`}
                alt="Avatar peeking"
                style={{ width: AVATAR_W, display: "block" }}
              />
            </div>
          </button>
        )}

        {/* ===== EXPANDED: only full body + bubble ===== */}
        {open && (
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3"
            // keep open on mouse within this block
            onClick={toggle}
          >
            {/* Bubble to the LEFT, centered around mouth */}
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
              {/* Tail pointing at the avatar’s mouth (center) */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-white" />
            </div>

            {/* Full body — exactly the same scale as peeking */}
            <img
              src={`${BASE}converted_2.png`}
              alt="Avatar open"
              style={{ width: AVATAR_W, display: "block" }}
              className="drop-shadow"
            />
          </div>
        )}
      </div>
    </div>
  );
}
