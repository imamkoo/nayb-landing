import {
  type NavigationLink,
  type PlatformCategory,
  BlogPost,
  FooterCol,
  FooterSocials,
  HeroBenefit,
  Location,
  Service,
  Step,
  Testimonial,
} from "./contentTypes";

import Airplane from "../components/Icons/Airplane";
import BellIcon from "../components/Icons/BellIcon";
import Booking from "../components/Icons/Booking";
import Box from "../components/Icons/Box";
import Checkmark from "../components/Icons/Checkmark";
import Culinary from "../components/Icons/Culinary";
import Destination from "../components/Icons/Destination";
import Email from "../components/Icons/Email";
import Guide from "../components/Icons/Guide";
import Instagram from "../components/Icons/Instagram";
import Linkedin from "../components/Icons/Linkedin";
import { Location as LocationIcon } from "../components/Icons/Location";
import Phone from "../components/Icons/Phone";
import SearchIcon from "../components/Icons/SearchIcon";
import Star from "../components/Icons/Star";
import WhatsApp from "../components/Icons/WhatsApp";

const navigationLinks: NavigationLink[] = [
  {
    id: 1,
    href: "/",
    text: "Home",
    dropdown: false,
  },
  {
    id: 2,
    href: "/about",
    text: "About",
    dropdown: false,
  },
  {
    id: 3,
    href: "/services",
    text: "Services",
    dropdown: true,
    dropdownLinks: [
      {
        id: 1,
        href: "/culinaryTours",
        text: "Culinary Tours",
        dropdown: false,
      },
      {
        id: 2,
        href: "/destinationExpertise",
        text: "Destination Expertise",
        dropdown: false,
      },
      {
        id: 3,
        href: "/customizedPackages",
        text: "Customized Packages",
        dropdown: false,
      },
    ],
  },
  {
    id: 4,
    href: "/pages",
    text: "Pages",
    dropdown: true,
    dropdownLinks: [
      {
        id: 1,
        href: "/privacyPolicy",
        text: "Privacy Policy",
        dropdown: false,
      },
      {
        id: 2,
        href: "/aboutCompany",
        text: "About Company",
        dropdown: false,
      },
      {
        id: 3,
        href: "/paymentGateway",
        text: "Payment Gateway",
        dropdown: false,
      },
      {
        id: 4,
        href: "/termsConditions",
        text: "Terms & Conditions",
        dropdown: false,
      },
    ],
  },
  {
    id: 5,
    href: "/testimonials",
    text: "Testimonials",
    dropdown: false,
  },
  {
    id: 6,
    href: "/portal",
    text: "Portal",
    dropdown: false,
  },
];

const heroBenefits: HeroBenefit[] = [
  {
    id: 1,
    Icon: Booking,
    heading: "Easy Booking",
    description: "Your hassle-free solution for convenient.",
  },
  {
    id: 2,
    Icon: Airplane,
    heading: "Airport Pickup",
    description: "Offers a reliable and convenient transportation service.",
  },
  {
    id: 3,
    Icon: Guide,
    heading: "Best Guide",
    description: "trusted companion for exploring new destinations.",
  },
];

const steps: Step[] = [
  { id: 1, heading: "Rencana & Keinginan Klien", description: "Tim menerima request dan tujuan yang diinginkan klien — destinasi, durasi, capain belajar, dan anggaran." },
  { id: 2, heading: "Penentuan Peserta & Administrasi", description: "Presentasi kepada calon peserta, pendataan, hingga pembayaran yang tertib dan transparan." },
  { id: 3, heading: "Persiapan Peserta", description: "Pengecekan koper dan hal-hal yang harus disiapkan peserta untuk kenyamanan selama program (untuk siswa)." },
  { id: 4, heading: "Keberangkatan", description: "Pelaksanaan perjalanan dengan pendampingan penuh, SOP keselamatan, dan update harian untuk sekolah & orang tua." },
];

