import React from "react";
import { motion } from "motion/react";
import { testimonials } from "../../utils/content";
import Testimonial from "./Testimonial";

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-primary-100">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOutExpo" }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-800 mb-12 sm:mb-16 text-center tracking-tight"
        >
          Students Share Their Dreams
        </motion.h2>
        <ul className="flex flex-col sm:flex-row gap-8 sm:gap-12">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOutExpo" }}
              className="flex-1"
            >
              <Testimonial testimonial={testimonial} />
            </motion.div>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials;
