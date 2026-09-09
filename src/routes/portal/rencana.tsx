import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/portal/rencana")({
  component: RencanaPage,
});

const TYPES = [
  { name: "Pertukaran Pelajar", desc: "Tinggal & bersekolah 1–2 minggu di sekolah mitra luar negeri." },
  { name: "School Immersion", desc: "Ikut kelas reguler + homestay bersama keluarga lokal." },
  { name: "Study Tour", desc: "Kunjungan edukasi tematik: sains, sejarah, teknologi." },
  { name: "Language Trip", desc: "Intensif bahasa Inggris/Mandarin/Jepang di negara asal." },
];

const PARTNERS = [
  { school: "Sakura High School", place: "Osaka, Jepang", since: "2023" },
  { school: "Beijing No. 4 School", place: "Beijing, China", since: "2024" },
  { school: "Chiang Mai International", place: "Chiang Mai, Thailand", since: "2024" },
  { school: "Victoria Junior College", place: "Singapura", since: "2025" },
];

function RencanaPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <h2 className="mb-4 text-lg font-bold text-primary-800">Jenis & Tujuan Program</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TYPES.map((t) => (
            <li key={t.name} className="rounded-xl bg-[#fbf8fc] p-4 ring-1 ring-slate-100">
              <p className="font-bold text-primary-800">{t.name}</p>
              <p className="mt-1 text-sm font-light text-slate-500">{t.desc}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary-800">Jaringan Mitra & Destinasi</h2>
          <button className="rounded-full bg-primary-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-primary-800 active:scale-95">
            Buat Proposal
          </button>
        </div>
        <ul className="flex flex-col gap-3">
          {PARTNERS.map((p) => (
            <li key={p.school} className="flex items-center justify-between gap-3 rounded-xl bg-[#fbf8fc] p-4 ring-1 ring-slate-100">
              <div>
                <p className="font-bold text-primary-800">{p.school}</p>
                <p className="text-xs text-slate-500">{p.place} • mitra sejak {p.since}</p>
              </div>
              <span className="rounded-full bg-green/15 px-3 py-1 text-xs font-bold text-green">Aktif</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