const driveThumb = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

const driveIds = [
  "1_VFwOxaxTs3sXUh0Q4Cvywjh7EOgg267", "1nIqbEqm9mWlZay_vrTNIvRrQ7igc0Gxx", "1bGZoclhtW2RdljZyY8XMEbFhFOfwzBpW",
  "1EZytSVvzfABR1YINUmRTd-aluUYjqiPW", "1QlfMBC6ZZ5nL8Z2FB4gvpoyX79SCXZwF", "10Fic8XrUToEe1IzpTr0umLMR4TcQk7lW",
  "177xEQx_kbdl7m2hlKC8VpVRH-n21YDm-", "1og-9VpzkMuwQc0pHfmKRRYAVCfLNaSsl", "1iBEwwB-tsihNkkGLzSR8Hdn4CYERkLgY",
  "1kcayOrn5RnjKnUhYa7d6mRrYv1oHb4hu", "1QjRMWYpY_NkKMa4RO31dD7-0ULON8WjD", "10dFvwLaLYqq-WWH70G-7Ce4dr9Wfxs9W",
  "1GrcnY3t2y4rR_TgnH0UstoAd2YRNar-C", "1ir-XYgS3YSCCtc5h6SJ_WCr9aiBWqdBD", "1EchRGg1y5tNKyxM64tNHrmHZfVpUTycC",
  "1wNUZ0k0LVaYvZC_Uk1Lg64sFMXdGXs_5", "1hrKE5m8M3rRjAQjztWzLieJDBPDEth5M", "1VvePBpmLRFUW0wVik4NQmRVAgkAmhimJ",
  "17nL3CHdzIx3dFt49tM60V3bpCoKzgUq-", "13dx1LvXsnFM_Z16zNsfYHfOyZFk_tYZA", "1EkFddjIKoasaspHbT3VmJNHJD2xOEBwH",
  "1O5usNJeBgHydSxlqOy1tR1d33KSPhKaN", "1eyxCDlhKFj3odwtQoc51xjxf7RO-hw1A", "1g-il_AxTqkpBLTvqM7HOzritx27FU8Ua",
  "1gHMgWRoewgkd5MQUvnPDsygZRbJiR6NS", "1nTBz0jV1opLcSAlqzlo9z7IkysY4p4p1", "1MltrCdllHOnEKyrl4qQ7FHHkRqNWmWr1",
  "1pfTJlrTVZINgs9Ht9Aa90wT1Efpvwdu8", "118VgcxsVpKuUFvmRINRDPY4PfmD9zeuk", "1iCgseu40zpLY4hL1hPogGnK2Scmx6LUw",
  "1XdVuk1K5YLsDwVlmH7i2SKgoSIbEdQpB", "1vYlvvgeykwtpLb2XQ8f_TANuBZrA0yEF", "1a6NP9gY3Ay-pkUXV1iiY9o82C7COsk0r",
  "1ScZZ-cob4TgSv3ew3wrGEa4zV0F2TgdI", "1d5BimlkMwtgX8l9iF3ZjhZxXAQMTyEG1", "1H7wa2_hpqnPnqMPc79UT9BKkFSk_u8Xh",
  "1T83k7e0Q1My9wNOoWayp4Du6zjOHq9MM", "1Yk_ULM11iSigSuU5UpIrswIGg7JxnfiK", "1VOLIGx1EEO2OAjWWDW1ZSR10b0vobTGw",
  "1RYKE_v4HXSqmjluus9DWMIHUdjb2yaFf", "1Lje3F-ia5mOM4SzfWjIjzJtTW7zAnmGk", "1Th-6GoaxDYiMtqJ5lteDpz8lh4D8JSVd",
  "1vTtfIo0PkRsuL19W11-jm3qfsfIpilCP", "1luS8i82YUVK3_tVaqP0lqIc0BLO_DQDK", "1nw72524GFVOKwQ8DbNOKKDzDzhoEXoD3",
  "1bT2-zQUi946w3dK8sBZksIOoFZTyBR9V", "12ogT-MyAgsRq_InlgAChum_XEIBJlLaG", "1LaFGjKwr0R7-bnthJOc2MYep0KEiznHg",
];

