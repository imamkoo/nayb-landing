import React from "react";
import { type Testimonial } from "../../utils/contentTypes";

interface TestimonialProps {
  testimonial: Testimonial;
}

const Testimonial: React.FC<TestimonialProps> = ({ testimonial }) => {
  return (
    <li className="relative flex h-full flex-col rounded-2xl bg-white p-8 shadow-[0_2px_24px_rgba(64,25,95,0.08)]">
      <img
        className="h-16 w-16 rounded-full object-cover bg-slate-100 mb-5"
        src={testimonial.img}
        alt={testimonial.alt}
      />
      <p className="text-sm leading-relaxed text-slate-600 font-light flex-1 mb-6">
        {testimonial.description}
      </p>
      <p className="text-primary-800 font-semibold text-sm">
        {testimonial.name} /
        <span className="font-light text-slate-500">{testimonial.vacation}</span>
      </p>
    </li>
  );
};

export default Testimonial;
