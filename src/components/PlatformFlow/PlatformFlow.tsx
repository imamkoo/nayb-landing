import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const MODULES = [
  {
    id: "dasbor", num: "01", title: "Dasbor Program",
    tagline: "Pantau semua program edutour sekolah dalam satu layar.",
    items: [
      { h: "Daftar Program", d: "Semua program pertukaran pelajar & edutrip terdokumentasi rapi." },
      { h: "Buat Program Baru", d: "Susun program baru: destinasi, durasi, kuota peserta." },
      { h: "Progres & Status", d: "Pantau persiapan hingga kepulangan tiap rombongan." },
      { h: "Pencarian Program", d: "Cari program berdasar negara, jenjang, atau tema belajar." },
    ],
    stats: [{ l: "Program Aktif", v: "12" }, { l: "Total Peserta", v: "340" }, { l: "Mitra Sekolah", v: "9" }, { l: "Negara Tujuan", v: "8" }],
  },
  {
    id: "rencana", num: "02", title: "Rencana & Mitra",
    tagline: "Rancang program bersama sekolah mitra dan destinasi terbaik.",
    items: [
      { h: "Jenis & Tujuan Program", d: "Pertukaran pelajar, school immersion, study tour, language trip." },
      { h: "Pilih Mitra & Destinasi", d: "Jepang, China, hingga Asia Tenggara — sesuai kurikulum." },
      { h: "Kelola Jaringan Mitra", d: "Data sekolah mitra, homestay, dan pemandu lokal." },
      { h: "Buat Proposal", d: "Generate proposal kegiatan siap ajukan ke orang tua." },
    ],
  },
  {
    id: "agenda", num: "03", title: "Agenda Perjalanan",
    tagline: "Itinerary harian yang jelas untuk guru, siswa, dan orang tua.",
    items: [
      { h: "Itinerary Harian", d: "Jadwal kunjungan sekolah, wisata edukasi, waktu istirahat." },
      { h: "Linimasa Kegiatan", d: "Alur kegiatan dari briefing sampai evaluasi akhir." },
      { h: "Pengingat Agenda", d: "Notifikasi otomatis sebelum tiap kegiatan penting." },
    ],
    timeline: ["Keberangkatan", "Tiba di Destinasi", "School Immersion", "Field Study", "Refleksi & Pulang"],
  },
  {
    id: "peserta", num: "04", title: "Peserta & Dokumen",
    tagline: "Administrasi siswa dan perizinan tanpa kertas berserakan.",
    items: [
      { h: "Daftar Peserta", d: "Data siswa, guru pendamping, dan kelompok rombongan." },
      { h: "Persetujuan & Izin", d: "Izin orang tua dan persetujuan sekolah terdigitalisasi." },
      { h: "Status Dokumen", d: "Lacak paspor, visa, asuransi tiap peserta." },
      { h: "Notifikasi Dokumen", d: "Peringatan dokumen kurang atau kedaluwarsa." },
    ],
  },
  {
    id: "info", num: "05", title: "Info & Komunikasi",
    tagline: "Orang tua tenang karena kabar perjalanan selalu sampai.",
    items: [
      { h: "Pengumuman", d: "Info resmi program, jadwal, dan perubahan terkini." },
      { h: "Portal Orang Tua", d: "Ruang khusus orang tua memantau perjalanan anak." },
      { h: "Live Journey", d: "Posisi rombongan diperbarui selama perjalanan." },
      { h: "Kontak Tim", d: "Hubungi pendamping dan koordinator kapan pun." },
    ],
    live: true,
  },
  {
    id: "pembayaran", num: "06", title: "Pembayaran",
    tagline: "Biaya transparan, tagihan rapi, bukti tersimpan.",
    items: [
      { h: "Rincian Biaya", d: "Komponen biaya terbuka: tiket, akomodasi, wisata." },
      { h: "Tagihan Per Peserta", d: "Tagihan individual, bisa dicicil bertahap." },
      { h: "Bukti & Riwayat", d: "Bukti bayar dan transaksi tersimpan aman." },
      { h: "Pengingat Pembayaran", d: "Pengingat jatuh tempo otomatis ke orang tua." },
    ],
    stats: [{ l: "Rata-rata / peserta", v: "Rp14jt" }, { l: "Cicilan tersedia", v: "3x" }],
  },
  {
    id: "dokumentasi", num: "07", title: "Dokumentasi & Evaluasi",
    tagline: "Kenangan terdokumentasi, hasil belajar terukur.",
    items: [
      { h: "Galeri Foto & Video", d: "Momen perjalanan terdokumentasi dan bisa dibagikan." },
      { h: "Refleksi Siswa", d: "Jurnal dan cerita pengalaman dari tiap peserta." },
      { h: "Hasil Belajar", d: "Capaian pembelajaran dan sertifikat keikutsertaan." },
      { h: "Arsip Program", d: "Seluruh program tersimpan sebagai portofolio sekolah." },
    ],
  },
  {
    id: "keamanan", num: "08", title: "Keamanan & Akun",
    tagline: "Keselamatan peserta prioritas utama setiap program.",
    items: [
      { h: "Kontak Darurat", d: "Nomor darurat tim, rumah sakit, KBRI di tiap destinasi." },
      { h: "Panduan Keselamatan", d: "SOP keamanan, mitigasi risiko, tata tertib perjalanan." },
      { h: "Masuk & Hak Akses", d: "Peran terpisah: admin, guru, siswa, orang tua." },
      { h: "Pengaturan Profil", d: "Kelola profil sekolah, data kontak, notifikasi." },
    ],
  },
] as const;

