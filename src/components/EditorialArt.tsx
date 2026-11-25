import React from "react";

export type ArtVariant =
  | "hagiang"
  | "camera"
  | "backpack"
  | "dalat"
  | "coffee"
  | "thamma"
  | "lolochai"
  | "nhoque"
  | "dalat-pine"
  | "dalat-cup"
  | "dalat-mist";

interface EditorialArtProps {
  variant?: ArtVariant;
  className?: string;
}

/**
 * Handcrafted Kinfolk-inspired editorial SVG illustrations used as crisp
 * default visuals when a post has not yet uploaded a Sanity CDN photo.
 */
export function EditorialArt({
  variant = "hagiang",
  className = "w-full h-full object-cover",
}: EditorialArtProps) {
  switch (variant) {
    case "camera":
      return (
        <svg viewBox="0 0 800 500" className={className} aria-hidden="true">
          <rect width="800" height="500" fill="#EFEAE1" />
          <polygon points="0,0 320,0 140,500 0,500" fill="#E3DBCF" opacity="0.55" />
          <ellipse cx="635" cy="365" rx="76" ry="30" fill="#C2593F" opacity="0.9" />
          <ellipse cx="635" cy="360" rx="64" ry="22" fill="#D56C52" />
          <rect
            x="95"
            y="290"
            width="185"
            height="145"
            rx="6"
            fill="#FAF8F5"
            stroke="#D7CEC2"
            strokeWidth="2"
            transform="rotate(-8 185 360)"
          />
          <ellipse cx="400" cy="378" rx="195" ry="26" fill="#B9AEA0" opacity="0.45" />
          <path
            d="M235 235 C165 250, 155 340, 210 385"
            fill="none"
            stroke="#8F5134"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M565 235 C635 245, 650 305, 600 345"
            fill="none"
            stroke="#8F5134"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <rect x="235" y="155" width="330" height="210" rx="18" fill="#23201E" />
          <path
            d="M253 155 H547 A18 18 0 0 1 565 173 V214 H235 V173 A18 18 0 0 1 253 155 Z"
            fill="#DED9D1"
          />
          <rect x="285" y="139" width="44" height="16" rx="4" fill="#CFC9C0" />
          <rect x="468" y="135" width="52" height="20" rx="4" fill="#C4BEB4" />
          <rect x="528" y="142" width="16" height="13" rx="3" fill="#C2593F" />
          <rect
            x="268"
            y="170"
            width="48"
            height="32"
            rx="6"
            fill="#2B2826"
            stroke="#A6A096"
            strokeWidth="2"
          />
          <circle cx="422" cy="285" r="76" fill="#D5CFC7" stroke="#A8A196" strokeWidth="4" />
          <circle cx="422" cy="285" r="60" fill="#2B2927" stroke="#6E6A65" strokeWidth="3" />
          <circle cx="422" cy="285" r="39" fill="#141312" />
          <circle cx="434" cy="272" r="8" fill="#FAF8F5" opacity="0.45" />
          <circle cx="410" cy="296" r="4" fill="#C2593F" opacity="0.65" />
        </svg>
      );

    case "backpack":
      return (
        <svg viewBox="0 0 800 500" className={className} aria-hidden="true">
          <rect width="800" height="500" fill="#ECE6DC" />
          <ellipse cx="400" cy="435" rx="170" ry="22" fill="#C5BCB0" opacity="0.5" />
          <path
            d="M350 112 Q400 72 450 112"
            fill="none"
            stroke="#2B332C"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <rect x="278" y="108" width="244" height="316" rx="44" fill="#3D473E" />
          <rect x="308" y="164" width="184" height="216" rx="20" fill="#2E362F" />
          <line x1="308" y1="258" x2="492" y2="258" stroke="#C2593F" strokeWidth="5" />
          <rect x="378" y="246" width="44" height="24" rx="5" fill="#C2593F" />
          <rect x="256" y="180" width="22" height="140" rx="10" fill="#29302A" />
          <rect x="522" y="180" width="22" height="140" rx="10" fill="#29302A" />
        </svg>
      );

    case "dalat":
    case "dalat-cup":
    case "coffee":
      return (
        <svg viewBox="0 0 800 500" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="dlSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EFE0CE" />
              <stop offset="100%" stopColor="#D9C3AD" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#dlSky)" />
          <circle cx="595" cy="125" r="42" fill="#FFF8EB" opacity="0.9" />
          <path
            d="M0 320 L145 190 L285 320 L435 170 L605 310 L740 205 L800 265 L800 500 L0 500 Z"
            fill="#475949"
          />
          <rect x="0" y="360" width="800" height="140" fill="#342B24" />
          <rect x="315" y="265" width="150" height="140" rx="20" fill="#C2593F" />
          <path
            d="M465 296 Q512 296 512 335 Q512 374 465 374"
            fill="none"
            stroke="#C2593F"
            strokeWidth="14"
          />
          <path
            d="M365 245 Q375 212 362 186 M405 242 Q416 205 402 178"
            fill="none"
            stroke="#FAF8F5"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      );

    case "lolochai":
      return (
        <svg viewBox="0 0 800 500" className={className} aria-hidden="true">
          <rect width="800" height="500" fill="#E6D7C6" />
          <path d="M0 280 L190 165 L390 250 L620 150 L800 225 L800 500 L0 500 Z" fill="#6F7D6C" opacity="0.45" />
          <rect x="150" y="220" width="500" height="215" fill="#B88E69" />
          <polygon points="105,232 400,115 695,232" fill="#5A4639" />
          <rect x="348" y="310" width="104" height="125" fill="#3D2E25" />
          <circle cx="220" cy="410" r="28" fill="#C2593F" />
          <circle cx="575" cy="404" r="34" fill="#C2593F" opacity="0.88" />
          <circle cx="622" cy="420" r="20" fill="#D9795E" />
        </svg>
      );

    case "nhoque":
      return (
        <svg viewBox="0 0 800 500" className={className} aria-hidden="true">
          <rect width="800" height="500" fill="#DDE4DF" />
          <path d="M0 130 L325 365 L0 500 Z" fill="#465A4E" />
          <path d="M800 105 L440 375 L800 500 Z" fill="#35463B" />
          <path
            d="M325 500 Q395 360 422 255 Q436 185 410 115"
            fill="none"
            stroke="#6C9E92"
            strokeWidth="52"
            strokeLinecap="round"
          />
          <path
            d="M325 500 Q395 360 422 255 Q436 185 410 115"
            fill="none"
            stroke="#9BC3B9"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      );

    case "thamma":
    case "dalat-pine":
    case "dalat-mist":
    case "hagiang":
    default:
      return (
        <svg viewBox="0 0 800 500" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="hgSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EAD8C5" />
              <stop offset="55%" stopColor="#F6E9D8" />
              <stop offset="100%" stopColor="#DFB89A" />
            </linearGradient>
            <linearGradient id="hgMist" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FAF6F0" stopOpacity="0" />
              <stop offset="55%" stopColor="#FAF6F0" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FAF6F0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#hgSky)" />
          <circle cx="565" cy="142" r="36" fill="#FFF9EE" opacity="0.92" />
          <path
            d="M0 300 L110 210 L220 265 L340 185 L480 250 L620 190 L735 245 L800 215 L800 500 L0 500 Z"
            fill="#A69688"
            opacity="0.72"
          />
          <rect x="0" y="215" width="800" height="120" fill="url(#hgMist)" />
          <path
            d="M0 340 Q150 250 310 315 T630 280 Q720 265 800 305 L800 500 L0 500 Z"
            fill="#566957"
          />
          <path
            d="M475 300 Q525 335 455 375 T515 470"
            fill="none"
            stroke="#8FB2A7"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M0 355 Q190 325 360 415 T800 430 L800 500 L0 500 Z"
            fill="#2E362F"
          />
          <path
            d="M-20 470 C110 450, 145 395, 255 410 C340 422, 315 475, 425 468 C510 462, 560 415, 675 432"
            fill="none"
            stroke="#C2593F"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M-20 470 C110 450, 145 395, 255 410 C340 422, 315 475, 425 468 C510 462, 560 415, 675 432"
            fill="none"
            stroke="#F4DFD4"
            strokeWidth="1.5"
            strokeDasharray="10 10"
            opacity="0.85"
          />
        </svg>
      );
  }
}
