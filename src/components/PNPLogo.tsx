/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface PNPLogoProps {
  className?: string;
  size?: number;
}

export default function PNPLogo({ className = '', size = 64 }: PNPLogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`} id="pnp-logo-container">
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg select-none"
        id="pnp-svg-element"
      >
        {/* Helper Paths for Text Curving (Invisible) */}
        <defs>
          {/* Top text path - clockwise arc inside yellow ring */}
          <path id="top-text-path" d="M 46,200 A 154,154 0 0,1 354,200" fill="none" />
          {/* Bottom text path - counter-clockwise arc to make text upright inside yellow ring */}
          <path id="bottom-text-path" d="M 44,200 A 156,156 0 0,0 356,200" fill="none" />
          {/* Banner text path - gentle curve along motto ribbon */}
          <path id="banner-text-path" d="M 144,264 Q 200,277 256,264" fill="none" />
        </defs>

        {/* 1. Outer Deep Blue/Indigo Ring Border */}
        <circle cx="200" cy="200" r="192" fill="#1e3a8a" />
        
        {/* 2. Yellow Inner Ring Background */}
        <circle cx="200" cy="200" r="186" fill="#facc15" stroke="#1d4ed8" strokeWidth="2" />

        {/* 3. Top Curved Text: "FOR GOD AND COUNTRY" */}
        <text 
          fill="#c22020" 
          fontSize="22" 
          fontWeight="900" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          letterSpacing="2.5"
        >
          <textPath href="#top-text-path" startOffset="50%" textAnchor="middle">
            FOR GOD AND COUNTRY
          </textPath>
        </text>

        {/* 4. Bottom Curved Text: "ZAMBOANGA DEL NORTE POLICE PROVINCIAL OFFICE" */}
        <text 
          fill="#1e3a8a" 
          fontSize="13" 
          fontWeight="900" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          letterSpacing="0.8"
        >
          <textPath href="#bottom-text-path" startOffset="50%" textAnchor="middle">
            ZAMBOANGA DEL NORTE POLICE PROVINCIAL OFFICE
          </textPath>
        </text>

        {/* 5. Center Sky Blue Base Field */}
        <circle cx="200" cy="200" r="132" fill="#54b8ec" stroke="#1e3a8a" strokeWidth="4" />

        {/* 6. Symmetrical Green Laurel Leaf Wreaths */}
        {/* Left Laurel Branch */}
        <path d="M 190,314 A 114,114 0 0,1 106,180" fill="none" stroke="#15803d" strokeWidth="2.5" />
        {/* Right Laurel Branch */}
        <path d="M 210,314 A 114,114 0 0,0 294,180" fill="none" stroke="#15803d" strokeWidth="2.5" />

        {/* Stylized Laurel Leaf Clusters (Left Side) */}
        <path d="M 184,310 C 172,306 166,312 166,316 C 166,320 172,324 184,310 Z" fill="#16a34a" />
        <path d="M 170,296 C 158,290 152,296 152,300 C 152,304 158,308 170,296 Z" fill="#16a34a" />
        <path d="M 154,278 C 142,270 136,276 136,280 C 136,284 142,288 154,278 Z" fill="#16a34a" />
        <path d="M 140,256 C 128,248 122,254 122,258 C 122,262 128,266 140,256 Z" fill="#16a34a" />
        <path d="M 129,232 C 117,224 111,230 111,234 C 111,238 117,242 129,232 Z" fill="#16a34a" />
        <path d="M 120,208 C 108,198 102,204 102,208 C 102,212 108,216 120,208 Z" fill="#16a34a" />
        <path d="M 115,182 C 103,172 97,178 97,182 C 97,186 103,190 115,182 Z" fill="#16a34a" />

        {/* Stylized Laurel Leaf Clusters (Right Side) */}
        <path d="M 216,310 C 228,306 234,312 234,316 C 234,320 228,324 216,310 Z" fill="#16a34a" />
        <path d="M 230,296 C 242,290 248,296 248,300 C 248,304 242,308 230,296 Z" fill="#16a34a" />
        <path d="M 246,278 C 258,270 264,276 264,280 C 264,284 258,288 246,278 Z" fill="#16a34a" />
        <path d="M 260,256 C 272,248 278,254 278,258 C 278,262 272,266 260,256 Z" fill="#16a34a" />
        <path d="M 271,232 C 283,224 289,230 289,234 C 289,238 283,242 271,232 Z" fill="#16a34a" />
        <path d="M 280,208 C 292,198 298,204 298,208 C 298,212 292,216 280,208 Z" fill="#16a34a" />
        <path d="M 285,182 C 297,172 303,178 303,182 C 303,186 297,190 285,182 Z" fill="#16a34a" />

        {/* 7. Inner Flag Tri-Color Roundel */}
        {/* White Sector (Top 120 degrees) */}
        <path d="M 200,200 L 136,164 A 74,74 0 0,1 264,164 Z" fill="#ffffff" stroke="#1e3a8a" strokeWidth="2" />
        {/* Red Sector (Bottom Left 120 degrees) */}
        <path d="M 200,200 L 136,164 A 74,74 0 0,0 200,274 Z" fill="#dc2626" stroke="#1e3a8a" strokeWidth="2" />
        {/* Blue Sector (Bottom Right 120 degrees) */}
        <path d="M 200,200 L 200,274 A 74,74 0 0,0 264,164 Z" fill="#1e1b4b" stroke="#1e3a8a" strokeWidth="2" />

        {/* 8. Central Golden Sun with 8 Radial Rays */}
        {/* Combined Sun Rays Shape */}
        <path 
          d="M 194,172 L 200,154 L 206,172 M 228,194 L 246,200 L 228,206 M 194,228 L 200,246 L 206,228 M 172,194 L 154,200 L 172,206 M 215,178 L 232,168 L 222,185 M 222,215 L 232,232 L 215,222 M 185,222 L 168,232 L 178,215 M 178,185 L 168,168 L 185,178 Z" 
          fill="#fcd34d" 
          stroke="#d97706" 
          strokeWidth="1.2" 
        />
        {/* Sun Core Circle */}
        <circle cx="200" cy="200" r="24" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" />

        {/* 9. Lapu-Lapu Warrior Silhouette in Core (Black) */}
        {/* Warrior Shield */}
        <path d="M 209,191 L 212,198 L 209,205 C 207,201 207,195 209,191 Z" fill="#000" />
        {/* Warrior Kampilan Sword */}
        <path d="M 187,191 L 194,197 L 193,199 L 186,193 Z" fill="#000" />
        {/* Warrior Pose Body */}
        <path d="M 199,188 C 201,188 201,190 199,191 C 197,192 196,193 197,195 L 203,195 L 204,197 L 202,201 L 204,209 L 201,209 L 199,204 L 197,209 L 194,209 L 197,201 L 195,197 Z" fill="#000" />

        {/* 10. Three Golden Stars (Luzon, Visayas, Mindanao) */}
        {/* Top-Center Star */}
        <polygon points="200,135 201.5,138.5 205,138.5 202,141 203.5,145 200,142.5 196.5,145 198,141 195,138.5 198.5,138.5" fill="#fcd34d" stroke="#d97706" strokeWidth="0.5" />
        {/* Middle-Left Star */}
        <polygon points="152,171 153.5,174.5 157,174.5 154,177 155.5,181 152,178.5 148.5,181 150,177 147,174.5 150.5,174.5" fill="#fcd34d" stroke="#d97706" strokeWidth="0.5" />
        {/* Middle-Right Star */}
        <polygon points="248,171 249.5,174.5 253,174.5 250,177 251.5,181 248,178.5 244.5,181 246,177 243,174.5 246.5,174.5" fill="#fcd34d" stroke="#d97706" strokeWidth="0.5" />

        {/* 11. Motto Banner / Ribbon at Bottom */}
        {/* Ribbon Outer Shape */}
        <path d="M 140,256 Q 200,271 260,256 L 255,274 Q 200,289 145,274 Z" fill="#ffffff" stroke="#dc2626" strokeWidth="1.8" />
        {/* Ribbon Curved Text "BRAVERY LOYALTY INTEGRITY" */}
        <text 
          fill="#dc2626" 
          fontSize="7.8" 
          fontWeight="900" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          letterSpacing="0.8"
        >
          <textPath href="#banner-text-path" startOffset="50%" textAnchor="middle">
            BRAVERY LOYALTY INTEGRITY
          </textPath>
        </text>
      </svg>
      <div className="text-center mt-2" id="pnp-seal-titles">
        <h2 className="text-[11px] font-bold tracking-widest text-[#1e3a8a] uppercase font-sans">
          Philippine National Police
        </h2>
        <p className="text-[9px] text-[#b45309] font-mono tracking-wider font-semibold uppercase">
          Zamboanga del Norte PPO
        </p>
      </div>
    </div>
  );
}
