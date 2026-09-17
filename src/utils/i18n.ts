export type Lang = "id" | "en";

export const dict = {
  nav: {
    home: { id: "Beranda", en: "Home" },
    about: { id: "Tentang", en: "About" },
    program: { id: "Program", en: "Programs" },
    gallery: { id: "Galeri", en: "Gallery" },
    contact: { id: "Kontak", en: "Contact" },
    cta: { id: "Hubungi Kami", en: "Contact Us" },
  },
  hero: {
    eyebrow: { id: "EST. 2017 — NAYBE GLOBAL INDONESIA", en: "EST. 2017 — NAYBE GLOBAL INDONESIA" },
    h1a: { id: "Perjalanan Edukasi", en: "Education Journeys" },
    h1b: { id: "yang Aman & Berkesan", en: "Safe & Memorable" },
    sub: {
      id: "Bermitra dengan sekolah di seluruh Indonesia untuk pertukaran pelajar, school immersion, dan study tour ke berbagai negara.",
      en: "Partnering with schools across Indonesia for student exchange, school immersion, and study tours across countries — safe and seamless.",
    },
    ctaPrimary: { id: "Lihat Program", en: "View Programs" },
    ctaSecondary: { id: "Lihat Galeri", en: "View Gallery" },
    stats: {
      id: [
        { k: "5.000+", v: "Siswa berangkat" },
        { k: "150+", v: "Sekolah mitra" },
        { k: "48", v: "Rombongan" },
        { k: "100%", v: "Safety track record" },
      ],
      en: [
        { k: "5,000+", v: "Students flown" },
        { k: "150+", v: "Partner schools" },
        { k: "48", v: "Cohorts" },
        { k: "100%", v: "Safety track record" },
      ],
    },
  },
  about: {
    eyebrow: { id: "Tentang NayBe Global", en: "About NayBe Global" },
    title: {
      id: "Lebih dari sekadar jalan-jalan. Kami membangun pengalaman edukasi global.",
      en: "More than travel. We build global education experiences.",
    },
    body: {
      id: "Berdiri sejak 2017, NayBe Global Indonesia adalah education tour yang bekerjasama dengan sekolah-sekolah di Indonesia untuk merancang dan memberangkatkan program pertukaran pelajar, school immersion, dan study tour ke berbagai negara dengan aman dan nyaman.",
      en: "Established in 2017, NayBe Global Indonesia is an education tour operator partnering with schools across Indonesia to design and deliver student exchange, school immersion, and study tour programs to various countries — safely and comfortably.",
    },
    bullets: {
      id: ["Kurikulum-terhubung", "Pendampingan 24/7", "Standar keamanan berlapis"],
      en: ["Curriculum-linked", "24/7 chaperoning", "Layered safety standards"],
    },
  },
  katalog: {
    eyebrow: { id: "Katalog Program", en: "Program Catalogue" },
    title: { id: "Rancang Perjalanan Edukasi Anda", en: "Design Your Education Journey" },
    sub: {
      id: "Katalog lengkap menyusul. Sementara itu, pilih jalur program di bawah — tim kami akan sesuaikan itinerary, durasi, dan anggaran sekolah Anda.",
      en: "Full catalogue coming soon. In the meantime, pick a track below — our team will tailor itinerary, duration, and budget to your school.",
    },
    comingSoon: { id: "Menyusul — hubungi tim untuk katalog PDF", en: "Coming soon — contact us for the PDF catalogue" },
  },
  process: {
    eyebrow: { id: "How we build your program", en: "How we build your program" },
    title: { id: "NayBe Program Development Process", en: "NayBe Program Development Process" },
    steps: {
      id: [
        { no: "01", title: "Rencana & Keinginan Klien", desc: "Tim menerima request dan tujuan yang diinginkan klien — destinasi, durasi, capain belajar, dan anggaran." },
        { no: "02", title: "Penentuan Peserta & Administrasi", desc: "Presentasi kepada calon peserta, pendataan, hingga pembayaran yang tertib dan transparan." },
        { no: "03", title: "Persiapan Peserta", desc: "Pengecekan koper dan hal-hal yang harus disiapkan peserta untuk kenyamanan selama program (untuk siswa)." },
        { no: "04", title: "Keberangkatan", desc: "Pelaksanaan perjalanan dengan pendampingan penuh, SOP keselamatan, dan update harian untuk sekolah & orang tua." },
      ],
      en: [
        { no: "01", title: "Client Needs & Goals", desc: "We capture your request — destination, duration, learning outcomes, and budget." },
        { no: "02", title: "Participants & Administration", desc: "Presentation to prospective participants, registration, and transparent payment flow." },
        { no: "03", title: "Participant Preparation", desc: "Luggage checks and briefings on essentials for a comfortable journey (for students)." },
        { no: "04", title: "Departure", desc: "Full chaperoning, safety SOPs, and daily updates for schools & parents." },
      ],
    },
  },
  gallery: {
    eyebrow: { id: "Galeri Perjalanan", en: "Travel Gallery" },
    title: { id: "Cerita dari Lapangan", en: "Stories from the Field" },
    sub: {
      id: "Geser per program — setiap kartu bisa di-swipe. Sumber foto asli ada di Drive; di sini pakai placeholder terang sampai foto final diunggah.",
      en: "Swipe per program — each track is a swipeable row. Originals live on Drive; placeholders are bright until final photos are uploaded.",
    },
    viewDrive: { id: "Buka Drive", en: "Open Drive" },
  },
  proposal: {
    eyebrow: { id: "Ajukan Proposal", en: "Request a Proposal" },
    title: { id: "Ajukan Proposal Sekolah", en: "Request a School Proposal" },
    sub: {
      id: "Tulis kebutuhan sekolah Anda, dan tim kami akan menghubungi Anda dengan draf itinerary & rincian biaya.",
      en: "Tell us your school's needs and our team will get back with a draft itinerary & cost breakdown.",
    },
    special: { id: "Lainnya (Special Request)", en: "Other (Special Request)" },
    specialHint: {
      id: "Punya kebutuhan khusus di luar pilihan? Tulis di kolom Lainnya.",
      en: "Need something outside the options? Use the Other field.",
    },
  },
  testimonials: {
    eyebrow: { id: "Testimoni Orang Tua & Siswa", en: "Parents & Students" },
    title: { id: "Yang mereka katakan", en: "What they say" },
  },
  faq: {
    eyebrow: { id: "FAQ", en: "FAQ" },
    title: { id: "Pertanyaan yang sering ditanyakan", en: "Frequently asked questions" },
  },
} as const;

export const t = (lang: Lang, path: string) => {
  const parts = path.split(".");
  let cur: unknown = dict;
  for (const p of parts) cur = (cur as Record<string, unknown>)[p];
  const v = cur as { id: string; en: string } | undefined;
  if (!v) return path;
  return v[lang];
};