const drivePhotos = driveIds.map(driveThumb);

export const heroChapters = [
  { id: "open", img: drivePhotos[0], tag: { id: "Perjalanan Edukasi", en: "Education Journey" }, title: { id: "Buka Dunia", en: "Open Worlds" } },
  { id: "grow", img: drivePhotos[1], tag: { id: "Pertukaran Pelajar", en: "Student Exchange" }, title: { id: "Bertumbuh", en: "Grow" } },
  { id: "immerse", img: drivePhotos[2], tag: { id: "School Immersion", en: "School Immersion" }, title: { id: "Menyatu", en: "Immerse" } },
  { id: "explore", img: drivePhotos[3], tag: { id: "Study Tour", en: "Study Tour" }, title: { id: "Menjelajah", en: "Explore" } },
];

// Split all verified Drive photos across the three program tracks so each row
// is genuinely swipeable with many images (brief item #9).
const chunk = <T,>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};
const [g1 = [], g2 = [], g3 = []] = chunk(drivePhotos, Math.ceil(drivePhotos.length / 3));

export const programGallery = [
  { id: "exchange", label: "Student Exchange", labelId: "Pertukaran Pelajar", images: g1 },
  { id: "immersion", label: "School Immersion", labelId: "School Immersion", images: g2 },
  { id: "studytour", label: "Study Tour", labelId: "Study Tour", images: g3 },
];

export const faqs = [
  { q: "Apakah aman untuk siswa SMP/SMA?", qEn: "Is it safe for junior/senior high students?", a: "Ya. Setiap rombongan didampingi tour leader & guru pendamping, SOP keselamatan berlapis, dan grup komunikasi harian dengan sekolah & orang tua.", aEn: "Yes. Every cohort has tour leaders & teacher chaperones, layered safety SOPs, and daily group updates for schools & parents." },
  { q: "Berapa minimal peserta?", qEn: "Minimum participants?", a: "Fleksibel per program — tim kami akan sesuaikan opsi keberangkatan dan biaya agar tetap efisien untuk sekolah Anda.", aEn: "Flexible per program — our team will tune departure options and costing to stay efficient for your school." },
  { q: "Apakah itinerary bisa custom?", qEn: "Can the itinerary be customized?", a: "Bisa. Inilah inti layanan kami: kurikulum-terhubung dan menyesuaikan durasi, destinasi, serta anggaran.", aEn: "Absolutely. That is our core: curriculum-linked, tuned to duration, destination, and budget." },
  { q: "Bagaimana dengan visa & dokumen?", qEn: "What about visas & documents?", a: "Tim NayBe membantu checklist dokumen, briefing, dan pengecekan koper sebelum berangkat.", aEn: "NayBe assists with document checklists, briefings, and luggage checks before departure." },
  { q: "Bagaimana cara ajukan proposal sekolah?", qEn: "How to request a school proposal?", a: "Isi form Ajukan Proposal / Special Request di bawah — tim akan menghubungi dengan draf itinerary & rincian biaya.", aEn: "Use the Request Proposal / Special Request form below — our team will follow up with a draft itinerary & cost breakdown." },
];

const services: Service[] = [
  {
    id: 1,
    Icon: Box,
    heading: "Customized Packages",
    description:
      "Explore our range of customizable travel packages tailored to your budget and preferences.",
  },
  {
    id: 2,
    Icon: Culinary,
    heading: "Culinary Tours",
    description:
      "Indulge in culinary delights from around the world with our curated food and wine tours.",
  },
  {
    id: 3,
    Icon: Destination,
    heading: "Destination Expertise",
    description:
      "Benefit from our extensive knowledge of destinations worldwide for informed travel decisions.",
  },
];

