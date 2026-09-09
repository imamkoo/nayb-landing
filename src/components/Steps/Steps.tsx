import React from "react";
import { motion } from "motion/react";
import swimmingDudes from "../../../public/swimmingDudes.webp";
import { steps } from "../../utils/content";
import Rating from "./Rating";
import { Button } from "../ui/button";

const Steps: React.FC = () => {
  return (
    <section id="program" className="scroll-mt-24 py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOutExpo" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-800 mb-4 tracking-tight">
            Learn Across the Globe
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-light">
            Study globally and grow through unforgettable adventures
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
          <div className="w-full lg:w-auto">
            <ul className="mb-10 flex flex-col gap-8">
              {steps.map((step, i) => (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOutExpo" }}
                  className="flex flex-col gap-3"
                >
                  <p className="bg-primary-700 text-white w-min rounded-lg px-3 py-0.5 text-sm font-semibold">
                    {String(step.id).padStart(2, '0')}
                  </p>
                  <h3 className="text-xl font-semibold text-primary-800">
                    {step.heading}
                  </h3>
                  <p className="text-sm text-slate-500 font-light leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </motion.li>
              ))}
            </ul>
            <a
              href="#ExploreMore"
            >
              <Button className="shadow-lg shadow-primary-700/20">Start your explore</Button>
            </a>
          </div>

          <figure className="relative w-full lg:w-auto lg:shrink-0">
            <img
              src={swimmingDudes}
              alt="A photo of two men swimming"
              className="w-full max-w-lg lg:max-w-xl rounded-3xl shadow-xl mx-auto"
            />
            <Rating
              name="Tiffany Miller"
              rating={4.6}
              img="/headshots/tiffany.webp"
              className="absolute -top-4 -left-4 max-sm:hidden"
            />
            <Rating
              name="Amari Reece"
              rating={4.9}
              img="/headshots/amari.webp"
              className="absolute -bottom-4 -right-4 max-sm:hidden"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Steps;
