// src/pages/Projects.jsx
import React from "react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL || "/";

/* ----------------------------- Data ----------------------------- */
const COMPANIES = [
  {
    key: "fsu",
    name: "Fayetteville State University Intelligent Systems Laboratory",
    logo: `${BASE}fsu.png`,
    roles: [
      {
        title: "ISL Lead Student-Researcher",
        period: "April 2023–Present",
        desc: (
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Led a project analyzing SAR imagery of Venus to predict and map
              fault lines using ML. Built and tested pipelines for
              pre-processing, training, and post-processing (UNet, Mask2Former,
              Segformer). Funded by NASA JPL for the VERITAS mission.
            </li>
            <li>
              Tested UNet pipelines for ship detection on satellite imagery,
              including attempts to run on Snapdragon hardware. Funded by NASA
              JPL.
            </li>
            <li>
              Collected and annotated real/synthetic data to train models to
              detect small/rare real-world objects (e.g., CCTV cameras, military
              equipment). Funded by the DoD.
            </li>
          </ul>
        ),
      },
      {
        title: "ISL Lab Technician",
        period: "October 2024–June 2025",
        desc: (
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Maintained and regularly updated the organization’s vector
              computers. Helped onboard members who wanted to use the machines
              for their respective projects. Represented the organization in
              various school programs and activities.
            </li>
          </ul>
        ),
      },
      {
        title: "Faculty Research Lead Student Researcher",
        period: "May 2023–June 2025",
        desc: (
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Worked on efficient access-control schemes for implantable medical
              devices under the mentorship of Dr. Longfei Wu. Addressed
              compression/decompression of data transferred between devices.
              Funded by the National Science Foundation.
            </li>
            <li>
              Researched lightweight encryption under Dr. Longfei Wu; tested
              encryption/decryption algorithms on ESP8266 microchips. Funded by
              the National Science Foundation.
            </li>
          </ul>
        ),
      },
    ],
  },
  {
    key: "nasa",
    name: "NASA Jet Propulsion Laboratory",
    logo: `${BASE}nasa.png`,
    roles: [
      {
        title: "Data Science/Machine Learning Intern",
        period: "June 2024–August 2024",
        desc: (
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Built tools to monitor phenology of tropical trees under the
              mentorship of Dr. Gary Doran Jr.; tested and reported performance
              of different ML models for detecting phenological events across
              species.
            </li>
          </ul>
        ),
      },
    ],
  },
];

/* ----------------------------- Projects & Journals ----------------------------- */
// Add a `type` so the Project List “tabs” can filter.
const PROJECTS = [
  {
    title: "NASA Minds Competition",
    blurb:
      "Created an inventory tracking system that utilizes RFID technology for ease of inventory management.",
    type: "competition",
  },
  {
    title: "EventPulse NC Competition",
    blurb: (
      <>
        Created an “all-in-one” calendar website that collects and categorizes
        all major events for all major universities within North Carolina. See the{" "}
        <a
          href="https://luishernandez9.github.io/EventPulse_NC/" /* TODO: replace with real URL */
          target="_blank"
          rel="noreferrer"
          className="underline hover:opacity-80"
        >
          website
        </a>
        .
      </>
    ),
    type: "competition",
  },
  {
    title: "Senior Project",
    blurb:
      "Developed a multi-modal AI system designed to automate the documentation process of first aid application on an injured person via synchronized audio and video data",
    type: "capstone",
  },
  {
    title: "Software Development Project",
    blurb: (
      <>
        Developed a car rental{" "}
        <a
          href="https://github.com/TaylorBrown96/Car-Rental.git" /* TODO: replace with real repo */
          target="_blank"
          rel="noreferrer"
          className="underline hover:opacity-80"
        >
          system
        </a>{" "}
        complete with multiple functionalities such as database management, maps,
        automatic pricing, car maintenance, etc.
      </>
    ),
    type: "coursework",
  },
  {
    title: "Portfolio Website",
    blurb: "I built this website, brick by brick.",
    type: "personal",
  },
];

// Sub-tabs shown inside the Project List window
const PROJECT_TABS = [
  { id: "all", label: "All" },
  { id: "competition", label: "Competitions" },
  { id: "capstone", label: "Capstone" },
  { id: "coursework", label: "Coursework" },
  { id: "personal", label: "Personal" },
];

