import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import useInsertLead from "../../hooks/useInsertLead";
import { FORM_STATE_DURATION } from "../../utils/constants";
import { Button } from "../ui/button";
import Checkmark from "../Icons/Checkmark";

interface FS { currentState: "idle" | "pending" | "error" | "success"; errorMessage: string | null }
const bs = { idle: "bg-[#40195f]", pending: "bg-[#40195f] opacity-60", success: "bg-green", error: "bg-red" };

const ProposalSection: React.FC = () => {
  const { lang } = useLanguage();
  const [fs, setFs] = useState<FS>({ currentState: "idle", errorMessage: null });
  const [sel, setSel] = useState("");
  const [ck, setCk] = useState(false);
  const { values, handleChange, isValid, resetForm } = useFormAndValidation({ emailAddress: "", fullName: "" });
  const mut = useInsertLead({
    onSuccess: () => { resetForm(); setSel(""); setCk(false); setFs({ currentState: "success", errorMessage: null }); setTimeout(() => setFs({ currentState: "idle", errorMessage: null }), FORM_STATE_DURATION); },
    onError: (e) => { setFs({ currentState: "error", errorMessage: e.message }); setTimeout(() => setFs({ currentState: "idle", errorMessage: null }), FORM_STATE_DURATION); },
  });
  const submit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!sel) return;
    if (ck && isValid) mut.mutate({ createdAt: new Date().toISOString(), fullName: `${values.fullName} — ${sel}`, emailAddress: values.emailAddress });
  };
  const options = [
    { v: "student-exchange", l: "Student Exchange / Pertukaran Pelajar" },
    { v: "school-immersion", l: "School Immersion" },
    { v: "study-tour", l: "Study Tour" },
    { v: "special", l: dict.proposal.special[lang] },
  ];

  return (
    <section id="proposal" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-gradient-to-b from-[#fff1f7] to-white">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c73884] mb-2">{dict.proposal.eyebrow[lang]}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2b103f] tracking-tight">{dict.proposal.title[lang]}</h2>
          <p className="text-slate-600 mt-3 max-w-xl mx-auto">{dict.proposal.sub[lang]}</p>
        </div>
        {/* Pill selector */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-8">
          {options.map((o) => (
            <button key={o.v} onClick={() => setSel(o.v)} className={`rounded-full px-4 py-3 text-xs font-semibold uppercase tracking-wide border transition-colors ${sel === o.v ? "bg-[#40195f] text-white border-[#40195f]" : "bg-white text-slate-600 border-[#40195f]/15 hover:border-[#40195f]/40"}`}>
              {o.l}
            </button>
          ))}
        </div>
        <AnimatePresence>
          {sel && (
            <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="rounded-2xl bg-white border border-[#40195f]/10 p-6 shadow-sm space-y-5">
              {sel === "special" && <p className="text-sm text-slate-500 italic">{dict.proposal.specialHint[lang]}</p>}
              <div>
                <label className="text-sm font-semibold text-[#2b103f] block mb-2">{lang === "id" ? "Nama Lengkap" : "Full Name"}</label>
                <input required type="text" name="fullName" value={values.fullName} onChange={handleChange} placeholder="Nama / School Name" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-[#40195f]" />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#2b103f] block mb-2">Email</label>
                <input required type="email" name="emailAddress" value={values.emailAddress} onChange={handleChange} placeholder="email@sekolah.sch.id" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-[#40195f]" />
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setCk((c) => !c)} className="flex h-5 w-5 items-center justify-center rounded-xs border border-slate-300 bg-white"><Checkmark className={`transition-all text-xs ${ck ? "opacity-100" : "opacity-0"}`} /></button>
                <p className="text-xs text-slate-500">{lang === "id" ? "Setuju hubungi via email" : "Agree to be contacted via email"}</p>
              </div>
              <Button type="submit" onClick={submit} disabled={fs.currentState !== "idle"} className={`w-full rounded-full py-4 text-sm font-bold text-white ${bs[fs.currentState]}`}>
                {fs.currentState === "idle" && (lang === "id" ? "Kirim Permintaan" : "Send Request")}
                {fs.currentState === "pending" && "..."}
                {fs.currentState === "error" && (lang === "id" ? "Gagal — coba lagi" : "Failed — try again")}
                {fs.currentState === "success" && (lang === "id" ? "Terkirim ✓" : "Sent ✓")}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProposalSection;