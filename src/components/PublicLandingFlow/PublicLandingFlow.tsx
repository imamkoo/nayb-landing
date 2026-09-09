import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import useInsertLead from "../../hooks/useInsertLead";

gsap.registerPlugin(ScrollTrigger);

export default function PublicLandingFlow() {
  const reduce = useReducedMotion();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  
  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } }
        );
      });
    });
    return () => ctx.revert();
  }, [reduce]);

  // Lead Form State
  const [formData, setFormData] = useState({ name: "", email: "", school: "", dest: "" });
  const [submitted, setSubmitted] = useState(false);
  const { mutate: insertLead, isPending } = useInsertLead({
    onSuccess: () => setSubmitted(true),
    onError: (err) => alert("Gagal mengirim pesan: " + err.message),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    insertLead({
      fullName: `${formData.name} - ${formData.school} (${formData.dest})`,
      emailAddress: formData.email,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <>
      {/* 1. ABOUT & STATS */}
      <section id="tentang" className="bg-[#f4f6fa] dark:bg-[#1a0728] transition-colors duration-300 px-6 py-24 text-slate-800 dark:text-white lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="rv flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E3007B]">
                Tentang NayBe Global
              </span>
              <h2 className="font-sans text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-tight text-slate-900 dark:text-white">
                Lebih dari sekadar jalan-jalan. Kami membangun pengalaman edukasi global.
              </h2>
            </div>
            <p className="max-w-md font-sans text-base font-light leading-relaxed text-slate-600 dark:text-white/70 lg:text-lg">
              NayBe adalah mitra resmi sekolah-sekolah di Indonesia untuk merancang dan memberangkatkan program pertukaran pelajar, school immersion, dan study tour ke berbagai negara dengan standar keamanan dan kurikulum teruji.
            </p>
          </div>

          <div className="rv mt-20 grid grid-cols-2 gap-8 border-t border-slate-200 dark:border-white/10 pt-12 sm:grid-cols-4 lg:mt-32 lg:pt-16">
            {[
              { v: "5,000+", l: "Siswa Berangkat" },
              { v: "150+", l: "Sekolah Mitra" },
              { v: "48", l: "Rombongan" },
              { v: "100%", l: "Safety Track Record" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-sans text-4xl font-extrabold text-[#E3007B] lg:text-5xl">{s.v}</p>
                <p className="mt-2 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-white/50">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PROGRAM & DESTINATIONS */}
      <section id="program" className="bg-white dark:bg-[#2b103f] transition-colors duration-300 px-6 py-24 text-slate-800 dark:text-white lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="rv mb-16">
            <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E3007B]">
              Katalog Program
            </span>
            <h2 className="font-sans text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
              Rancang Perjalanan Edukasi Anda
            </h2>
          </div>

          <div className="rv grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Pertukaran Pelajar", dest: "Jepang & Korea", desc: "Tinggal bersama keluarga asuh dan bersekolah di SMA lokal selama 2 minggu.", dur: "7-14 Hari" },
              { title: "School Immersion", dest: "Singapura & Malaysia", desc: "Bergabung dalam kelas reguler sekolah mitra luar negeri.", dur: "5-10 Hari" },
              { title: "Study Field Trip", dest: "China & Vietnam", desc: "Kunjungan tematik ke situs sejarah, lab sains, dan kampus ternama.", dur: "6-12 Hari" },
              { title: "Culture & Language", dest: "Bali & Filipina", desc: "Program intensif bahasa dan pengabdian masyarakat/konservasi.", dur: "7-14 Hari" },
            ].map((p) => (
              <div key={p.title} className="group flex flex-col justify-between rounded-3xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-8 transition-all hover:border-[#E3007B]/50 hover:shadow-xl dark:hover:bg-white/10 hover:-translate-y-1 cursor-pointer">
                <div>
                  <span className="mb-4 inline-block rounded-full bg-[#E3007B]/10 dark:bg-[#E3007B]/20 px-3 py-1 font-mono text-[10px] font-bold text-[#E3007B]">
                    {p.dur}
                  </span>
                  <h3 className="mb-2 font-sans text-xl font-bold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="mb-4 font-sans text-sm font-light text-slate-600 dark:text-white/60">{p.desc}</p>
                </div>
                <p className="font-mono text-xs font-semibold text-slate-400 dark:text-white/40">Fokus: {p.dest}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE NAYBE SYSTEM (Platform Preview) */}
      <section className="bg-[#f4f6fa] dark:bg-[#1a0728] transition-colors duration-300 px-6 py-24 text-slate-800 dark:text-white lg:px-12 lg:py-32 border-y border-slate-200 dark:border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="rv mb-16 max-w-3xl">
            <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E3007B]">
              Sistem NayBe EduOS
            </span>
            <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
              Kelola Rombongan Tanpa Stres
            </h2>
            <p className="font-sans text-lg font-light text-slate-600 dark:text-white/60">
              Setiap sekolah yang bermitra dengan kami mendapatkan akses ke sistem portal khusus (8 Modul Terintegrasi). Kami urus dokumennya, Anda fokus pada siswa.
            </p>
          </div>

          <div className="rv grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", title: "Dasbor & Rencana", desc: "Pantau persiapan & kelola mitra sekolah." },
              { num: "02", title: "Peserta & Izin", desc: "Administrasi paspor, visa, dan izin orang tua digital." },
              { num: "03", title: "Live Journey", desc: "Orang tua bisa melacak posisi rombongan real-time." },
              { num: "04", title: "Keamanan & SOP", desc: "Kontak darurat dan panduan keselamatan 24/7." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm dark:shadow-none backdrop-blur-sm">
                <span className="mb-3 block font-mono text-xl font-black text-slate-300 dark:text-white/20">{f.num}</span>
                <h3 className="mb-2 font-sans text-lg font-bold text-slate-900 dark:text-white">{f.title}</h3>
                <p className="font-sans text-sm font-light text-slate-600 dark:text-white/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY PORTFOLIO */}
      <section id="galeri" className="bg-white dark:bg-[#10031a] transition-colors duration-300 px-6 py-24 text-slate-800 dark:text-white lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="rv mb-16 text-center">
            <h2 className="font-sans text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">Galeri Perjalanan</h2>
          </div>
          <div className="rv grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1200&auto=format&fit=crop", cap: "Sakura Exchange 2024" },
              { img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop", cap: "Singapore Science Visit" },
              { img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1200&auto=format&fit=crop", cap: "Beijing Immersion" },
            ].map((g) => (
              <div key={g.cap} onClick={() => setSelectedImg(g.img)} className="group relative overflow-hidden rounded-2xl bg-slate-900 cursor-zoom-in">
                <img src={g.img} alt={g.cap} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />
                <p className="absolute bottom-4 left-6 font-sans text-sm font-bold text-white pointer-events-none translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">{g.cap}</p>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Lihat</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out"
            >
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                src={selectedImg}
                alt="Enlarged"
                className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <button className="absolute top-6 right-6 text-white bg-white/10 rounded-full p-3 hover:bg-white/20 transition backdrop-blur-md">
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 5. CONTACT / LEAD FORM CTA */}
      <section id="kontak" className="relative overflow-hidden bg-gradient-to-br from-[#E3007B] to-[#40195f] px-6 py-24 text-white lg:px-12 lg:py-32">
        <div className="relative z-10 mx-auto max-w-4xl rounded-3xl bg-[#1a0728]/90 dark:bg-[#1a0728]/90 p-8 shadow-2xl backdrop-blur-xl sm:p-12 lg:p-16 border border-white/10">
          <div className="text-center">
            <h2 className="font-sans text-3xl font-bold tracking-tight sm:text-4xl text-white">Ajukan Proposal Sekolah</h2>
            <p className="mt-4 font-sans text-base font-light text-white/70">
              Tulis kebutuhan sekolah Anda, dan tim kami akan menghubungi Anda dengan draf itinerary & rincian biaya.
            </p>
          </div>

          {submitted ? (
            <div className="mt-10 rounded-2xl bg-white/10 p-8 text-center border border-white/20">
              <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#18c692] text-3xl">✓</span>
              <h3 className="font-sans text-2xl font-bold text-white">Terima Kasih!</h3>
              <p className="mt-2 font-sans text-white/70">Permintaan proposal Anda telah kami terima. Tim kami akan segera menghubungi Anda via WhatsApp/Email.</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 font-mono text-sm text-[#E3007B] hover:text-white underline">Kirim permintaan lain</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-semibold uppercase tracking-wider text-white/60">Nama Lengkap</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 font-sans text-white outline-none transition focus:border-[#E3007B] focus:bg-white/10" placeholder="Nama Anda" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-semibold uppercase tracking-wider text-white/60">Email Aktif</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 font-sans text-white outline-none transition focus:border-[#E3007B] focus:bg-white/10" placeholder="email@sekolah.sch.id" />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="font-sans text-xs font-semibold uppercase tracking-wider text-white/60">Nama Sekolah</label>
                <input required type="text" value={formData.school} onChange={(e) => setFormData({ ...formData, school: e.target.value })} className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 font-sans text-white outline-none transition focus:border-[#E3007B] focus:bg-white/10" placeholder="Contoh: SMA Negeri 1 Jakarta" />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="font-sans text-xs font-semibold uppercase tracking-wider text-white/60">Negara Tujuan</label>
                <select value={formData.dest} onChange={(e) => setFormData({ ...formData, dest: e.target.value })} className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 font-sans text-white outline-none transition focus:border-[#E3007B] focus:bg-white/10 [&>option]:bg-[#1a0728]">
                  <option value="">-- Pilih Tujuan --</option>
                  <option value="Jepang">Jepang</option>
                  <option value="China">China</option>
                  <option value="Singapura">Singapura</option>
                  <option value="Lainnya">Lainnya (Bisa didiskusikan)</option>
                </select>
              </div>
              <div className="mt-4 sm:col-span-2">
                <button type="submit" disabled={isPending} className="w-full rounded-xl bg-[#E3007B] py-4 font-sans text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-[#E3007B]/30 transition hover:bg-[#c73884] active:scale-95 disabled:opacity-50">
                  {isPending ? "Mengirim..." : "Kirim Permintaan Proposal"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
