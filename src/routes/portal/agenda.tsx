import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/portal/agenda")({
  component: AgendaPage,
});

const INITIAL = [
  { id: 1, day: "Hari 1", title: "Keberangkatan & Transit", detail: "Briefing rombongan, terbang SUB–KIX via Singapura.", time: "06:00", done: true, remind: true },
  { id: 2, day: "Hari 2", title: "Selamat Datang di Osaka", detail: "Penjemputan sekolah mitra, pembagian homestay.", time: "09:00", done: true, remind: true },
  { id: 3, day: "Hari 3", title: "School Immersion", detail: "Ikut kelas + klub budaya (kaligrafi & kendo).", time: "08:00", done: false, remind: true },
  { id: 4, day: "Hari 4", title: "Sains di Kyoto", detail: "Museum sains + observasi geologi sesar Nojima.", time: "08:30", done: false, remind: false },
  { id: 5, day: "Hari 5", title: "Refleksi & Kepulangan", detail: "Presentasi kelompok, tukar cinderamata, terbang pulang.", time: "10:00", done: false, remind: false },
];

function AgendaPage() {
  const [items, setItems] = useState(INITIAL);
  const toggle = (id: number, key: "done" | "remind") =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [key]: !it[key] } : it)));

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
      <h2 className="mb-1 text-lg font-bold text-primary-800">Itinerary Harian — Sakura Exchange</h2>
      <p className="mb-5 text-sm font-light text-slate-500">Ketuk lingkaran untuk menandai selesai, bel untuk pengingat.</p>
      <ol className="relative ml-2 flex flex-col gap-5 border-l-2 border-primary-100 pl-6">
        {items.map((it) => (
          <li key={it.id} className="relative">
            <span className={`absolute top-1 -left-[31px] h-4 w-4 rounded-full ring-4 ring-white ${it.done ? "bg-green" : "bg-slate-300"}`} />
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-mono text-xs font-bold text-primary-300">{it.day} • {it.time}</p>
                <p className={`font-bold ${it.done ? "text-slate-400 line-through" : "text-primary-800"}`}>{it.title}</p>
                <p className="text-sm font-light text-slate-500">{it.detail}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggle(it.id, "done")}
                  aria-label="Tandai selesai"
                  className={`rounded-full px-3 py-1 text-xs font-bold ring-1 transition active:scale-95 ${it.done ? "bg-green/15 text-green ring-green/30" : "text-slate-500 ring-slate-200 hover:bg-slate-100"}`}
                >
                  {it.done ? "Selesai" : "Tandai"}
                </button>
                <button
                  onClick={() => toggle(it.id, "remind")}
                  aria-label="Pengingat"
                  className={`rounded-full px-3 py-1 text-xs font-bold ring-1 transition active:scale-95 ${it.remind ? "bg-yellow/20 text-yellow ring-yellow/40" : "text-slate-500 ring-slate-200 hover:bg-slate-100"}`}
                >
                  {it.remind ? "Ingatkan" : "Mati"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
