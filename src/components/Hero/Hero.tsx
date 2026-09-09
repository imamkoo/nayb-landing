import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

type Dest = {
  id: string;
  country: string;
  short: string;
  tagline: string;
  program: string;
  image: string;
  city: string;
};

const DESTS: Dest[] = [
  { id: "japan", country: "JAPAN", short: "JP", tagline: "Tokyo, Kyoto & Mt. Fuji", program: "Pertukaran Pelajar • 7–14 Hari", city: "Osaka", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2560&auto=format&fit=crop" },
  { id: "china", country: "CHINA", short: "CN", tagline: "Beijing, Shanghai & Great Wall", program: "Study Tour • 6–12 Hari", city: "Beijing", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2560&auto=format&fit=crop" },
  { id: "indonesia", country: "INDONESIA", short: "ID", tagline: "Bali, Yogyakarta & Budaya Nusantara", program: "Edutrip • 5–10 Hari", city: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2560&auto=format&fit=crop" },
  { id: "singapore", country: "SINGAPORE", short: "SG", tagline: "Little Red Dot — Lab & Inovasi", program: "Campus Visit • 3–6 Hari", city: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2560&auto=format&fit=crop" },
  { id: "thailand", country: "THAILAND", short: "TH", tagline: "Bangkok & Chiang Mai", program: "School Immersion • 5–10 Hari", city: "Chiang Mai", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2560&auto=format&fit=crop" },
  { id: "vietnam", country: "VIETNAM", short: "VN", tagline: "Hanoi, Ha Long Bay & Hue", program: "Study Field Trip • 6–12 Hari", city: "Hanoi", image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2560&auto=format&fit=crop" },
  { id: "malaysia", country: "MALAYSIA", short: "MY", tagline: "Kuala Lumpur & Penang", program: "Edu Camp • 4–8 Hari", city: "Kuala Lumpur", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2560&auto=format&fit=crop" },
  { id: "philippines", country: "PHILIPPINES", short: "PH", tagline: "Cebu, El Nido & Boracay", program: "Language Trip • 7–14 Hari", city: "Cebu", image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?q=80&w=2560&auto=format&fit=crop" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const root = useRef<HTMLElement>(null);
  const bgTop = useRef<HTMLDivElement>(null);
  const bgBottom = useRef<HTMLDivElement>(null);
  const txtRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);

  const active = DESTS[idx];
  const go = useCallback((d: 1 | -1) => { setIdx((p) => (p + d + DESTS.length) % DESTS.length); }, []);

  useEffect(() => {
    if (reduce || paused) return;
    timer.current = window.setTimeout(() => go(1), 5000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [idx, paused, reduce, go]);

  useEffect(() => {
    if (reduce || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.to(bgTop.current, {
        yPercent: 20, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.to(bgBottom.current, {
        yPercent: 35, opacity: 0, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(txtRef.current, {
        yPercent: -20, opacity: 0, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "50% top", scrub: 0.8 },
      });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const bgMoveX = useTransform(sx, [-1, 1], ["-3%", "3%"]);
  const bgMoveY = useTransform(sy, [-1, 1], ["-3%", "3%"]);
  const overMoveX = useTransform(sx, [-1, 1], ["-8%", "8%"]);
  const overMoveY = useTransform(sy, [-1, 1], ["-8%", "8%"]);

  const onMouse = (e: React.MouseEvent) => {
    if (reduce || !root.current) return;
    const r = root.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section ref={root} onMouseMove={onMouse} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      className="relative h-[100svh] w-full overflow-hidden bg-[#07090e]">

      {/* Sky — slowest */}
      <motion.div ref={bgTop} style={reduce ? {} : { x: bgMoveX, y: bgMoveY }}
        className="absolute inset-0 will-change-transform">
        <AnimatePresence mode="sync">
          <motion.img key={active.id} src={active.image} alt="" loading="eager"
            initial={{ scale: 1.15 }} animate={{ scale: 1.08 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="h-full w-full object-cover" />
        </AnimatePresence>
      </motion.div>

      {/* Foreground — faster */}
      <motion.div ref={bgBottom} style={reduce ? {} : { x: overMoveX, y: overMoveY }}
        className="absolute inset-0 will-change-transform">
        <AnimatePresence mode="sync">
          <motion.img key={active.id + "-v"} src={active.image} alt="" loading="eager"
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="h-full w-full object-cover" />
        </AnimatePresence>
      </motion.div>

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{ background: "linear-gradient(to bottom, rgba(7,9,14,0.4) 0%, rgba(7,9,14,0.05) 40%, rgba(7,9,14,0.85) 100%)" }} />
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{ background: "linear-gradient(to right, rgba(7,9,14,0.55) 0%, transparent 40%, transparent 60%, rgba(7,9,14,0.55) 100%)" }} />

      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-md">
            <span className="font-mono text-xs font-bold tracking-tight text-white">N</span>
          </div>
          <div>
            <p className="font-sans text-sm font-extrabold uppercase tracking-[0.18em] text-white">NayB</p>
            <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-white/50">Global</p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 lg:flex">
          {["Program", "Tujuan", "Tentang", "Kontak"].map((l) => (
            <a key={l} href={"#" + l.toLowerCase()}
              className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white">
              {l}
            </a>
          ))}
        </nav>
        <a href="#platform"
          className="hidden rounded-full border border-white/30 bg-white/10 px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md transition hover:bg-white hover:text-[#07090e] lg:block">
          Jelajahi
        </a>
      </header>

      {/* Main text */}
      <div ref={txtRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-transform">
        <AnimatePresence mode="wait">
          <motion.div key={active.id + "-content"} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-6xl">
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.3em] text-white/60">
              {active.city}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2 font-sans text-[18vw] font-black uppercase leading-[0.85] tracking-tighter text-white lg:text-[12vw]"
              style={{ textShadow: "0 6px 40px rgba(7,9,14,0.65)" }}>
              {active.country}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, ease: "easeOut" }}
              className="mx-auto max-w-md font-sans text-base font-light tracking-wide text-white/80">
              {active.tagline}
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                {active.program}
              </span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }} className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#platform"
                className="rounded-full bg-white px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#07090e] transition hover:bg-white/90 active:scale-95">
                Lihat Program
              </a>
              <a href="#platform"
                className="rounded-full border border-white/30 px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:border-white/60 active:scale-95">
                Destinations
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 right-6 z-30 flex flex-col items-end gap-3 lg:right-12">
        <div className="flex items-center gap-2">
          <button onClick={() => go(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition hover:bg-white hover:text-[#07090e] active:scale-95">
            ←
          </button>
          <button onClick={() => go(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition hover:bg-white hover:text-[#07090e] active:scale-95">
            →
          </button>
        </div>
        <p className="font-mono text-xs tracking-widest text-white/50">
          {String(idx + 1).padStart(2, "0")} / {String(DESTS.length).padStart(2, "0")}
        </p>
      </div>

      {/* Pills */}
      <div className="absolute inset-x-0 bottom-8 z-30 px-6 lg:px-12">
        <div className="flex flex-wrap justify-center gap-2">
          {DESTS.map((d, i) => (
            <button key={d.id} onClick={() => setIdx(i)}
              className={"rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-all active:scale-95 " +
                (i === idx ? "bg-white text-[#07090e]" : "border border-white/15 bg-white/5 text-white/50 hover:bg-white/15")}>
              {d.short}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