const JOURNALS = [
  {
    title:
      "Real-Time Multimodal AI for Medical Intervention Understanding",
    blurb:
      "Wilkerson, M., Brown, T. J., Davis, G., White, T., Lockart, J., Hernandez, L., & Bhattacharya, S. (2025, August, accepted). Real-Time Multimodal AI for Medical Intervention Understanding. In 11th IEEE International Conference on Data Science and Systems 2025 (DSS-2025). IEEE.",
  },
  {
    title:
      "From tiles to tectonics: Stitching ML-segmented faults into a global Venus fault map",
    blurb:
      "Thuya, L., House, J., Hernandez, L., Hasnain, Z., Mendoza, S., Chou, E., Nakaya, S., & Smrekar, S. (2025, July, submitted). From tiles to tectonics: Stitching ML-segmented faults into a global Venus fault map. In Agu Fall Meeting 2025 (AGU25), American Geophysical Union.",
  },
  {
    title:
      "Automated mapping of wrinkle ridge faults on Venus using machine learning",
    blurb:
      "Chou, E., Hernandez, L., Hasnain, Z., Smrekar, S., Thuya, L., House, J., Nakaya, S., & Mendoza, S. (2025, July, submitted). Automated mapping of wrinkle ridge faults on Venus using machine learning. In AGU Fall Meeting 2025 (AGU25). American Geophysical Union.",
  },
];

/* --------------------------- Helpers --------------------------- */
// Brand-colored name renderer
function CompanyName({ company }) {
  if (company.key === "fsu") {
    return (
      <span className="text-[#0033A0]">
        {company.name}
      </span>
    );
  }
  if (company.key === "nasa") {
    return (
      <span>
        <span className="text-[#0B3D91]">NASA</span>
        <span className="text-[#E03C31]"> Jet Propulsion Laboratory</span>
      </span>
    );
  }
  return <span>{company.name}</span>;
}

function iconsFor(companyKey, openRoleIdx) {
  if (openRoleIdx === -1) {
    return companyKey === "nasa" ? ["nasa.png"] : ["fsu.png"];
  }
  if (companyKey === "nasa") return ["nasa.png"];
  if (companyKey === "fsu") {
    if (openRoleIdx === 0) return ["fsu.png", "dod.png", "nasa.png", "isl.png"];
    if (openRoleIdx === 1) return ["fsu.png", "isl.png"];
    if (openRoleIdx === 2) return ["fsu.png"];
  }
  return ["fsu.png"];
}

