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
const buttonState: Record<FS["currentState"], string> = { idle: "bg-primary-700 text-white hover:bg-primary-800", pending: "bg-primary-700/60 text-white", success: "bg-green text-white", error: "bg-red text-white" };

const ProposalSection: React.FC = () => {
  const { lang } = useLanguage();
  const [formState, setFormState] = useState<FS>({ currentState: "idle", errorMessage: null });
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const { values, handleChange, isValid, resetForm } = useFormAndValidation({ emailAddress: "", fullName: "", message: "" });
  const mutation = useInsertLead({
    onSuccess: () => { resetForm(); setSelected(""); setChecked(false); setFormState({ currentState: "success", errorMessage: null }); setTimeout(() => setFormState({ currentState: "idle", errorMessage: null }), FORM_STATE_DURATION); },
    onError: (error) => { setFormState({ currentState: "error", errorMessage: error.message }); setTimeout(() => setFormState({ currentState: "idle", errorMessage: null }), FORM_STATE_DURATION); },
  });
  const isSpecial = selected === dict.proposal.special[lang];
  const submit = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!selected || !checked || !isValid) return;
    if (isSpecial && !values.message?.trim()) return;
    const detail = values.message?.trim() ? ` — ${values.message.trim()}` : "";
    mutation.mutate({ createdAt: new Date().toISOString(), fullName: `${values.fullName} — ${selected}${detail}`, emailAddress: values.emailAddress });
  };
  const options = ["Pertukaran Pelajar", "School Immersion", "Study Tour", dict.proposal.special[lang]];

  return (
    <section id="proposal" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto grid max-w-[100rem] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-4">{dict.proposal.eyebrow[lang]}</p>
          <h2 className="display text-5xl text-primary-800 sm:text-6xl">{dict.proposal.title[lang]}</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-primary-800/60">{dict.proposal.sub[lang]}</p>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {options.map((option) => <button key={option} type="button" onClick={() => setSelected(option)} className={`rounded-full border px-5 py-3.5 text-left font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition ${selected === option ? "border-primary-700 bg-primary-700 text-white" : "border-primary-800/15 bg-white text-primary-800/60 hover:border-primary-300 hover:text-primary-800"}`}>{option}</button>)}
          </div>
          <AnimatePresence>
            {selected && (
              <motion.form initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-7 space-y-5 rounded-lg border border-primary-800/10 bg-white p-7 shadow-[0_18px_50px_rgba(64,25,95,0.08)] sm:p-9">
                {selected === dict.proposal.special[lang] && <p className="rounded-md bg-primary-100 px-4 py-3 text-sm text-primary-700">{dict.proposal.specialHint[lang]}</p>}
                <div><label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary-800/60">{lang === "id" ? "Nama Lengkap" : "Full Name"}</label><input required type="text" name="fullName" value={values.fullName} onChange={handleChange} placeholder={lang === "id" ? "Nama Anda" : "Your name"} className="w-full rounded-md border border-primary-800/15 bg-white px-4 py-3.5 text-sm text-primary-800 focus:border-primary-300 focus:outline-none" /></div>
                <div><label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary-800/60">Email</label><input required type="email" name="emailAddress" value={values.emailAddress} onChange={handleChange} placeholder="email@sekolah.sch.id" className="w-full rounded-md border border-primary-800/15 bg-white px-4 py-3.5 text-sm text-primary-800 focus:border-primary-300 focus:outline-none" /></div>
                <div>
                  <label htmlFor="proposal-message" className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary-800/60">
                    {dict.proposal.messageLabel[lang]}{isSpecial ? " *" : ""}
                  </label>
                  <textarea
                    id="proposal-message"
                    name="message"
                    value={values.message ?? ""}
                    onChange={handleChange}
                    required={isSpecial}
                    minLength={isSpecial ? 10 : undefined}
                    rows={4}
                    placeholder={dict.proposal.messagePlaceholder[lang]}
                    className="w-full resize-y rounded-md border border-primary-800/15 bg-white px-4 py-3.5 text-sm text-primary-800 placeholder:text-primary-800/35 focus:border-primary-300 focus:outline-none"
                  />
                </div>
                <button type="button" onClick={() => setChecked((value) => !value)} className="flex items-center gap-3 text-left text-xs text-primary-800/60"><span className={`flex h-5 w-5 items-center justify-center rounded border ${checked ? "border-primary-700 bg-primary-700 text-white" : "border-primary-800/25 bg-white"}`}><Checkmark className="h-3 w-3 fill-current" /></span>{lang === "id" ? "Setuju dihubungi melalui email" : "Agree to be contacted by email"}</button>
                <Button type="submit" onClick={submit} disabled={formState.currentState !== "idle"} className={`w-full rounded-full py-4 text-xs font-bold uppercase tracking-[0.14em] ${buttonState[formState.currentState]}`}>{formState.currentState === "idle" ? (lang === "id" ? "Kirim Permintaan" : "Send Request") : formState.currentState === "pending" ? "…" : formState.currentState === "success" ? "✓ Terkirim" : lang === "id" ? "Gagal — coba lagi" : "Failed — retry"}</Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProposalSection;
