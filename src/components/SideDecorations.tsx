import React from "react";
import { motion, useReducedMotion } from "motion/react";

export const SideDecorations: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden xl:block" aria-hidden="true">
      {/* Left side: subtle floating vertical coordinate strip + faint orb */}
      <motion.div
        animate={reduce ? {} : { y: [0, -18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-[#c73884]/[0.035] blur-3xl"
      />
      <div className="absolute left-4 top-1/3 flex flex-col items-center gap-6 opacity-30 select-none">
        <span className="h-16 w-px bg-gradient-to-b from-transparent via-[#40195f] to-transparent" />
        <span
          className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#40195f]"
          style={{ writingMode: "vertical-rl" }}
        >
          NAYBE · EST 2017
        </span>
        <span className="h-16 w-px bg-gradient-to-b from-[#40195f] via-[#c73884] to-transparent" />
      </div>

      {/* Right side: coordinates / chapter indicator inspired by Kage rail */}
      <motion.div
        animate={reduce ? {} : { y: [0, 18, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 top-2/3 h-96 w-96 rounded-full bg-[#40195f]/[0.035] blur-3xl"
      />
      <div className="absolute right-4 top-1/2 flex flex-col items-center gap-6 opacity-30 select-none">
        <span className="h-14 w-px bg-gradient-to-b from-transparent via-[#c73884] to-transparent" />
        <span
          className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#40195f]"
          style={{ writingMode: "vertical-rl" }}
        >
          GLOBAL IMMERSION
        </span>
        <span className="h-14 w-px bg-gradient-to-b from-[#c73884] via-transparent to-transparent" />
      </div>
    </div>
  );
};
