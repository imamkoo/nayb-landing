import React from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Kage-style vertical side rails.
 * Thin fixed columns with rotated micro-labels and hairlines so the wide
 * viewport doesn't read empty on desktop — purely decorative, aria-hidden.
 */
const SideRails: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-y-0 z-30 hidden w-full lg:block" aria-hidden="true">
      <div className="relative mx-auto h-full max-w-[100rem]">
        {/* Left rail */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute left-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-5"
        >
          <span className="hair h-20 w-px" />
          <span className="vwrite eyebrow text-primary-700/45">NAYBE · EDU TOUR</span>
          <span className="hair h-20 w-px" />
        </motion.div>

        {/* Right rail */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-5"
        >
          <span className="hair h-20 w-px" />
          <span className="vwrite eyebrow text-primary-300/60">EST. 2017</span>
          <span className="hair h-20 w-px" />
        </motion.div>
      </div>
    </div>
  );
};

export default SideRails;
