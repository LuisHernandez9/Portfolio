import React from "react";
import { Link } from "react-router-dom";

export default function Skills() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-24">
      <div className="panel p-6">
        <h1 className="h1-poke mb-4">Skills</h1>
        <p className="text-sm text-gb-700 mb-6">
          List your skills with 16-bit charm.
        </p>

        <ul className="grid sm:grid-cols-2 gap-3">
          <li className="panel p-3">JavaScript / TypeScript</li>
          <li className="panel p-3">React / Vite</li>
          <li className="panel p-3">Tailwind / CSS</li>
          <li className="panel p-3">Python / ML</li>
        </ul>

        <div className="mt-6">
          <Link to="/" className="btn-ghost">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
