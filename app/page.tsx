"use client";
import { useState } from "react";
import LetterGlitch from "./components/LetterGlitch";
import Login from "./components/Login";

export default function Home() {
  // ROOT PAGE

  const original: string[] = [
    "#fbbe5b",
    "#1e9ae0",
    "#e1b2f0",
    "#f46049",
    "#06D6A0",
    "#073B4C",
    "#118AB2",
    "#FFD166",
    "#EF476F",
  ];
  const [glitchColors, setGlitchColors] = useState<string[]>(original);

  return (
    <div className="flex flex-col h-screen bg-black justify-center items-center text-white">
      <LetterGlitch
        key={String(glitchColors)}
        glitchColors={glitchColors}
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={true}
        smooth={true}
      />
      <Login setGlitchColors={setGlitchColors} />
    </div>
  );
}
