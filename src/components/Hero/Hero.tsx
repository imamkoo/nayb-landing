import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "motion/react";
import { heroBenefits } from "../../utils/content";
import { Button } from "../ui/button";

const Hero: React.FC = () => {
  const reduce = useReducedMotion();
  const [timeString, setTimeString] = useState<string>("");

  // Live Realtime Clock for Floating Badge (like reference image widget)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3D Parallax Tilt Effect setup using Framer Motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative m-auto max-w-[108rem] px-4 sm:px-6 lg:px-8 pt-4 pb-12 perspective-[1200px]">
      {/* 3D Tilt Wrapper */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          reduce
            ? {}
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary-800 via-[#4A0E4E] to-[#6b1670] p-8 sm:p-12 lg:p-16 text-white shadow-2xl transition-all duration-200 border border-white/10"
      >
        {/* Decorative Background Glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary-300/30 blur-3xl" />
        
        {/* Subtle Overlay Pattern */}
        <div 
          className="absolute inset-0 bg-[url('/hero.webp')] bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none"
          aria-hidden="true"
        />

        {/* Floating Top Right Time Widget (Inspired by Reference Design) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ transform: "translateZ(40px)" }}
          className="absolute top-6 right-6 sm:top-10 sm:right-10 z-20 hidden md:flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 backdrop-blur-xl border border-white/20 shadow-lg"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-pink-200">
              GLOBAL DESTINATION TIME
            </span>
            <span className="font-mono text-sm font-bold tracking-wider text-white">
              {timeString || "12:00:00"}
            </span>
          </div>
        </motion.div>

        {/* Left Decorative Floating Graphic / Palm Leaf Shape */}
        <motion.div
          animate={
            reduce
              ? {}
              : {
                  y: [0, -15, 0],
                  rotate: [0, 4, 0],
                }
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(30px)" }}
          className="pointer-events-none absolute -left-12 bottom-10 hidden xl:block opacity-40 hover:opacity-60 transition-opacity"
        >
          <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
            <path
              d="M30 170 C60 100, 120 40, 170 30 C120 70, 90 120, 30 170 Z"
              fill="url(#leafGrad)"
            />
            <defs>
              <linearGradient id="leafGrad" x1="0" y1="0" x2="200" y2="200">
                <stop offset="0%" stopColor="#E3007B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#5B0E8B" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Main Content Box with 3D Depth */}
        <div style={{ transform: "translateZ(50px)" }} className="relative z-10 max-w-4xl pt-4 pb-12 sm:pb-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full bg-pink-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-pink-200 backdrop-blur-md border border-pink-500/30 mb-6 shadow-inner"
          >
            <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
            NAY-B GLOBAL • NOSTALGIC TRAVEL & EXCHANGE
          </motion.div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08] mb-6">
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="block font-serif tracking-normal"
            >
              ALOHA &amp; WELCOME
            </motion.span>
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-pink-300"
            >
              YOUR MEMORABLE JOURNEY AWAITS
            </motion.span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-pink-100/90 max-w-2xl font-light leading-relaxed mb-8"
          >
            Discover hand-crafted study adventures, vibrant cultural immersion, and stress-free global travel tailored for your future.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Button 
              size="lg" 
              className="bg-[#E3007B] hover:bg-[#c7006c] text-white font-semibold border-0 shadow-lg shadow-pink-600/30 active:scale-95 transition-all duration-200 rounded-full px-8 py-6 text-base"
            >
              Explore Destinations
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 hover:text-white active:scale-95 transition-all duration-200 rounded-full px-8 py-6 text-base backdrop-blur-md"
            >
              Watch Video Story
            </Button>
          </motion.div>
        </div>

        {/* Floating Benefits Cards with 3D Depth Layer */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ transform: "translateZ(60px)" }}
          className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-3xl bg-white/95 backdrop-blur-xl p-6 text-slate-800 shadow-2xl border border-white/40"
        >
          {heroBenefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-start space-x-4 p-3 rounded-2xl transition-colors hover:bg-pink-50/50"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-[#E3007B] text-white shadow-md">
                <benefit.Icon className="h-6 w-6 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-[#4A0E4E] text-base mb-1">{benefit.heading}</h3>
                <p className="text-xs text-slate-500 leading-normal">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
