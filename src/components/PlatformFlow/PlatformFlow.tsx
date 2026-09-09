import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

/* ── 8 modul edutour, masing-masing jadi 1 chapter ────────────────── */
const MODULES = [
  {
    id: "dasbor",
    num: "01",
    title: "Dasbor Program",
    tagline: "Pantau semua program edutour sekolah dalam satu layar.",
    dark: true,
    items: [
      { heading: "Daftar Program", desc: "Semua program pertukaran pelajar & edutrip terdokumentasi rapi." },
      { heading: "Buat Program Baru", desc: "Susun program baru: destinasi, durasi, kuota peserta." },
      { heading: "Progres & Status", desc: "Pantau persiapan hingga kepulangan tiap rombongan." },
      { heading: "Pencarian Program", desc: "Cari program berdasar negara, jenjang, atau tema belajar." },
    ],
    stats: [
      { label: "Program Aktif", value: "12" },
      { label: "Total Peserta", value: "340" },
      { label: "Mitra Sekolah", value: "9" },
    ],
  },
  {
    id: "rencana",
    num: "02",
    title: "Rencana & Mitra",
    tagline: "Rancang program bersama sekolah mitra dan destinasi terbaik.",
    dark: false,
    items: [
      { heading: "Jenis & Tujuan Program", desc: "Pertukaran pelajar, school immersion, study tour, language trip." },
      { heading: "Pilih Mitra & Destinasi", desc: "Jepang, China, hingga Asia Tenggara — sesuai kurikulum." },
      { heading: "Kelola Jaringan Mitra", desc: "Data sekolah mitra, homestay, dan pemandu lokal." },
      { heading: "Buat Proposal", desc: "Generate proposal kegiatan siap ajukan ke orang tua." },
    ],
  },
  {
    id: "agenda",
    num: "03",
    title: "Agenda Perjalanan",
    tagline: "Itinerary harian yang jelas untuk guru, siswa, dan orang tua.",
    dark: true,
    items: [
      { heading: "Itinerary Harian", desc: "Jadwal kunjungan sekolah, wisata edukasi, waktu istirahat." },
      { heading: "Linimasa Kegiatan", desc: "Alur kegiatan dari briefing sampai evaluasi akhir." },
      { heading: "Pengingat Agenda", desc: "Notifikasi otomatis sebelum tiap kegiatan penting." },
    ],
    timeline: [
      { day: "Hari 1", act: "Keberangkatan & Transit" },
      { day: "Hari 2", act: "Selamat Datang" },
      { day: "Hari 3", act: "School Immersion" },
      { day: "Hari 4", act: "Field Study" },
      { day: "Hari 5", act: "Refleksi & Pulang" },
    ],
  },
  {
    id: "peserta",
    num: "04",
    title: "Peserta & Dokumen",
    tagline: "Administrasi siswa dan perizinan tanpa kertas berserakan.",
    dark: false,
    items: [
      { heading: "Daftar Peserta", desc: "Data siswa, guru pendamping, dan kelompok rombongan." },
      { heading: "Persetujuan & Izin", desc: "Izin orang tua dan persetujuan sekolah terdigitalisasi." },
      { heading: "Status Dokumen", desc: "Lacak paspor, visa, asuransi tiap peserta." },
      { heading: "Notifikasi Dokumen", desc: "Peringatan dokumen kurang atau kedaluwarsa." },
    ],
  },
  {
    id: "info",
    num: "05",
    title: "Info & Komunikasi",
    tagline: "Orang tua tenang karena kabar perjalanan selalu sampai.",
    dark: true,
    items: [
      { heading: "Pengumuman", desc: "Info resmi program, jadwal, dan perubahan terkini." },
      { heading: "Portal Orang Tua", desc: "Ruang khusus orang tua memantau perjalanan anak." },
      { heading: "Live Journey", desc: "Posisi rombongan diperbarui selama perjalanan." },
      { heading: "Kontak Tim", desc: "Hubungi pendamping dan koordinator kapan pun." },
    ],
    liveLabel: "Rombongan Sakura — transit Singapura",
  },
  {
    id: "pembayaran",
    num: "06",
    title: "Pembayaran",
    tagline: "Biaya transparan, tagihan rapi, bukti tersimpan.",
    dark: false,
    items: [
      { heading: "Rincian Biaya", desc: "Komponen biaya terbuka: tiket, akomodasi, wisata." },
      { heading: "Tagihan Per Peserta", desc: "Tagihan individual, bisa dicicil bertahap." },
      { heading: "Bukti & Riwayat", desc: "Bukti bayar dan transaksi tersimpan aman." },
      { heading: "Pengingat Pembayaran", desc: "Pengingat jatuh tempo otomatis ke orang tua." },
    ],
    stats: [
      { label: "Rata-rata / peserta", value: "Rp14jt" },
      { label: "Cicilan tersedia", value: "3×" },
    ],
  },
  {
    id: "dokumentasi",
    num: "07",
    title: "Dokumentasi & Evaluasi",
    tagline: "Kenangan terdokumentasi, hasil belajar terukur.",
    dark: true,
    items: [
      { heading: "Galeri Foto & Video", desc: "Momen perjalanan terdokumentasi dan bisa dibagikan." },
      { heading: "Refleksi Siswa", desc: "Jurnal dan cerita pengalaman dari tiap peserta." },
      { heading: "Hasil Belajar", desc: "Capaian pembelajaran dan sertifikat keikutsertaan." },
      { heading: "Arsip Program", desc: "Seluruh program tersimpan sebagai portofolio sekolah." },
    ],
  },
  {
    id: "keamanan",
    num: "08",
    title: "Keamanan & Akun",
    tagline: "Keselamatan peserta prioritas utama setiap program.",
    dark: false,
    items: [
      { heading: "Kontak Darurat", desc: "Nomor darurat tim, rumah sakit, KBRI di tiap destinasi." },
      { heading: "Panduan Keselamatan", desc: "SOP keamanan, mitigasi risiko, tata tertib perjalanan." },
      { heading: "Masuk & Hak Akses", desc: "Peran terpisah: admin, guru, siswa, orang tua." },
      { heading: "Pengaturan Profil", desc: "Kelola profil sekolah, data kontak, notifikasi." },
    ],
  },
] as const;