const blogPosts: BlogPost[] = [
  {
    id: "1",
    img: "/blogs/aroundTheGlobe.webp",
    alt: "An arial image of 4 small islands near a shoreline with 2 boats passing between them.",
    date: "Nov 19, 2024",
    title: "Stories from Around the Globe",
    summary:
      "From the bustling streets of Tokyo to the serene landscapes of  Patagonia, each story offers a glimpse into the diverse cultures,  breathtaking landscapes, and unforgettable encounters.",
  },
  {
    id: "2",
    img: "/blogs/hiddenGems.webp",
    alt: "An arial shot of bungalows on the water in the Maldives",
    date: "Dec 25, 2024",
    title: "Exploring Hidden Gems",
    summary:
      "Dive into our latest blog post as we uncover the enchanting allure of  off the beaten path destinations. From secluded beaches to quaint  villages, we guide you on a journey to discover the hidden gems waiting  to be explored.",
  },
];

const locations: Location[] = [
  {
    id: "1",
    img: "/locations/kudahuvadhoo.webp",
    alt: "An image of kudahuvadhoo in Central Province, Maldives",
    rating: 4.6,
    title: "Kudahuvadhoo",
    location: "Central Province, Maldives",
    pricePerPerson: 127,
  },
  {
    id: "2",
    img: "/locations/greatBarrierReef.webp",
    alt: "An image of Great Barrier Reef in Queensland, Australia",
    rating: 4.2,
    title: "Great Barrier Reef",
    location: "Queensland, Australia",
    pricePerPerson: 149,
  },
  {
    id: "3",
    img: "/locations/sonevaSecret.webp",
    alt: "An image of Soneva Secret in Makunudhoo, Maldives",
    rating: 4.5,
    title: "Soneva Secret",
    location: "Makunudhoo, Maldives",
    pricePerPerson: 152,
  },
  {
    id: "4",
    img: "/locations/navagioBay.webp",
    alt: "An image of Navagio Bay in Zakynthos, Greece",
    rating: 4.1,
    title: "Navagio Bay",
    location: "Zakynthos, Greece",
    pricePerPerson: 137,
  },
  {
    id: "5",
    img: "/locations/grandAnse.webp",
    alt: "An image of Grand Anse in Grenada, Caribbean",
    rating: 4.9,
    title: "Grand Anse",
    location: "Grenada, Caribbean",
    pricePerPerson: 102,
  },
  {
    id: "6",
    img: "/locations/zakynthos.webp",
    alt: "An image of Zakynthos in Keri, Greece",
    rating: 4.4,
    title: "Zakynthos",
    location: "Keri, Greece",
    pricePerPerson: 191,
  },
  {
    id: "7",
    img: "/locations/sonevaJani.webp",
    alt: "An image of Soneva Jani in Noonu Atoll, Maldives",
    rating: 4.9,
    title: "Soneva Jani",
    location: "Noonu Atoll, Maldives",
    pricePerPerson: 340,
  },
  {
    id: "8",
    img: "/locations/fourSeasons.webp",
    alt: "An image of Four Seasons in Motu Tehotu, Bora Bora",
    rating: 4.3,
    title: "Four Seasons",
    location: "Motu Tehotu, Bora Bora",
    pricePerPerson: 235,
  },
  {
    id: "9",
    img: "/locations/nusaPenida.webp",
    alt: "An image of Nusa Penida in Bali, Indonesia",
    rating: 4.2,
    title: "Nusa Penida",
    location: "Bali, Indonesia",
    pricePerPerson: 235,
  },
];