function Chapter({ mod }: { mod: (typeof MODULES)[number] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const els = ref.current!.querySelectorAll<HTMLElement>(".rv");
      els.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, delay: i * 0.06, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" } }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  const even = parseInt(mod.num) % 2 === 0;

  return (
    <section ref={ref} id={mod.id}
      className={"relative overflow-hidden px-6 py-24 lg:px-12 lg:py-32 " + (even ? "bg-[#0c111c]" : "bg-[#07090e]")}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="rv mb-14 flex items-start gap-5 lg:gap-8">
          <span className="shrink-0 font-mono text-6xl font-black tracking-tighter text-white/[0.06] lg:text-8xl select-none">
            {mod.num}
          </span>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {mod.title}
            </h2>
            <p className="mt-2 max-w-xl font-sans text-base font-light text-white/50 lg:text-lg">
              {mod.tagline}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className={"rv grid gap-4 " + (mod.items.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4")}>
          {mod.items.map((f, i) => (
            <motion.div key={f.h}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm transition-shadow duration-300 hover:border-white/15 hover:shadow-[0_0_40px_rgba(199,56,132,0.08)]">
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] font-mono text-[11px] font-bold text-white/40">
                {mod.num}.{i + 1}
              </span>
              <h3 className="mb-1.5 font-sans text-base font-bold text-white">{f.h}</h3>
              <p className="font-sans text-sm leading-relaxed font-light text-white/45">{f.d}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        {"stats" in mod && mod.stats && (
          <div className="rv mt-10 flex flex-wrap gap-8 border-t border-white/[0.06] pt-8">
            {mod.stats.map((s) => (
              <div key={s.l}>
                <p className="font-sans text-3xl font-extrabold tracking-tight text-[#c73884] lg:text-4xl">{s.v}</p>
                <p className="mt-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">{s.l}</p>
              </div>
            ))}
          </div>
        )}

        {/* Timeline */}
        {"timeline" in mod && mod.timeline && (
          <div className="rv mt-10 flex flex-wrap gap-3">
            {mod.timeline.map((t, i) => (
              <div key={t} className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 backdrop-blur-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c73884] font-mono text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="font-sans text-sm text-white/60">{t}</span>
              </div>
            ))}
          </div>
        )}

        {/* Live pulse */}
        {"live" in mod && mod.live && (
          <div className="rv mt-10 flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-5 backdrop-blur-sm">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#18c692] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#18c692]" />
            </span>
            <div>
              <p className="font-sans text-sm font-semibold text-white">Rombongan Sakura — transit Singapura</p>
              <p className="font-mono text-[10px] text-white/40">24/24 peserta terpantau • Osaka cerah 22°C</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function PlatformFlow() {
  return (
    <>
      {/* Intro */}
      <section id="platform" className="scroll-mt-20 bg-[#07090e] px-6 py-20 text-center lg:px-12 lg:py-28">
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#c73884]">
          Platform NayB
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mx-auto max-w-3xl font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Satu Platform untuk Seluruh Perjalanan Edukasi
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="mx-auto mt-4 max-w-xl font-sans text-base font-light text-white/45">
          Dari merancang program hingga dokumentasi akhir — kelola edutour sekolah Anda dalam satu tempat
        </motion.p>
      </section>

      {MODULES.map((mod) => <Chapter key={mod.id} mod={mod} />)}

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0630] via-[#0e131f] to-[#07090e] px-6 py-20 text-center lg:px-12 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(199,56,132,0.12)_0%,transparent_70%)]" />
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-2xl font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Siap Mulai Program Edutour Sekolah Anda?
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 mx-auto mt-4 max-w-md font-sans text-base font-light text-white/50">
          Hubungi tim NayB — kami bantu dari konsultasi awal hingga keberangkatan
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="https://wa.me/6281334357456" target="_blank" rel="noopener noreferrer"
            className="rounded-full bg-white px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#07090e] transition hover:bg-white/90 active:scale-95">
            Hubungi via WhatsApp
          </a>
          <a href="mailto:naybglobal@gmail.com"
            className="rounded-full border border-white/30 px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:border-white/60 active:scale-95">
            Email Tim NayB
          </a>
        </motion.div>
      </section>
    </>
  );
}
