import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/portal")({
  component: PortalLayout,
  beforeLoad: () => ({
    getTitle: () => "NayBe | Portal Edutour",
  }),
});

export const PORTAL_MODULES = [
  { to: "/portal/dasbor", label: "Dasbor Program" },
  { to: "/portal/rencana", label: "Rencana & Mitra" },
  { to: "/portal/agenda", label: "Agenda Perjalanan" },
  { to: "/portal/peserta", label: "Peserta & Dokumen" },
  { to: "/portal/info", label: "Info & Komunikasi" },
  { to: "/portal/pembayaran", label: "Pembayaran" },
  { to: "/portal/dokumentasi", label: "Dokumentasi & Evaluasi" },
  { to: "/portal/keamanan", label: "Keamanan & Akun" },
];

function PortalLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-1 text-xs font-bold tracking-[0.22em] text-primary-300 uppercase">
            Portal Sekolah
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-primary-800 sm:text-4xl">
            Edutour & Pertukaran Pelajar
          </h1>
          <p className="mt-2 max-w-2xl font-light text-slate-500">
            MVP — kelola program, peserta, agenda, dan dokumentasi dalam satu tempat.
          </p>
        </div>

        {/* Navigasi modul — pills di mobile, sidebar di desktop */}
        <div className="flex flex-col gap-8 lg:flex-row">
          <nav aria-label="Modul portal" className="lg:w-60 lg:shrink-0">
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:flex-col lg:overflow-visible lg:pb-0">
              {PORTAL_MODULES.map((m, i) => {
                const active =
                  pathname === m.to || (m.to === "/portal/dasbor" && pathname === "/portal");
                return (
                  <li key={m.to} className="shrink-0">
                    <Link
                      to={m.to}
                      className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all active:scale-95 ${
                        active
                          ? "bg-primary-700 text-white shadow-lg shadow-primary-700/25"
                          : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-primary-100 hover:text-primary-800"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[11px] ${
                          active ? "bg-white/20" : "bg-primary-100 text-primary-700"
                        }`}
                      >
                        {i + 1}
                      </span>
                      {m.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="min-w-0 flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