const testimonials: Testimonial[] = [
  { id: 1, img: "/headshots/linh.webp", alt: "Orang tua siswa", name: "Ibu Rina — Orang tua, Surabaya", nameEn: "Mrs. Rina — Parent, Surabaya", description: "“Anak saya pulang lebih percaya diri dan mandiri. Komunikasi tim NayBe setiap hari bikin kami tenang di rumah.”", descriptionEn: "“Our child came home more confident and independent. NayBe's daily updates gave us peace of mind.”", vacation: "School Immersion — Malaysia" },
  { id: 2, img: "/headshots/alex.webp", alt: "Orang tua siswa", name: "Bapak Hendra — Orang tua, Mojokerto", nameEn: "Mr. Hendra — Parent, Mojokerto", description: "“Persiapan matang, koper sampai briefing detail. Anak-anak nyaman, guru juga terbantu.”", descriptionEn: "“Thorough preparation, from luggage checks to detailed briefings. Students were comfortable and teachers well supported.”", vacation: "Study Tour — Singapore" },
  { id: 3, img: "/headshots/tiffany.webp", alt: "Guru pendamping", name: "Bu Ayu — Guru Pendamping", nameEn: "Ms. Ayu — Chaperone Teacher", description: "“Itinerary rapi dan edukatif. Siswa benar-benar merasakan school immersion, bukan sekadar jalan-jalan.”", descriptionEn: "“A neat, educational itinerary. Students truly experienced school immersion, not just sightseeing.”", vacation: "Student Exchange — Japan" },
];

const footerCols: FooterCol[] = [
  {
    id: 1,
    heading: "Menu",
    links: [
      { id: 1, href: "#", name: "Blog" },
      { id: 2, href: "#", name: "Explore" },
      { id: 3, href: "#", name: "VIP Program" },
      { id: 4, href: "#", name: "Testimonials" },
    ],
  },
  {
    id: 2,
    heading: "Services",
    links: [
      { id: 1, href: "#", name: "Culinary" },
      { id: 2, href: "#", name: "Location" },
      { id: 3, href: "#", name: "Destination" },
      { id: 4, href: "#", name: "Customizes" },
    ],
  },
  {
    id: 3,
    heading: "Extra",
    links: [
      { id: 1, href: "#", name: "Privacy Policy" },
      { id: 2, href: "#", name: "About Company" },
      { id: 3, href: "#", name: "Payment Gateway" },
      { id: 4, href: "#", name: "Terms & Conditions" },
    ],
  },
  {
    id: 4,
    heading: "Contact Information",
    links: [
      { id: 1, href: "#", Icon: Phone, name: "62 813 3435 7456" },
      { id: 2, href: "#", Icon: Email, name: "naybeglobal@gmail.com" },
      {
        id: 3,
        href: "#",
        Icon: LocationIcon,
        name: "Jl Halmahera 8, Mojokerto, Jawa Timur, Indonesia",
      },
    ],
  },
];

const footerSocials: FooterSocials[] = [
  {
    id: 1,
    alt: "LinkedIn Logo Link",
    href: "https://www.linkedin.com",
    Icon: Linkedin,
  },
  {
    id: 2,
    alt: "Instagram Logo Link",
    href: "https://www.instagram.com",
    Icon: Instagram,
  },
  {
    id: 3,
    alt: "WhatsApp Logo Link",
    href: "https://www.whatsapp.com",
    Icon: WhatsApp,
  },
];

