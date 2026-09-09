import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import NayBeGlobalLogo from "../Icons/NayBeGlobalLogo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

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
  { id: "japan", country: "JAPAN", short: "JP", tagline: "Tokyo, Kyoto & Mt. Fuji — Budaya Pop & Tradisi", program: "Pertukaran Pelajar • 7–14 Hari", city: "Osaka", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2560&auto=format&fit=crop" },
  { id: "china", country: "CHINA", short: "CN", tagline: "Beijing, Shanghai & Great Wall — Sejarah & Teknologi", program: "Study Tour • 6–12 Hari", city: "Beijing", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2560&auto=format&fit=crop" },
  { id: "indonesia", country: "INDONESIA", short: "ID", tagline: "Bali, Yogyakarta & Budaya Nusantara", program: "Edutrip • 5–10 Hari", city: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2560&auto=format&fit=crop" },
  { id: "singapore", country: "SINGAPORE", short: "SG", tagline: "Little Red Dot — Lab & Inovasi", program: "Campus Visit • 3–6 Hari", city: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2560&auto=format&fit=crop" },
  { id: "thailand", country: "THAILAND", short: "TH", tagline: "Bangkok & Chiang Mai — Sekolah Mitra & Homestay", program: "School Immersion • 5–10 Hari", city: "Chiang Mai", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2560&auto=format&fit=crop" },
  { id: "vietnam", country: "VIETNAM", short: "VN", tagline: "Hanoi, Ha Long Bay & Hue — Sejarah & Sains", program: "Study Field Trip • 6–12 Hari", city: "Hanoi", image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2560&auto=format&fit=crop" },
  { id: "malaysia", country: "MALAYSIA", short: "MY", tagline: "Kuala Lumpur & Penang — STEM & Multikultural", program: "Edu Camp • 4–8 Hari", city: "Kuala Lumpur", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2560&auto=format&fit=crop" },
  { id: "philippines", country: "PHILIPPINES", short: "PH", tagline: "Cebu, El Nido & Boracay — English Immersion", program: "Language Trip • 7–14 Hari", city: "Cebu", image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?q=80&w=2560&auto=format&fit=crop" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const root = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const txtRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);

  const active = DESTS[idx];
  const go = useCallback((d: 1 | -1) => {
    setIdx((p) => (p + d + DESTS.length) % DESTS.length);
  }, []);

  useEffect(() => {
    if (reduce || paused) return;
    timer.current = window.setTimeout(() => go(1), 5500);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [idx, paused, reduce, go]);

  // GSAP scroll parallax
  useEffect(() => {
    if (reduce || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 25, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.to(txtRef.current, {
        yPercent: -15, opacity: 0, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "55% top", scrub: 0.8 },
      });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const bgX = useTransform(sx, [-1, 1], ["-4%", "4%"]);
  const bgY = useTransform(sy, [-1, 1], ["-4%", "4%"]);
  const txtX = useTransform(sx, [-1, 1], ["-12px", "12px"]);

  const onMouse = (e: React.MouseEvent) => {
    if (reduce || !root.current) return;
    const r = root.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section ref={root} onMouseMove={onMouse} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      className="relative h-[100svh] w-full overflow-hidden">

      {/* Background */}
      <motion.div ref={bgRef} style={{ x: reduce ? 0 : bgX, y: reduce ? 0 : bgY }}
        className="absolute inset-0 will-change-transform">
        <AnimatePresence mode="sync">
          <motion.img key={active.id} src={active.image} alt="" loading="eager"
            initial={{ scale: 1.12 }} animate={{ scale: 1.05 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="h-full w-full object-cover" />
        </AnimatePresence>
      </motion.div>

      {/* Gradient scrim */}
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{ background: "linear-gradient(to bottom, rgba(26,7,40,0.55) 0%, rgba(26,7,40,0.1) 45%, rgba(26,7,40,0.88) 100%)" }} />
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{ background: "linear-gradient(to right, rgba(26,7,40,0.6) 0%, transparent 45%, transparent 55%, rgba(26,7,40,0.6) 100%)" }} />

      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-4 lg:px-14">
        <NayBeGlobalLogo className="h-10 sm:h-12" variant="dark" showText={true} />
        <nav className="hidden items-center gap-8 lg:flex">
          {["Program", "Tujuan", "Tentang", "Kontak"].map((l) => (
            <a key={l} href={"#" + l.toLowerCase()}
              className="font-sans text-sm font-medium text-white/70 transition-colors hover:text-white">
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <a href="#kontak"
            className="rounded-full bg-[#E3007B] px-6 py-2.5 font-sans text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-[#E3007B]/30 transition hover:bg-[#c73884] active:scale-95">
            Hubungi Kami
          </a>
        </div>
      </header>

      {/* Main text */}
      <motion.div ref={txtRef} style={{ x: reduce ? 0 : txtX }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-transform">
        <AnimatePresence mode="wait">
          <motion.div key={active.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} className="w-full max-w-6xl">
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#E3007B]">
              {active.city}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 font-sans text-[16vw] font-black uppercase leading-[0.88] tracking-tighter text-white lg:text-[12vw]"
              style={{ textShadow: "0 4px 60px rgba(26,7,40,0.7), 0 2px 20px rgba(26,7,40,0.4)" }}>
              {active.country}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, ease: "easeOut" }}
              className="mx-auto max-w-lg font-sans text-base font-light tracking-wide text-white/85">
              {active.tagline}
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                {active.program}
              </span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#program"
                className="rounded-full bg-[#E3007B] px-8 py-3 font-sans text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-[#E3007B]/30 transition hover:bg-[#c73884] active:scale-95">
                Lihat Program
              </a>
              <a href="#galeri"
                className="rounded-full border border-white/30 bg-white/10 px-8 py-3 font-sans text-sm font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition hover:border-white/60 active:scale-95">
                Galeri
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Arrow + counter */}
      <div className="absolute bottom-10 right-6 z-30 flex flex-col items-end gap-3 lg:right-14">
        <div className="flex items-center gap-2">
          <button onClick={() => go(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-[#E3007B] hover:border-[#E3007B] active:scale-95">
            ←
          </button>
          <button onClick={() => go(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-[#E3007B] hover:border-[#E3007B] active:scale-95">
            →
          </button>
        </div>
        <p className="font-mono text-xs tracking-widest text-white/50">
          {String(idx + 1).padStart(2, "0")} / {String(DESTS.length).padStart(2, "0")}
        </p>
      </div>

      {/* Country pills */}
      <div className="absolute inset-x-0 bottom-8 z-30 px-6 lg:px-14">
        <div className="flex flex-wrap justify-center gap-2">
          {DESTS.map((d, i) => (
            <button key={d.id} onClick={() => setIdx(i)}
              className={"rounded-full px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-all active:scale-95 " +
                (i === idx ? "bg-[#E3007B] text-white" : "border border-white/15 bg-white/5 text-white/50 hover:bg-white/15")}>
              {d.short}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      {!reduce && (
        <div className="absolute inset-x-0 bottom-0 z-30 px-6 pb-5 lg:px-14">
          <div className="mx-auto h-[2px] max-w-4xl overflow-hidden rounded-full bg-white/10">
            <motion.div key={active.id} initial={{ scaleX: 0 }} animate={{ scaleX: paused ? 0 : 1 }}
              transition={{ duration: 5.5, ease: "linear" }}
              className="h-full origin-left bg-[#E3007B]" />
          </div>
        </div>
      )}
    </section>
  );
}
