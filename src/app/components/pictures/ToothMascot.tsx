import React from "react";

export function ToothMascot() {
  return (
    <svg viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" style={{ width: 180, height: 220 }}>
      <defs>
        <radialGradient id="tg" cx="45%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#daeeff" />
        </radialGradient>
      </defs>
      <path d="M90 20 C55 20 30 45 30 75 C30 100 35 125 42 155 C46 170 52 190 62 190 C70 190 74 178 80 165 C83 157 86 152 90 152 C94 152 97 157 100 165 C106 178 110 190 118 190 C128 190 134 170 138 155 C145 125 150 100 150 75 C150 45 125 20 90 20Z" fill="url(#tg)" stroke="#b8d8f0" strokeWidth="2" />
      <circle cx="58" cy="118" r="12" fill="#ffb3c6" opacity=".6" />
      <circle cx="122" cy="118" r="12" fill="#ffb3c6" opacity=".6" />
      <ellipse cx="74" cy="95" rx="14" ry="16" fill="#fff" stroke="#a0c4e0" strokeWidth="1" />
      <ellipse cx="106" cy="95" rx="14" ry="16" fill="#fff" stroke="#a0c4e0" strokeWidth="1" />
      <circle cx="76" cy="97" r="7" fill="#3b82f6" />
      <circle cx="108" cy="97" r="7" fill="#3b82f6" />
      <circle cx="78" cy="95" r="3" fill="#1e3a8a" />
      <circle cx="110" cy="95" r="3" fill="#1e3a8a" />
      <circle cx="80" cy="92" r="2" fill="#fff" />
      <circle cx="112" cy="92" r="2" fill="#fff" />
      <path d="M70 120 Q90 138 110 120" stroke="#1e3a8a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <line x1="90" y1="120" x2="90" y2="134" stroke="#b8d8f0" strokeWidth="1.5" />
      <path d="M38 100 Q18 110 22 130" stroke="#daeeff" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M142 100 Q162 108 160 128" stroke="#daeeff" strokeWidth="10" fill="none" strokeLinecap="round" />
      <line x1="158" y1="126" x2="172" y2="148" stroke="#888" strokeWidth="5" strokeLinecap="round" />
      <circle cx="150" cy="115" r="18" fill="rgba(200,230,255,.5)" stroke="#aaa" strokeWidth="4" />
      <circle cx="150" cy="115" r="14" fill="rgba(220,240,255,.3)" />
    </svg>
  );
}
