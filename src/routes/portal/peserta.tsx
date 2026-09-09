import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/portal/peserta")({
  component: PesertaPage,
});

type DocStatus = "Lengkap" | "Kurang" | "Menunggu";

const STUDENTS: { name: string; group: string; docs: DocStatus; consent: boolean }[] = [
  { name: "Aisyah Putri", group: "Kelompok Sakura", docs: "Lengkap", consent: true },
  { name: "Bima Aditya", group: "Kelompok Sakura", docs: "Lengkap", consent: true },
  { name: "Citra Lestari", group: "Kelompok Fuji", docs: "Kurang", consent: true },
  { name: "Dimas Prasetyo", group: "Kelompok Fuji", docs: "Menunggu", consent: false },
  { name: "Eka Rahmawati", group: "Kelompok Sakura", docs: "Lengkap", consent: true },
  { name: "Fajar Nugroho", group: "Kelompok Fuji", docs: "Kurang", consent: false },
];

function docColor(d: DocStatus) {
  if (d === "Lengkap") return "bg-green/15 text-green";
  if (d === "Kurang") return "bg-yellow/20 text-yellow";
  return "bg-slate-200 text-slate-500";
}

function PesertaPage() {
  const [q, setQ] = useState("");
  const [onlyIncomplete, setOnlyIncomplete] = useState(false);
  const list = STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(q.toLowerCase()) &&
      (!onlyIncomplete || s.docs !== "Lengkap" || !s.consent)
  );
  const incomplete = STUDENTS.filter((s) => s.docs !== "Lengkap" || !s.consent).length;

  return (
    <div className="flex flex-col gap-5">
      {incomplete > 0 && (
        <div className="rounded-2xl bg-yellow/15 p-4 text-sm font-semibold text-yellow ring-1 ring-yellow/30">
          {incomplete} peserta butuh perhatian dokumen / persetujuan.
        </div>
      )}

      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-primary-800">Daftar Peserta</h2>
          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari nama…"
              className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-primary-300 sm:w-48"
            />
            <button
              onClick={() => setOnlyIncomplete((v) => !v)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ring-1 transition active:scale-95 ${onlyIncomplete ? "bg-primary-700 text-white ring-primary-700" : "text-slate-600 ring-slate-200 hover:bg-slate-100"}`}
            >
              Perlu tindak lanjut
            </button>
          </div>
        </div>

        <ul className="flex flex-col gap-2">
          {list.map((s) => (
            <li key={s.name} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#fbf8fc] p-3 ring-1 ring-slate-100">
              <div>
                <p className="font-bold text-primary-800">{s.name}</p>
                <p className="text-xs text-slate-500">{s.group}</p>
              </div>
              <div className="flex gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${docColor(s.docs)}`}>
                  Dokumen: {s.docs}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${s.consent ? "bg-green/15 text-green" : "bg-red/10 text-red"}`}>
                  Izin: {s.consent ? "Ya" : "Belum"}
                </span>
              </div>
            </li>
          ))}
          {list.length === 0 && <p className="py-6 text-center text-sm text-slate-400">Tidak ada peserta yang cocok.</p>}
        </ul>
      </div>
    </div>
  );
}
