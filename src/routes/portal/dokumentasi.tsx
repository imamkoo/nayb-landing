import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/portal/dokumentasi")({
  component: DokumentasiPage,
});

const PHOTOS = [
  { src: "/locations/nusaPenida.webp", caption: "Nusa Penida — field study" },
  { src: "/locations/sonevaSecret.webp", caption: "Kunjungan bahari" },
  { src: "/blogs/aroundTheGlobe.webp", caption: "City tour Tokyo" },
  { src: "/blogs/hiddenGems.webp", caption: "Homestay & desa budaya" },
  { src: "/hero.webp", caption: "Briefing keberangkatan" },
  { src: "/swimmingDudes.webp", caption: "Outbound pantai" },
];

const REFLECTIONS = [
  { name: "Aisyah", text: "Baru kali ini belajar sejarah langsung di kuil berusia 400 tahun. Rasanya beda jauh dari buku paket." },
  { name: "Bima", text: "Homestay mengajarkanku mandiri — dari naik kereta sendiri sampai pesan makan pakai bahasa Jepang." },
];

function DokumentasiPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <h2 className="mb-4 text-lg font-bold text-primary-800">Galeri Foto & Video</h2>
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {PHOTOS.map((p) => (
            <li key={p.src} className="group overflow-hidden rounded-xl ring-1 ring-slate-200">
              <img src={p.src} alt={p.caption} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105" />
              <p className="bg-[#fbf8fc] px-3 py-2 text-xs font-medium text-slate-500">{p.caption}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <h2 className="mb-4 text-lg font-bold text-primary-800">Refleksi Siswa</h2>
          <ul className="flex flex-col gap-3">
            {REFLECTIONS.map((r) => (
              <li key={r.name} className="rounded-xl bg-[#fbf8fc] p-4 ring-1 ring-slate-100">
                <p className="text-sm font-light text-slate-600 italic">“{r.text}”</p>
                <p className="mt-2 text-xs font-bold text-primary-700">— {r.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <h2 className="mb-4 text-lg font-bold text-primary-800">Hasil Belajar & Arsip</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {[
              "Sertifikat keikutsertaan — 24 siswa terbit",
              "Laporan hasil observasi budaya — terkumpul 22/24",
              "Nilai proyek kelompok — rata-rata 88",
              "Arsip program 2024–2026 — 6 program tersimpan",
            ].map((t) => (
              <li key={t} className="rounded-xl bg-[#fbf8fc] px-4 py-3 font-medium text-slate-600 ring-1 ring-slate-100">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
