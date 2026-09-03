import React from "react";
import { motion } from "motion/react";
import { services } from "../../utils/content";
import { type Service as IService } from "../../utils/contentTypes";
import Service from "./Service";

const CustomizedPackages: IService = services.at(0)!;
const CulinaryTours: IService = services.at(1)!;
const DestinationExpertise: IService = services.at(2)!;

const Services: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-primary-100">
      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOutExpo" }}
        className="mx-auto max-w-7xl flex flex-col sm:flex-row items-stretch justify-between gap-8 sm:gap-0 border-t border-slate-200/50"
      >
        <Service service={CustomizedPackages} />
        <li className="hidden sm:block w-px bg-slate-200/50 self-stretch" aria-label="divider" />
        <Service service={CulinaryTours} />
        <li className="hidden sm:block w-px bg-slate-200/50 self-stretch" aria-label="divider" />
        <Service service={DestinationExpertise} />
      </motion.ul>
    </section>
  );
};

export default Services;