/* ── Stats band (Jesko-style counter row) ──────────────────────────── */
function StatsBand({ stats }: { stats: readonly { label: string; value: string }[] }) {
  return (
    <div className="mt-8 flex flex-wrap gap-6">
      {stats.map((s) => (
        <div key={s.label} className="min-w-[100px]">
          <p className="text-3xl font-extrabold tracking-tight text-primary-300 lg:text-4xl">
            {s.value}
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-white/50">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function StatsBandLight({ stats }: { stats: readonly { label: string; value: string }[] }) {
  return (
    <div className="mt-8 flex flex-wrap gap-6">
      {stats.map((s) => (
        <div key={s.label} className="min-w-[100px]">
          <p className="text-3xl font-extrabold tracking-tight text-primary-700 lg:text-4xl">
            {s.value}
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ── Timeline mini (Agenda) ────────────────────────────────────────── */
function TimelineMini({ items }: { items: readonly { day: string; act: string }[] }) {
  return (
    <ol className="mt-6 flex flex-wrap gap-3">
      {items.map((it, i) => (
        <li
          key={it.day}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-300 text-[10px] font-bold text-white">
            {i + 1}
          </span>
          <span className="text-white/80">{it.act}</span>
        </li>
      ))}
    </ol>
  );
}

/* ── Live pulse (Info) ─────────────────────────────────────────────── */
function LivePulse({ label }: { label: string }) {
  return (
    <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm">
      <span className="relative flex h-3 w-3 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-green" />
      </span>
      <span className="text-sm font-semibold text-white">{label}</span>
    </div>
  );
}

/* ── Satu chapter ──────────────────────────────────────────────────── */
function Chapter({
  mod,
}: {
  mod: (typeof MODULES)[number];
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // GSAP fade-up reveal per chapter (scrub agar smooth)
  useEffect(() => {
    if (reduce || !ref.current) return;
    const els = ref.current.querySelectorAll<HTMLElement>(".reveal");
    const ctx = gsap.context(() => {
      els.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  const dark = mod.dark;

  return (
    <section
      ref={ref}
      id={mod.id}
      className={`relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32 ${
        dark ? "bg-[#0b1220] text-white" : "bg-[#fbf8fc] text-[#24152d]"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Nomor + judul */}
        <div className="reveal mb-12 flex items-start gap-4 sm:gap-6">
          <span
            className={`shrink-0 font-mono text-5xl font-extrabold tracking-tighter lg:text-7xl ${
              dark ? "text-white/10" : "text-primary-800/10"
            }`}
          >
            {mod.num}
          </span>
          <div>
            <h2
              className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${
                dark ? "text-white" : "text-primary-800"
              }`}
            >
              {mod.title}
            </h2>
            <p
              className={`mt-2 max-w-xl text-base font-light lg:text-lg ${
                dark ? "text-white/60" : "text-slate-500"
              }`}
            >
              {mod.tagline}
            </p>
          </div>
        </div>

        {/* Feature cards — grid */}
        <div
          className={`reveal grid gap-4 ${
            mod.items.length === 3
              ? "grid-cols-1 sm:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {mod.items.map((f, i) => (
            <motion.div
              key={f.heading}
              whileHover={reduce ? {} : { y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`group rounded-2xl p-6 transition-shadow duration-300 ${
                dark
                  ? "border border-white/10 bg-white/5 hover:shadow-lg hover:shadow-primary-300/10"
                  : "border border-slate-200 bg-white hover:shadow-lg hover:shadow-primary-700/8"
              }`}
            >
              <span
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm font-bold ${
                  dark
                    ? "bg-primary-300/20 text-primary-300"
                    : "bg-primary-100 text-primary-700"
                }`}
              >
                {mod.num}.{i + 1}
              </span>
              <h3
                className={`mb-1.5 text-lg font-bold ${
                  dark ? "text-white" : "text-primary-800"
                }`}
              >
                {f.heading}
              </h3>
              <p
                className={`text-sm leading-relaxed font-light ${
                  dark ? "text-white/60" : "text-slate-500"
                }`}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Optional extras per chapter */}
        {"stats" in mod && mod.stats && (
          <div className="reveal">
            {dark ? (
              <StatsBand stats={mod.stats} />
            ) : (
              <StatsBandLight stats={mod.stats} />
            )}
          </div>
        )}
        {"timeline" in mod && mod.timeline && (
          <div className="reveal">
            <TimelineMini items={mod.timeline} />
          </div>
        )}
        {"liveLabel" in mod && mod.liveLabel && (
          <div className="reveal">
            <LivePulse label={mod.liveLabel} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Export: 8 chapters dalam 1 flow ───────────────────────────────── */
export default function PlatformFlow() {
  return (
    <>
      {/* Intro band */}
      <section
        id="platform"
        className="scroll-mt-24 bg-[#0b1220] px-4 py-16 text-center text-white sm:px-6 sm:py-24 lg:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-3 text-xs font-bold tracking-[0.3em] uppercase text-primary-300"
        >
          Platform NayB
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          Satu Platform untuk Seluruh Perjalanan Edukasi
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="mx-auto mt-4 max-w-xl text-base font-light text-white/60"
        >
          Dari merancang program hingga dokumentasi akhir — kelola edutour sekolah Anda dalam satu tempat
        </motion.p>
      </section>

      {/* 8 chapters */}
      {MODULES.map((mod) => (
        <Chapter key={mod.id} mod={mod} />
      ))}

      {/* CTA band */}
      <section className="bg-gradient-to-r from-primary-800 to-primary-700 px-4 py-16 text-center text-white sm:px-6 sm:py-24 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Siap Mulai Program Edutour Sekolah Anda?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-4 max-w-md text-base font-light text-white/70"
        >
          Hubungi tim NayB — kami bantu dari konsultasi awal hingga keberangkatan
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="https://wa.me/6281334357456"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-[0.14em] text-primary-800 transition hover:bg-white/90 active:scale-95"
          >
            Hubungi via WhatsApp
          </a>
          <a
            href="mailto:naybglobal@gmail.com"
            className="rounded-full border-2 border-white/40 px-8 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/10 active:scale-95"
          >
            Email Tim NayB
          </a>
        </motion.div>
      </section>
    </>
  );
}
