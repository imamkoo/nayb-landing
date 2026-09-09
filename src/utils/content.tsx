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
  {
    id: 1,
    heading: "Start Your World Adventure",
    description:
      "Find student exchange programs that match your dreams. Study abroad and make fun memories.",
  },
  {
    id: 2,
    heading: "Learn in New Places",
    description:
      "Join top schools and explore new cultures. Travel and grow while studying.",
  },
  {
    id: 3,
    heading: "Pick Trips That Fit You",
    description:
      "Choose flexible exchange programs for your free spirit. Study, travel, and live your way.",
  },
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
  {
    id: 1,
    img: "/headshots/linh.webp",
    alt: "Headshot of a customer named Linh Chuong",
    name: "Linh Chuong",
    description:
      "Our experience with GoTravel has been nothing short of exceptional. We were able to find & book our annual vacation to Thailand in under an hour! ",
    vacation: "Trip to Thialand",
  },
  {
    id: 2,
    name: "Alex Johnson",
    alt: "Headshot of a customer named Alex Johnson",
    img: "/headshots/alex.webp",
    description:
      "I booked a 2 week vacation to the Maldives for me and my fiance with GoTravel. Very fair price and stunning resort. Felt amazing to unwind and get away!",
    vacation: "Maldives Getaway",
  },
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
      { id: 2, href: "#", Icon: Email, name: "naybglobal@gmail.com" },
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
