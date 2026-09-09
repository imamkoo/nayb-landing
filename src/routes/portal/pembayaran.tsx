import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/portal/pembayaran")({
  component: PembayaranPage,
});

const BREAKDOWN = [
  { item: "Tiket pesawat PP + bagasi", cost: 6_500_000 },
  { item: "Homestay & makan 7 hari", cost: 3_200_000 },
  { item: "Program sekolah mitra", cost: 2_800_000 },
  { item: "Visa, asuransi & handling", cost: 1_500_000 },
];

const BILLS = [
  { name: "Aisyah Putri", paid: 12_000_000, total: 14_000_000 },
  { name: "Bima Aditya", paid: 14_000_000, total: 14_000_000 },
  { name: "Citra Lestari", paid: 7_000_000, total: 14_000_000 },
  { name: "Dimas Prasetyo", paid: 0, total: 14_000_000 },
];

const rupiah = (n: number) => `Rp${n.toLocaleString("id-ID")}`;

function PembayaranPage() {
  const totalCost = BREAKDOWN.reduce((s, b) => s + b.cost, 0);

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <h2 className="mb-4 text-lg font-bold text-primary-800">Rincian Biaya — per peserta</h2>
        <ul className="flex flex-col gap-2">
          {BREAKDOWN.map((b) => (
            <li key={b.item} className="flex items-center justify-between gap-3 rounded-xl bg-[#fbf8fc] px-4 py-3 ring-1 ring-slate-100">
              <p className="text-sm font-medium text-slate-600">{b.item}</p>
              <p className="font-mono text-sm font-bold text-primary-800">{rupiah(b.cost)}</p>
            </li>
          ))}
          <li className="flex items-center justify-between gap-3 rounded-xl bg-primary-800 px-4 py-3 text-white">
            <p className="text-sm font-bold">Total</p>
            <p className="font-mono text-sm font-bold">{rupiah(totalCost)}</p>
          </li>
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <h2 className="mb-4 text-lg font-bold text-primary-800">Tagihan per Peserta</h2>
        <ul className="flex flex-col gap-3">
          {BILLS.map((b) => {
            const pct = Math.round((b.paid / b.total) * 100);
            const lunas = pct === 100;
            return (
              <li key={b.name} className="rounded-xl bg-[#fbf8fc] p-4 ring-1 ring-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-primary-800">{b.name}</p>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${lunas ? "bg-green/15 text-green" : pct === 0 ? "bg-red/10 text-red" : "bg-yellow/20 text-yellow"}`}>
                    {lunas ? "Lunas" : pct === 0 ? "Belum bayar — ingatkan" : `${pct}% terbayar`}
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div className={`h-full rounded-full ${lunas ? "bg-green" : "bg-gradient-to-r from-primary-700 to-primary-300"}`} style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-1 font-mono text-xs text-slate-500">{rupiah(b.paid)} / {rupiah(b.total)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