const platformCategories: PlatformCategory[] = [
  {
    id: 1,
    title: "Dasbor Program",
    tagline: "Pantau semua program edutour sekolah dalam satu layar.",
    features: [
      { id: 1, Icon: Booking, heading: "Daftar Program", description: "Semua program pertukaran pelajar & edutrip sekolah terdokumentasi rapi." },
      { id: 2, Icon: Box, heading: "Buat Program Baru", description: "Susun program baru dari template: destinasi, durasi, kuota peserta." },
      { id: 3, Icon: Checkmark, heading: "Progres & Status", description: "Pantau persiapan, keberangkatan, hingga kepulangan tiap rombongan." },
      { id: 4, Icon: SearchIcon, heading: "Pencarian Program", description: "Cari program berdasar negara, jenjang, tema belajar, atau jadwal." },
    ],
  },
  {
    id: 2,
    title: "Rencana & Mitra",
    tagline: "Rancang program bersama sekolah mitra dan destinasi terbaik.",
    features: [
      { id: 1, Icon: Destination, heading: "Jenis & Tujuan Program", description: "Pertukaran pelajar, school immersion, study tour, atau language trip." },
      { id: 2, Icon: LocationIcon, heading: "Pilih Mitra & Destinasi", description: "Jepang, China, hingga Asia Tenggara — sesuaikan dengan kurikulum." },
      { id: 3, Icon: Guide, heading: "Kelola Jaringan Mitra", description: "Data sekolah mitra, homestay, dan pemandu lokal dalam satu tempat." },
      { id: 4, Icon: Email, heading: "Buat Proposal", description: "Generate proposal kegiatan siap ajukan ke sekolah dan orang tua." },
    ],
  },
  {
    id: 3,
    title: "Agenda Perjalanan",
    tagline: "Itinerary harian yang jelas untuk guru, siswa, dan orang tua.",
    features: [
      { id: 1, Icon: Airplane, heading: "Itinerary Harian", description: "Jadwal kunjungan sekolah, wisata edukasi, hingga waktu istirahat." },
      { id: 2, Icon: Star, heading: "Linimasa Kegiatan", description: "Alur kegiatan dari briefing, keberangkatan, sampai evaluasi akhir." },
      { id: 3, Icon: BellIcon, heading: "Pengingat Agenda", description: "Notifikasi otomatis sebelum tiap kegiatan penting dimulai." },
    ],
  },
  {
    id: 4,
    title: "Peserta & Dokumen",
    tagline: "Administrasi siswa dan perizinan tanpa kertas berserakan.",
    features: [
      { id: 1, Icon: Booking, heading: "Daftar Peserta", description: "Data siswa, guru pendamping, dan kelompok rombongan terpusat." },
      { id: 2, Icon: Checkmark, heading: "Persetujuan & Izin", description: "Izin orang tua dan persetujuan sekolah terdigitalisasi." },
      { id: 3, Icon: Email, heading: "Status Dokumen", description: "Lacak paspor, visa, asuransi, dan surat izin tiap peserta." },
      { id: 4, Icon: BellIcon, heading: "Notifikasi Dokumen", description: "Peringatan dokumen kurang atau mendekati kedaluwarsa." },
    ],
  },
  {
    id: 5,
    title: "Info & Komunikasi",
    tagline: "Orang tua tenang karena kabar perjalanan selalu sampai.",
    features: [
      { id: 1, Icon: Star, heading: "Pengumuman", description: "Info resmi program, jadwal, dan perubahan terkini." },
      { id: 2, Icon: Guide, heading: "Portal Orang Tua", description: "Ruang khusus orang tua memantau perjalanan anak." },
      { id: 3, Icon: LocationIcon, heading: "Live Journey", description: "Kabar dan posisi rombongan diperbarui selama perjalanan." },
      { id: 4, Icon: Phone, heading: "Kontak Tim", description: "Hubungi tim pendamping dan koordinator kapan pun dibutuhkan." },
    ],
  },
  {
    id: 6,
    title: "Pembayaran",
    tagline: "Biaya transparan, tagihan rapi, bukti tersimpan.",
    features: [
      { id: 1, Icon: Box, heading: "Rincian Biaya", description: "Komponen biaya program terbuka: tiket, akomodasi, makan, tiket wisata." },
      { id: 2, Icon: Booking, heading: "Tagihan Per Peserta", description: "Tagihan individual tiap siswa, bisa dicicil bertahap." },
      { id: 3, Icon: Checkmark, heading: "Bukti & Riwayat", description: "Bukti bayar dan riwayat transaksi tersimpan aman." },
      { id: 4, Icon: BellIcon, heading: "Pengingat Pembayaran", description: "Pengingat jatuh tempo otomatis ke orang tua." },
    ],
  },
  {
    id: 7,
    title: "Dokumentasi & Evaluasi",
    tagline: "Kenangan terdokumentasi, hasil belajar terukur.",
    features: [
      { id: 1, Icon: Star, heading: "Galeri Foto & Video", description: "Momen perjalanan terdokumentasi dan bisa dibagikan." },
      { id: 2, Icon: Guide, heading: "Refleksi Siswa", description: "Jurnal dan cerita pengalaman dari tiap peserta." },
      { id: 3, Icon: Checkmark, heading: "Hasil Belajar", description: "Capaian pembelajaran dan sertifikat keikutsertaan program." },
      { id: 4, Icon: Box, heading: "Arsip Program", description: "Seluruh program tersimpan sebagai portofolio sekolah." },
    ],
  },
  {
    id: 8,
    title: "Keamanan & Akun",
    tagline: "Keselamatan peserta prioritas utama setiap program.",
    features: [
      { id: 1, Icon: Phone, heading: "Kontak Darurat", description: "Nomor darurat tim, rumah sakit, dan KBRI di tiap destinasi." },
      { id: 2, Icon: Checkmark, heading: "Panduan Keselamatan", description: "SOP keamanan, mitigasi risiko, dan tata tertib perjalanan." },
      { id: 3, Icon: LocationIcon, heading: "Masuk & Hak Akses", description: "Peran terpisah: admin, guru, siswa, dan orang tua." },
      { id: 4, Icon: Guide, heading: "Pengaturan Profil", description: "Kelola profil sekolah, data kontak, dan preferensi notifikasi." },
    ],
  },
];

