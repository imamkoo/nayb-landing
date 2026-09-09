import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

type Destination = {
  id: string;
  country: string;
  short: string;
  tagline: string;
  program: string;
  image: string;
};

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
  {
    id: "philippines",
    country: "PHILIPPINES",
    short: "PH",
    tagline: "Cebu & El Nido — English Immersion & Konservasi",
    program: "Language Trip • 7–14 Hari",
    image:
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?q=80&w=2000&auto=format&fit=crop",
  },
];

const AUTOPLAY_MS = 6000;

export default function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const active = DESTINATIONS[index];
  const go = useCallback(
    (dir: 1 | -1) =>
      setIndex((p) => (p + dir + DESTINATIONS.length) % DESTINATIONS.length),
    []
  );

  useEffect(() => {
    if (reduce || paused) return;
    timerRef.current = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [index, paused, reduce, go]);

  // GSAP scroll parallax — background lambat, judul fade saat scroll
  useEffect(() => {
    if (reduce || !rootRef.current) return;
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(bgRef.current,
          { yPercent: -8, scale: 1.12 },
          { yPercent: 12, scale: 1.2, ease: "none",
            scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true } }
        );
      }
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { yPercent: 0, opacity: 1 },
          { yPercent: -45, opacity: 0, ease: "none",
            scrollTrigger: { trigger: rootRef.current, start: "top top", end: "70% top", scrub: true } }
        );
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduce]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const bgX = useTransform(sx, [-0.5, 0.5], ["-1.5%", "1.5%"]);
  const bgY = useTransform(sy, [-0.5, 0.5], ["-1.5%", "1.5%"]);
  const titleX = useTransform(sx, [-0.5, 0.5], ["-14px", "14px"]);

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
      className="relative left-1/2 isolate -mt-[68px] min-h-[100svh] w-screen max-w-none -translate-x-1/2 overflow-hidden bg-[#0b1220] text-white sm:-mt-[76px]"
    >
      {/* Background — parallax halus */}
      <motion.div
        ref={bgRef}
        style={reduce ? {} : { x: bgX, y: bgY }}
        className="absolute inset-0"
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={active.id}
            src={active.image}
            alt={`${active.country}`}
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
            transition={{ duration: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        </AnimatePresence>
        {/* Scrim — atas terang, bawah gelap untuk readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220]/50 via-[#0b1220]/15 to-[#0b1220]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/40 via-transparent to-[#0b1220]/40" />
      </motion.div>

      {/* Eyebrow badge */}
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

      {/* Judul — SOLID WHITE, clean readable */}
      <div ref={titleRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          style={reduce ? {} : { x: titleX }}
          className="w-full max-w-[95vw]"
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={active.id}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -40 }}
              transition={{ duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[15vw] font-extrabold tracking-tighter uppercase leading-[0.9] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] sm:text-[13vw] lg:text-[12rem]"
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
              className="mx-auto mt-3 max-w-xl text-base font-light text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:text-lg"
            >
              {active.tagline}
              <span className="mt-1 block text-xs font-semibold tracking-[0.18em] uppercase text-white/60">
                {active.program}
              </span>
            </motion.p>
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#platform"
              className="rounded-full border-2 border-white bg-white px-8 py-3 text-sm font-bold tracking-[0.14em] uppercase text-[#0b1220] transition hover:bg-white/90 active:scale-95"
            >
              Lihat Program
            </a>
            <a
              href="#platform"
              className="rounded-full border-2 border-white/40 bg-white/10 px-8 py-3 text-sm font-bold tracking-[0.14em] uppercase backdrop-blur-sm text-white transition hover:bg-white/20 active:scale-95"
            >
              Watch Tour
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Learn More vertikal — kiri */}
      <div className="absolute bottom-28 left-5 z-20 hidden flex-col items-center gap-3 md:flex lg:left-8">
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/70 [writing-mode:vertical-lr] rotate-180">
          Learn More
        </span>
        <span className="h-24 w-px bg-gradient-to-b from-transparent via-white/70 to-white/70" />
        <span className="h-2 w-2 rounded-full bg-white/80" />
      </div>

      {/* Kontrol negara — kanan */}
      <div className="absolute bottom-28 right-5 z-20 hidden flex-col items-end gap-4 md:flex lg:right-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Sebelumnya"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#0b1220] active:scale-95"
          >
            ←
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Berikutnya"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#0b1220] active:scale-95"
          >
            →
          </button>
        </div>
        <p className="font-mono text-xs tracking-widest text-white/70">
          {String(index + 1).padStart(2, "0")} / {String(DESTINATIONS.length).padStart(2, "0")}
        </p>
      </div>

      {/* Bottom bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-6 lg:px-8">
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
          <div className="flex flex-wrap items-center justify-center gap-2">
            {DESTINATIONS.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setIndex(i)}
                className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] backdrop-blur-md transition-all active:scale-95 ${
                  i === index
                    ? "bg-white text-[#0b1220]"
                    : "border border-white/25 bg-white/10 text-white/80 hover:bg-white/25"
                }`}
              >
                {d.short}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-white/80 text-xs">
            <span className="hidden sm:inline tracking-[0.25em] uppercase">Ikuti NayB</span>
            <a href="https://www.instagram.com" className="transition hover:text-white">IG</a>
            <a href="https://www.linkedin.com" className="transition hover:text-white">IN</a>
            <a href="https://www.whatsapp.com" className="transition hover:text-white">WA</a>
          </div>
        </div>
      </div>
    </section>
  );
}