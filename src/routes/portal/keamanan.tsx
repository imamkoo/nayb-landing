import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/portal/keamanan")({
  component: KeamananPage,
});

const EMERGENCY = [
  { label: "Tim NayBe Darurat 24/7", value: "0813-3400-0099" },
  { label: "KBRI Tokyo", value: "+81-3-3447-1947" },
  { label: "Asuransi Perjalanan", value: "1500-110 (polis NAYBE-2026)" },
];

const GUIDES = [
  "Selalu bergerak dalam kelompok minimal 3 orang.",
  "Simpan paspor di hotel safe deposit; bawa fotokopi saat keluar.",
  "Lapor ke guru pendamping tiap 2 jam via grup rombongan.",
  "Hafalkan titik kumpul darurat di tiap destinasi.",
];

function KeamananPage() {
  const [name, setName] = useState("SMA Negeri 1 Mojokerto");
  const [phone, setPhone] = useState("0813-3400-0000");
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl bg-red/10 p-5 ring-1 ring-red/20">
        <h2 className="mb-4 text-lg font-bold text-red">Kontak Darurat</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {EMERGENCY.map((e) => (
            <li key={e.label} className="rounded-xl bg-white p-4 ring-1 ring-red/20">
              <p className="text-xs font-medium text-slate-500">{e.label}</p>
              <p className="mt-1 font-mono text-sm font-bold text-primary-800">{e.value}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <h2 className="mb-4 text-lg font-bold text-primary-800">Panduan Keselamatan</h2>
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm font-light text-slate-600">
          {GUIDES.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <h2 className="mb-1 text-lg font-bold text-primary-800">Masuk & Pengaturan Profil</h2>
        <p className="mb-4 text-sm font-light text-slate-500">Peran: Admin Sekolah — akses penuh ke 8 modul.</p>
        <div className="flex flex-col gap-3 sm:max-w-md">
          <label className="flex flex-col gap-1 text-sm font-semibold text-slate-600">
            Nama sekolah
            <input value={name} onChange={(e) => { setName(e.target.value); setSaved(false); }} className="rounded-xl border border-slate-200 px-4 py-2 font-normal outline-none focus:border-primary-300" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-slate-600">
            Telepon koordinator
            <input value={phone} onChange={(e) => { setPhone(e.target.value); setSaved(false); }} className="rounded-xl border border-slate-200 px-4 py-2 font-normal outline-none focus:border-primary-300" />
          </label>
          <button
            onClick={() => setSaved(true)}
            className="w-fit rounded-full bg-primary-700 px-6 py-2 text-sm font-bold text-white transition hover:bg-primary-800 active:scale-95"
          >
            Simpan Profil
          </button>
          {saved && <p className="text-sm font-semibold text-green">Profil tersimpan (mock MVP).</p>}
        </div>
      </div>
    </div>
  );
}
