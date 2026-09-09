import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

gsap.registerPlugin(ScrollTrigger);

type Destination = {
  id: string;
  country: string;
  short: string;
  tagline: string;
  program: string;
  image: string;
};

// Asia Tenggara — edutour sekolah / pertukaran pelajar
const DESTINATIONS: Destination[] = [
  {
    id: "indonesia",
    country: "INDONESIA",
    short: "ID",
    tagline: "Bali & Yogyakarta — Budaya, Bahasa & Alam",
    program: "Pertukaran Pelajar • 7–14 Hari",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "thailand",
    country: "THAILAND",
    short: "TH",
    tagline: "Bangkok & Chiang Mai — Sekolah Mitra & Homestay",
    program: "School Immersion • 5–10 Hari",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "vietnam",
    country: "VIETNAM",
    short: "VN",
    tagline: "Hanoi & Ha Long Bay — Sejarah & Sains Lapangan",
    program: "Study Field Trip • 6–12 Hari",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "malaysia",
    country: "MALAYSIA",
    short: "MY",
    tagline: "Kuala Lumpur & Penang — STEM & Multikultural",
    program: "Edu Camp • 4–8 Hari",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "singapore",
    country: "SINGAPORE",
    short: "SG",
    tagline: "Little Red Dot — Kampus, Lab & Inovasi",
    program: "Campus Visit • 3–6 Hari",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "philippines",
    country: "PHILIPPINES",
    short: "PH",
    tagline: "Cebu & El Nido — English Immersion & Konservasi",
    program: "Language Trip • 7–14 Hari",
    image:
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "japan",
    country: "JAPAN",
    short: "JP",
    tagline: "Tokyo, Kyoto & Fuji — Budaya Pop & Tradisi",
    program: "Pertukaran Pelajar • 7–14 Hari",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "china",
    country: "CHINA",
    short: "CN",
    tagline: "Beijing & Shanghai — Sejarah & Teknologi",
    program: "Study Tour • 6–12 Hari",
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2000&auto=format&fit=crop",
  },
];

const AUTOPLAY_MS = 6000;
// Mask vertikal foreground: langit transparan, paruh bawah foto menutupi teks
const FG_MASK = "linear-gradient(to bottom, transparent 34%, black 62%)";

