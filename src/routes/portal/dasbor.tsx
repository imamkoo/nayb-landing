import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/portal/dasbor")({
  component: DasborPage,
});

const PROGRAMS = [
  { id: 1, name: "Sakura Exchange — Jepang", school: "SMA 1 Mojokerto", date: "12–24 Okt 2026", progress: 82, status: "Persiapan", students: 24 },
  { id: 2, name: "Great Wall Study Tour — China", school: "SMA 2 Mojokerto", date: "8–18 Nov 2026", progress: 45, status: "Pendaftaran", students: 30 },
  { id: 3, name: "Bali Culture Immersion", school: "SMP 3 Mojokerto", date: "5–9 Des 2026", progress: 20, status: "Perencanaan", students: 40 },
  { id: 4, name: "Merlion Campus Visit — Singapura", school: "SMA 1 Mojokerto", date: "15–19 Jan 2027", progress: 10, status: "Draf", students: 18 },
];

const STATS = [
  { label: "Program Aktif", value: "4" },
  { label: "Total Peserta", value: "112" },
  { label: "Mitra Sekolah", value: "9" },
  { label: "Negara", value: "8" },
];

function statusColor(s: string) {
  if (s === "Persiapan") return "bg-green/15 text-green";
  if (s === "Pendaftaran") return "bg-yellow/20 text-yellow";
  return "bg-primary-100 text-primary-700";
}

function DasborPage() {
  const [q, setQ] = useState("");
  const list = PROGRAMS.filter((p) =>
    `${p.name} ${p.school}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <p className="text-2xl font-extrabold text-primary-800">{s.value}</p>
            <p className="text-xs font-medium text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-primary-800">Daftar Program</h2>
          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari program / sekolah…"
              className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-primary-300 sm:w-56"
            />
            <button className="shrink-0 rounded-full bg-primary-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-primary-800 active:scale-95">
              + Baru
            </button>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {list.map((p) => (
            <li key={p.id} className="rounded-xl bg-[#fbf8fc] p-4 ring-1 ring-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-primary-800">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.school} • {p.date} • {p.students} siswa</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor(p.status)}`}>
                  {p.status}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-primary-700 to-primary-300" style={{ width: `${p.progress}%` }} />
              </div>
              <p className="mt-1 text-right font-mono text-xs text-slate-500">{p.progress}%</p>
            </li>
          ))}
          {list.length === 0 && <p className="py-6 text-center text-sm text-slate-400">Tidak ada program yang cocok.</p>}
        </ul>
      </div>
    </div>
  );
}
