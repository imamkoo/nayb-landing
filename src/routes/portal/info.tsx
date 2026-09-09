import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/portal/info")({
  component: InfoPage,
});

const ANNOUNCEMENTS = [
  { date: "9 Sep 2026", title: "Briefing pra-keberangkatan Sakura Exchange", body: "Wajib hadir: seluruh peserta + 1 orang tua. Aula SMA 1, 09:00." },
  { date: "5 Sep 2026", title: "Jadwal vaksinasi & medical check-up", body: "Puskesmas Mojoanyar, membawa fotokopi paspor." },
  { date: "1 Sep 2026", title: "Pembagian kelompok & homestay", body: "Daftar kelompok Sakura & Fuji sudah terbit di modul Peserta." },
];

const TEAM = [
  { name: "Bu Ratna", role: "Koordinator Program", contact: "0813-3400-0001" },
  { name: "Pak Dedi", role: "Pendamping Rombongan", contact: "0813-3400-0002" },
  { name: "Tim NayB", role: "Bantuan 24/7", contact: "naybglobal@gmail.com" },
];

function InfoPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl bg-gradient-to-br from-primary-800 to-primary-700 p-5 text-white">
        <p className="mb-1 flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase opacity-80">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green" /> Live Journey
        </p>
        <p className="text-xl font-bold">Rombongan Sakura — transit Singapura</p>
        <p className="mt-1 text-sm font-light opacity-80">Update terakhir 10 menit lalu • 24/24 peserta terpantau • cuaca Osaka cerah 22°C</p>
      </div>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <h2 className="mb-4 text-lg font-bold text-primary-800">Pengumuman</h2>
        <ul className="flex flex-col gap-3">
          {ANNOUNCEMENTS.map((a) => (
            <li key={a.title} className="rounded-xl bg-[#fbf8fc] p-4 ring-1 ring-slate-100">
              <p className="font-mono text-xs font-bold text-primary-300">{a.date}</p>
              <p className="font-bold text-primary-800">{a.title}</p>
              <p className="text-sm font-light text-slate-500">{a.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <h2 className="mb-4 text-lg font-bold text-primary-800">Kontak Tim</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {TEAM.map((t) => (
            <li key={t.name} className="rounded-xl bg-[#fbf8fc] p-4 ring-1 ring-slate-100">
              <p className="font-bold text-primary-800">{t.name}</p>
              <p className="text-xs text-slate-500">{t.role}</p>
              <p className="mt-1 font-mono text-sm text-primary-700">{t.contact}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
