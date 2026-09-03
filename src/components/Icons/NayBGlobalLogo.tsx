import React from "react";

interface NayBGlobalLogoProps {
  className?: string;
  variant?: "light" | "dark";
  showText?: boolean;
}

const NayBGlobalLogo: React.FC<NayBGlobalLogoProps> = ({
  className = "h-10",
  variant = "light",
  showText = true,
}) => {
  // Color palette based on user image:
  // Pink/Magenta icon: #E3007B
  // Deep Purple text: variant === "dark" ? "#FFFFFF" : "#4A0E4E"
  const textColor = variant === "dark" ? "#FFFFFF" : "#4A0E4E";
  const iconColor = "#E3007B";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon SVG */}
      <svg
        viewBox="0 0 100 100"
        className="h-full aspect-square shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Rounded Box Border */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="16"
          stroke={iconColor}
          strokeWidth="7"
          fill="none"
        />

        {/* Left Polygonal Pillar of N */}
        <path
          d="M 18 18 H 47 L 47 75 L 18 82 Z"
          fill={iconColor}
        />

        {/* Right Polygonal Pillar of N */}
        <path
          d="M 53 25 L 82 18 V 82 H 53 Z"
          fill={iconColor}
        />
      </svg>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col justify-center leading-none tracking-wider font-extrabold select-none">
          <span
            style={{ color: textColor }}
            className="text-[1.1rem] sm:text-[1.25rem] tracking-[0.12em] font-black uppercase"
          >
            NAY-B
          </span>
          <span
            style={{ color: textColor }}
            className="text-[1.1rem] sm:text-[1.25rem] tracking-[0.08em] font-black uppercase -mt-0.5"
          >
            GLOBAL
          </span>
        </div>
      )}
    </div>
  );
};

export default NayBGlobalLogo;
