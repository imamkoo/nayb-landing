import { AnimatePresence, motion } from "motion/react";
import React, { MouseEvent, useState } from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";
import useInsertLead from "../hooks/useInsertLead";
import { FORM_STATE_DURATION } from "../utils/constants";
import Checkmark from "./Icons/Checkmark";

interface FormState {
  currentState: "idle" | "pending" | "error" | "success";
  errorMessage: string | null;
}

const buttonStateClasses = {
  idle: "bg-primary-700 opacity-100",
  pending: "bg-primary-700 opacity-50",
  success: "bg-green opacity-100",
  error: "bg-red opacity-100",
};

const FrequentTravelers: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    currentState: "idle",
    errorMessage: null,
  });

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation({
      emailAddress: "",
      fullName: "",
    });

  const mutation = useInsertLead({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (isChecked && isValid) {
      // we are now entering a pending state..
      setFormState({ currentState: "pending", errorMessage: null });

      // lets attempt to insert lead data
      mutation.mutate({
        createdAt: new Date().toISOString(),
        fullName: values.fullName,
        emailAddress: values.emailAddress,
      });
    }
  }

  function handleSuccess() {
    resetForm();
    setIsChecked(false);
    setFormState({ currentState: "success", errorMessage: null });

    // Tell the browser to run this function after 1250 ms, reset form state
    setTimeout(
      () => setFormState({ currentState: "idle", errorMessage: null }),
      FORM_STATE_DURATION
    );
  }

  function handleError(error: Error) {
    setFormState({ currentState: "error", errorMessage: error.message });

    setTimeout(
      () => setFormState({ currentState: "idle", errorMessage: null }),
      FORM_STATE_DURATION
    );
  }

  return (
    <section className="bg-primary-100 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-12 border-y border-slate-200/60 py-14 lg:flex-row lg:gap-16">
        <div className="w-full text-center lg:w-2/5 lg:text-left">
          <h3 className="text-2xl font-bold text-primary-800 mb-4 sm:text-3xl">
            Explore the World, Save More
          </h3>
          <p className="text-sm leading-relaxed text-slate-500">
            Save up to $150 on your study trip! Earn points for free cultural
            events, study bonuses, or extra adventures.
          </p>
        </div>
        <form className="flex w-full flex-col lg:w-3/5">
          <label className="mb-6 block">
            <p className="mb-2 text-sm font-semibold text-primary-800">
              Full Name
            </p>
            <input
              required
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              minLength={2}
              maxLength={50}
              disabled={formState.currentState !== "idle"}
              placeholder="Jane Doe"
              className={`placeholder:text-grey-400 w-full rounded-lg bg-white py-3.5 pl-4 transition-all duration-200 placeholder:font-light focus:outline-1 disabled:opacity-50 max-sm:py-4 max-sm:text-sm ${errors.fullName && "outline-red"}`}
            />
            <AnimatePresence>
              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-red pt-1 pl-0.5 text-sm"
                >
                  {errors.fullName}
                </motion.p>
              )}
            </AnimatePresence>
          </label>
          <label className="mb-8 block">
            <p className="mb-2 text-sm font-semibold text-primary-800">
              Email
            </p>
            <input
              required
              type="email"
              name="emailAddress"
              value={values.emailAddress}
              onChange={handleChange}
              minLength={3}
              maxLength={50}
              disabled={formState.currentState !== "idle"}
              placeholder="janedoe@gmail.com"
              className={`placeholder:text-grey-400 w-full rounded-lg bg-white py-3.5 pl-4 transition-all duration-200 not-hover:transition-none placeholder:font-light focus:outline-1 disabled:opacity-50 max-sm:py-4 max-sm:text-sm ${errors.emailAddress && "outline-red"}`}
            />
            <AnimatePresence>
              {errors.emailAddress && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-red pt-1 pl-0.5 text-sm"
                >
                  {errors.emailAddress}
                </motion.p>
              )}
            </AnimatePresence>
          </label>
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-8">
            <label className="text-grey-800 flex cursor-pointer items-center gap-x-1.5">
              <button
                className="flex size-5 cursor-pointer items-center justify-center rounded-xs bg-white p-1 disabled:opacity-50 max-xl:size-4.5"
                type="button"
                onClick={() => setIsChecked((c) => !c)}
                disabled={formState.currentState === "pending"}
              >
                <Checkmark
                  className={`transition-all duration-200 ${isChecked ? "visible size-3 opacity-100" : "invisible size-2 opacity-0"}`}
                />
              </button>
              <p className="text-sm tracking-[.03rem] max-xl:text-xs">
                Agree to receive promotional email updates
              </p>
            </label>
            <motion.button
              onClick={handleSubmit}
              disabled={formState.currentState !== "idle"}
              whileTap={{ scale: 0.98 }}
              className={`cursor-pointer rounded-full px-8 py-3 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed ${buttonStateClasses[formState.currentState]}`}
            >
              {formState.currentState === "idle" && "Apply Now"}
              {formState.currentState === "pending" && "Submitting..."}
              {formState.currentState === "error" && "Submission Failed"}
              {formState.currentState === "success" && "Success!"}
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FrequentTravelers;