const Hero: React.FC = () => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const active = DESTINATIONS[index];

  const go = useCallback((dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + DESTINATIONS.length) % DESTINATIONS.length);
  }, []);

  // Autoplay rotasi negara — mati bila reduced-motion / hover
  useEffect(() => {
    if (reduce || paused) return;
    timerRef.current = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, paused, reduce, go]);

  // GSAP ScrollTrigger parallax berlapis:
  // background paling lambat, judul melayang + fade, foreground paling cepat (efek depth)
  useEffect(() => {
    if (reduce || !rootRef.current) return;
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 12,
            scale: 1.2,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
      if (fgRef.current) {
        gsap.fromTo(
          fgRef.current,
          { yPercent: -4, scale: 1.15 },
          {
            yPercent: 18,
            scale: 1.24,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { yPercent: 0, opacity: 1 },
          {
            yPercent: -45,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "70% top",
              scrub: true,
            },
          }
        );
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduce]);

  // Mouse parallax halus (motion value — tanpa re-render).
  // Foreground bergerak ~2x background → teks terasa "di dalam" gambar.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const bgX = useTransform(sx, [-0.5, 0.5], ["-1.5%", "1.5%"]);
  const bgY = useTransform(sy, [-0.5, 0.5], ["-1.5%", "1.5%"]);
  const titleX = useTransform(sx, [-0.5, 0.5], ["-12px", "12px"]);
  const fgX = useTransform(sx, [-0.5, 0.5], ["-3%", "3%"]);
  const fgY = useTransform(sy, [-0.5, 0.5], ["-3%", "3%"]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce || !rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={rootRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Destinasi edutour Asia Tenggara"
      // Full-bleed keluar dari container Main + naik menutupi nav sticky (overlay)
      className="relative left-1/2 isolate -mt-[68px] min-h-[100svh] w-screen max-w-none -translate-x-1/2 overflow-hidden bg-[#0b1220] text-white sm:-mt-[76px]"
    >
      {/* Background + parallax */}
      <motion.div ref={bgRef} style={reduce ? {} : { x: bgX, y: bgY }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={active.id}
            src={active.image}
            alt={`${active.country} — ${active.tagline}`}
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
            transition={{ duration: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </AnimatePresence>
        {/* Scrim ala referensi — langit tetap terang, bawah digelapkan untuk CTA */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220]/55 via-[#0b1220]/10 to-[#0b1220]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/35 via-transparent to-[#0b1220]/35" />
      </motion.div>

      {/* Eyebrow edutour */}
      <div className="absolute inset-x-0 top-24 z-20 flex justify-center px-4 sm:top-28">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d8d]" />
          Edutour Sekolah • Pertukaran Pelajar Asia Tenggara
        </motion.p>
      </div>

      {/* Judul raksasa ala referensi */}
      <div ref={titleRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.div style={reduce ? {} : { x: titleX }} className="w-full">
          <AnimatePresence mode="wait">
            <motion.h1
              key={active.id}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -40 }}
              transition={{ duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[15vw] leading-[0.9] font-extrabold tracking-tighter whitespace-nowrap uppercase select-none sm:text-[14vw] lg:text-[13rem] xl:text-[15rem]"
              style={{ textShadow: "0 2px 60px rgba(11,18,32,0.45)" }}
            >
              {active.country}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={active.id + "-sub"}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.15 }}
              className="mx-auto mt-2 max-w-xl text-sm font-light text-white/85 sm:text-base"
            >
              {active.tagline}
              <span className="mt-1 block text-xs font-semibold tracking-[0.18em] text-white/60 uppercase">
                {active.program}
              </span>
            </motion.p>
          </AnimatePresence>

          {/* CTA ala WATCH TOUR */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <a
              href="#program"
              className="rounded-full border-2 border-white/90 px-8 py-3 text-sm font-bold tracking-[0.14em] uppercase backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#0b1220] active:scale-95"
            >
              Lihat Program
            </a>
            <a
              href="#destinasi"
              className="hidden rounded-full bg-white/10 px-8 py-3 text-sm font-bold tracking-[0.14em] uppercase backdrop-blur-md transition-all duration-300 hover:bg-white/25 active:scale-95 sm:inline-block"
            >
              Watch Tour
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Foreground depth layer — foto yang sama, hanya paruh bawah yang tampak,
          bergerak lebih cepat → teks raksasa terlihat "di dalam" gambar */}
      <motion.div
        ref={fgRef}
        aria-hidden="true"
        style={reduce ? {} : { x: fgX, y: fgY }}
        className="pointer-events-none absolute inset-0 z-[15]"
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={active.id + "-fg"}
            src={active.image}
            alt=""
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ maskImage: FG_MASK, WebkitMaskImage: FG_MASK }}
            loading="lazy"
          />
        </AnimatePresence>
      </motion.div>

      {/* LEARN MORE vertikal — kiri */}
      <div className="absolute bottom-28 left-5 z-20 hidden flex-col items-center gap-3 md:flex lg:left-8">
        <span className="text-[10px] font-semibold tracking-[0.3em] text-white/70 uppercase [writing-mode:vertical-lr] rotate-180">
          Learn More
        </span>
        <span className="h-24 w-px bg-gradient-to-b from-transparent via-white/70 to-white/70" />
        <span className="h-2 w-2 rounded-full bg-white/80" />
      </div>

      {/* Kontrol negara — kanan bawah ala dots + arrows */}
      <div className="absolute right-5 bottom-28 z-20 hidden flex-col items-end gap-4 md:flex lg:right-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Destinasi sebelumnya"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition hover:bg-white hover:text-[#0b1220] active:scale-95"
          >
            ←
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Destinasi berikutnya"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition hover:bg-white hover:text-[#0b1220] active:scale-95"
          >
            →
          </button>
        </div>
        <p className="font-mono text-xs tracking-widest text-white/70">
          {String(index + 1).padStart(2, "0")} / {String(DESTINATIONS.length).padStart(2, "0")}
        </p>
      </div>

      {/* Bottom bar — progress + pills negara + socials */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-6 lg:px-8">
        {/* progress autoplay */}
        {!reduce && (
          <div className="mx-auto mb-4 h-[2px] max-w-5xl overflow-hidden rounded bg-white/20">
            <motion.div
              key={active.id}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: paused ? 0 : 1 }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
              className="h-full w-full origin-left bg-white"
            />
          </div>
        )}
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          {/* pills negara */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {DESTINATIONS.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setIndex(i)}
                aria-label={`Tampilkan ${d.country}`}
                className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase backdrop-blur-md transition-all active:scale-95 ${
                  i === index
                    ? "bg-white text-[#0b1220]"
                    : "border border-white/25 bg-white/10 text-white/80 hover:bg-white/25"
                }`}
              >
                {d.short}
              </button>
            ))}
          </div>
          {/* socials ala referensi */}
          <div className="flex items-center gap-4 text-white/80">
            <span className="hidden text-[10px] tracking-[0.25em] uppercase sm:inline">Ikuti NayB</span>
            <a href="https://www.instagram.com" aria-label="Instagram" className="transition hover:text-white">IG</a>
            <a href="https://www.linkedin.com" aria-label="LinkedIn" className="transition hover:text-white">IN</a>
            <a href="https://www.whatsapp.com" aria-label="WhatsApp" className="transition hover:text-white">WA</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
