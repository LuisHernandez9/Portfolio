import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-24">
      <div className="panel p-6">
        <h1 className="h1-poke mb-4">About</h1>
        <p className="text-sm text-gb-700">
          Put your bio here. Keep it short and delightful—like a Pokédex entry.
        </p>

        <div className="mt-6">
          <Link to="/" className="btn-ghost">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