// Right-side bobbing icons
function RightIconShowcase({ icons }) {
  const one = "h-40 w-40 md:h-44 md:w-44";
  const two = "h-36 w-36 md:h-40 md:w-40";
  const four = "h-32 w-32 md:h-36 md:w-36";

  const R2 = 140;
  const R4 = 100;

  return (
    <div className="relative w-full h-[clamp(280px,45vh,440px)]">
      <style>{`
        @keyframes bobY { 0%{transform:translateY(0)} 50%{transform:translateY(-8px)} 100%{transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      `}</style>

      {icons.length === 1 && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fadeIn_.18s_ease-out_both]">
          <div className="animate-[bobY_2.4s_ease-in-out_infinite]">
            <img src={`${BASE}${icons[0]}`} alt="" className={`${one} object-contain pointer-events-none select-none`} draggable={false} decoding="async" />
          </div>
        </div>
      )}

      {icons.length === 2 && (
        <>
          <div className="absolute left-1/2 top-1/2 animate-[fadeIn_.18s_ease-out_both]" style={{ transform: `translate(calc(-50% - ${R2}px), -50%)` }}>
            <div className="animate-[bobY_2.4s_ease-in-out_infinite]">
              <img src={`${BASE}${icons[0]}`} alt="" className={`${two} object-contain pointer-events-none select-none`} draggable={false} decoding="async" />
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 animate-[fadeIn_.18s_ease-out_.06s_both]" style={{ transform: `translate(calc(-50% + ${R2}px), -50%)` }}>
            <div className="animate-[bobY_2.4s_ease-in-out_infinite]">
              <img src={`${BASE}${icons[1]}`} alt="" className={`${two} object-contain pointer-events-none select-none`} draggable={false} decoding="async" />
            </div>
          </div>
        </>
      )}

      {icons.length === 4 && (
        <>
          <div className="absolute left-1/2 top-1/2 animate-[fadeIn_.18s_ease-out_both]" style={{ transform: `translate(-50%, calc(-50% - ${R4}px))` }}>
            <div className="animate-[bobY_2.4s_ease-in-out_infinite]">
              <img src={`${BASE}${icons[0]}`} alt="" className={`${four} object-contain pointer-events-none select-none`} draggable={false} decoding="async" />
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 animate-[fadeIn_.18s_ease-out_.04s_both]" style={{ transform: `translate(calc(-50% + ${R4}px), -50%)` }}>
            <div className="animate-[bobY_2.4s_ease-in-out_infinite]">
              <img src={`${BASE}${icons[1]}`} alt="" className={`${four} object-contain pointer-events-none select-none`} draggable={false} decoding="async" />
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 animate-[fadeIn_.18s_ease-out_.08s_both]" style={{ transform: `translate(-50%, calc(-50% + ${R4}px))` }}>
            <div className="animate-[bobY_2.4s_ease-in-out_infinite]">
              <img src={`${BASE}${icons[2]}`} alt="" className={`${four} object-contain pointer-events-none select-none`} draggable={false} decoding="async" />
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 animate-[fadeIn_.18s_ease-out_.12s_both]" style={{ transform: `translate(calc(-50% - ${R4}px), -50%)` }}>
            <div className="animate-[bobY_2.4s_ease-in-out_infinite]">
              <img src={`${BASE}${icons[3]}`} alt="" className={`${four} object-contain pointer-events-none select-none`} draggable={false} decoding="async" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* --------------------------- Component -------------------------- */
export default function Projects() {
  const [mode, setMode] = React.useState("exp"); // "exp" | "proj"
  const [companyIdx, setCompanyIdx] = React.useState(0);
  const [openRoleIdx, setOpenRoleIdx] = React.useState(-1); // -1 = none selected
  const [projTab, setProjTab] = React.useState("all"); // sub-tabs inside Project List

  const company = COMPANIES[companyIdx];

  React.useEffect(() => {
    setOpenRoleIdx(-1); // change company -> reset to "none selected"
  }, [companyIdx]);

  const rightIcons = mode === "exp" ? iconsFor(company.key, openRoleIdx) : [];

  // filtered projects for current tab
  const filteredProjects =
    projTab === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.type === projTab);

  return (
    <section
      className="
        mx-auto
        max-w-[1200px] md:max-w-[1320px] lg:max-w-[1400px]
        px-4 sm:px-6 lg:px-8
      "
    >
      <div
        className="
          panel
          mt-6 sm:mt-10
          p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14
          min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh]
          flex flex-col
        "
      >
        {/* Header: Experience / Projects toggle */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <h1 className="font-press leading-[1.1] text-[clamp(22px,3.2vw,44px)]">
            {mode === "exp" ? "Experience" : "Projects"}
          </h1>

          <button
            type="button"
            onClick={() => setMode((m) => (m === "exp" ? "proj" : "exp"))}
            className="panel px-3 py-2 font-press text-[12px] sm:text-[13px] hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            {mode === "exp" ? "▶ Projects" : "◀ Experience"}
          </button>
        </div>

        {/* Body */}
        {mode === "exp" ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-6 sm:gap-8">
            {/* LEFT: Trainer card fields (company + roles) */}
            <div className="panel p-4 sm:p-5 md:p-6 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="font-press tracking-wide text-[14px] sm:text-[15px]">
                  TRAINER CARD
                </div>
                <div className="font-press text-[12px] opacity-80">ID No. 0209</div>
              </div>
              <div className="mt-1 h-[2px] bg-sky-700/60" />

              {/* NAME */}
              <div className="mt-4">
                <div className="font-press text-[12px] tracking-widest text-gb-800 mb-1">
                  NAME
                </div>
                <div className="panel px-3 py-2 font-press text-[15px]">
                  <CompanyName company={company} />
                </div>
              </div>

              {/* POSITIONS */}
              <div className="mt-4">
                <div className="font-press text-[12px] tracking-widest text-gb-800 mb-2">
                  POSITIONS
                </div>

                <ul className="space-y-2">
                  {company.roles.map((r, i) => {
                    const open = i === openRoleIdx;
                    return (
                      <li key={r.title} className="panel">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenRoleIdx((idx) => (idx === i ? -1 : i))
                          }
                          className="w-full flex items-center justify-between gap-3 px-3 py-2 text-left"
                        >
                          {/* Job titles wrap; dates don't */}
                          <span className="font-press text-[13px]">
                            {r.title}
                          </span>
                          <span className="font-press text-[11px] opacity-70 whitespace-nowrap">
                            {r.period}
                          </span>
                        </button>

                        <div
                          className="overflow-hidden transition-[max-height,opacity] duration-300"
                          style={{
                            maxHeight: open ? 300 : 0,
                            opacity: open ? 1 : 0,
                          }}
                        >
                          <div className="px-3 pb-3 pt-0">
                            {typeof r.desc === "string" ? (
                              <p className="text-gb-800 text-[14px] leading-relaxed">
                                {r.desc}
                              </p>
                            ) : (
                              <div className="text-gb-800 text-[14px] leading-relaxed">
                                {r.desc}
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* BADGES */}
              <div className="mt-5">
                <div className="font-press text-[12px] tracking-widest text-gb-800 mb-2">
                  BADGES
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {COMPANIES.map((c, i) => {
                    const active = i === companyIdx;
                    return (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => setCompanyIdx(i)}
                        className={`panel flex items-center justify-center p-2 transition ${
                          active ? "ring-2 ring-sky-700" : "hover:scale-[1.02]"
                        }`}
                        aria-label={`Select ${c.name}`}
                      >
                        <img
                          src={c.logo}
                          alt=""
                          className="h-10 w-10 object-contain"
                          draggable={false}
                          decoding="async"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT: icon showcase */}
            <div className="panel relative">
              <div
                className="absolute inset-0 opacity-[0.85] pointer-events-none rounded-[6px]"
                style={{
                  background:
                    "repeating-linear-gradient(180deg,#6fd0cf 0 6px,#63c5c4 6px 12px)",
                  maskImage:
                    "linear-gradient(180deg,rgba(0,0,0,0.15),rgba(0,0,0,1))",
                  WebkitMaskImage:
                    "linear-gradient(180deg,rgba(0,0,0,0.15),rgba(0,0,0,1))",
                }}
              />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <RightIconShowcase icons={rightIcons} />
              </div>
            </div>
          </div>
        ) : (
          /* -------------------- PROJECTS TAB -------------------- */
          <div className="space-y-6">
            {/* PROJECT LIST window */}
            <div className="panel p-4 sm:p-5 md:p-6">
              <div className="font-press tracking-wide text-[14px] sm:text-[15px]">
                PROJECT LIST
              </div>
              <div className="mt-1 h-[2px] bg-sky-700/60 mb-4" />

              {/* Sub-tabs inside the Project List window */}
              <div role="tablist" aria-label="Project filters" className="mb-4 flex flex-wrap gap-2">
                {PROJECT_TABS.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={projTab === t.id}
                    aria-controls={`projlist-${t.id}`}
                    tabIndex={projTab === t.id ? 0 : -1}
                    onClick={() => setProjTab(t.id)}
                    className={`panel px-3 py-2 font-press text-[12px] sm:text-[13px] transition
                      ${projTab === t.id ? "ring-2 ring-sky-700" : "hover:scale-[1.02]"}`}
                  >
                    {t.label} (
                    {t.id === "all"
                      ? PROJECTS.length
                      : PROJECTS.filter((p) => p.type === t.id).length}
                    )
                  </button>
                ))}
              </div>

              {/* Filtered grid */}
              <div id={`projlist-${projTab}`} role="tabpanel" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((p) => (
                  <div key={p.title} className="panel p-4">
                    <h3 className="font-press text-base mb-2">{p.title}</h3>
                    {typeof p.blurb === "string" ? (
                      <p className="text-sm text-gb-800 leading-relaxed">{p.blurb}</p>
                    ) : (
                      <div className="text-sm text-gb-800 leading-relaxed">{p.blurb}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SCIENTIFIC JOURNALS window */}
            <div className="panel p-4 sm:p-5 md:p-6">
              <div className="font-press tracking-wide text-[14px] sm:text-[15px]">
                SCIENTIFIC JOURNALS
              </div>
              <div className="mt-1 h-[2px] bg-sky-700/60 mb-4" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {JOURNALS.map((j) => (
                  <div key={j.title} className="panel p-4">
                    <h3 className="font-press text-base mb-2">{j.title}</h3>
                    <p className="text-sm text-gb-800 leading-relaxed">{j.blurb}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom actions */}
        <div className="mt-6 flex items-center justify-between">
          <Link
            to="/"
            className="panel inline-block px-4 py-2 font-press text-[12px] sm:text-[13px]"
          >
            Back to Home
          </Link>

          <a
            href={`${BASE}LuisHernandez_Resume.pdf`}
            download
            className="panel inline-block px-4 py-2 font-press text-[12px] sm:text-[13px] hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            Resume
          </a>
        </div>

        <div className="flex-1" />
      </div>
    </section>
  );
}