export {
  blogPosts,
  footerCols,
  footerSocials,
  heroBenefits,
  locations,
  navigationLinks,
  platformCategories,
  services,
  steps,
  testimonials,
};

// BLOG POSTS CSV

// img_url,date_created,article_title,article_summary,img_alt
// some_url,2024-11-19,Stories from Around the Globe,"From the bustling streets of Tokyo to the serene landscapes of  Patagonia, each story offers a glimpse into the diverse cultures, breathtaking landscapes, and unforgettable encounters.",An arial image of 4 small islands near a shoreline with 2 boats passing between them.
// some_url,2024-12-25,Exploring Hidden Gems,"Dive into our latest blog post as we uncover the enchanting allure of  off the beaten path destinations. From secluded beaches to quaint  villages, we guide you on a journey to discover the hidden gems waiting  to be explored.",An arial shot of bungalows on the water in the Maldives

// LOCATION CARDS CSV

// img_url,rating,title,location,price_per_person,img_alt
// some_url,4.2,Nusa Penida,"Bali, Indonesia",235,"An image of Nusa Penida in Bali, Indonesia"
// some_url,4.5,Soneva Secret,"Makunudhoo, Maldives",152,"An image of Soneva Secret in Makunudhoo, Maldives"
// some_url,4.9,Grand Anse,"Grenada, Caribbean",102,"An image of Grand Anse in Grenada, Caribbean"
// some_url,4.9,Soneva Jani,"Noonu Atoll, Maldives",340,"An image of Soneva Jani in Noonu Atoll, Maldives"
// some_url,4.2,Great Barrier Reef,"Queensland, Australia",149,"An image of Great Barrier Reef in Queensland, Australia"
// some_url,4.3,Four Seasons,"Motu Tehotu, Bora Bora",235,"An image of Four Seasons in Motu Tehotu, Bora Bora"
// some_url,4.6,Kudahuvadhoo,"Central Province, Maldives",127,"An image of kudahuvadhoo in Central Province, Maldives"
// some_url,4.1,Navagio Bay,"Zakynthos, Greece",137,"An image of Navagio Bay in Zakynthos, Greece"
// some_url,4.4,Zakynthos,"Keri, Greece",191,"An image of Zakynthos in Keri, Greece"
