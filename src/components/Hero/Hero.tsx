import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { heroBenefits } from "../../utils/content";
import { Button } from "../ui/button";

const Hero: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative m-auto max-w-[108rem] px-4 sm:px-6 lg:px-8">
      {/* Collage & Editorial Hero Card */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary-800 via-primary-700 to-primary-300 p-8 sm:p-12 lg:p-20 text-white shadow-2xl">
        {/* Subtle Background Pattern & Image Overlay */}
        <div 
          className="absolute inset-0 bg-[url('/hero.webp')] bg-cover bg-center opacity-30 mix-blend-overlay"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-800/90 via-transparent to-primary-800/30" />

        <div className="relative z-10 max-w-4xl pt-8 pb-16 sm:pb-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOutExpo" }}
            className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-100 backdrop-blur-md border border-white/15 mb-6"
          >
            Nostalgic Travel & Exchange • 2026 Edition
          </motion.div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.1] mb-6">
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOutExpo" }}
              className="block"
            >
              Start Your Memorable
            </motion.span>
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOutExpo" }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-100 to-pink-200"
            >
              Journey Here
            </motion.span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOutExpo" }}
            className="text-lg sm:text-xl text-primary-100 max-w-2xl font-light leading-relaxed mb-8"
          >
            Where unforgettable student exchange programs, cultural escapes, and lifelong memories await your exploration.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOutExpo" }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Button 
              size="lg" 
              className="bg-primary-300 hover:bg-pink-600 text-white font-medium border-0 shadow-lg shadow-pink-500/25 active:scale-[0.98] transition-transform duration-150"
            >
              Explore Destinations
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 hover:text-white active:scale-[0.98] transition-transform duration-150"
            >
              Watch Experience
            </Button>
          </motion.div>
        </div>

        {/* Floating Benefits Bar (Desktop Layout) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOutExpo" }}
          className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl bg-white/95 backdrop-blur-md p-6 text-slate-800 shadow-xl border border-white/20"
        >
          {heroBenefits.map((benefit, i) => (
            <motion.div
              key={benefit.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: "easeOutExpo" }}
              className="flex items-start space-x-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <benefit.Icon className="h-6 w-6 fill-current" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-800 text-base mb-1">{benefit.heading}</h3>
                <p className="text-xs text-slate-500 leading-normal">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
