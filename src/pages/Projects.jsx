import React from "react";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-24">
      <div className="panel p-6">
        <h1 className="h1-poke mb-4">Projects</h1>
        <p className="text-sm text-gb-700 mb-6">
          Showcase your projects here in retro panels or cards.
        </p>

        {/* sample project card */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="panel p-4">
            <h3 className="font-press text-base mb-2">Project One</h3>
            <p className="text-sm text-gb-700">Short description of the project.</p>
          </div>
          <div className="panel p-4">
            <h3 className="font-press text-base mb-2">Project Two</h3>
            <p className="text-sm text-gb-700">Another cool thing you built.</p>
          </div>
        </div>

        <div className="mt-6">
          <Link to="/" className="btn-ghost">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
