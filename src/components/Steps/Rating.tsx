import { motion, useInView } from "motion/react";
import { animate } from "animejs";
import React, { useEffect, useRef } from "react";
import Star from "../Icons/Star";

interface StepsProps {
  name: string;
  rating: number;
  img: string;
  className: string;
}

const Rating: React.FC<StepsProps> = ({ name, rating, img, className }) => {
  const [count, setCount] = React.useState<number>(0);

  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (!inView) {
      return;
    }

    // animejs numeric tween: smooth eased count-up instead of stepped interval
    const counter = { value: 0 };
    const tween = animate(counter, {
      value: rating,
      duration: 1200,
      ease: "outExpo",
      onUpdate: () => setCount(counter.value),
    });
    return () => {
      tween.revert();
    };
  }, [rating, inView]);

  return (
    <motion.div
      className={`absolute flex items-center gap-2.5 rounded-full bg-white/90 py-2.5 pr-5 pl-3 shadow-[0_4px_30px_rgba(64,25,95,0.15)] backdrop-blur ${className}`}
      ref={ref}
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex h-11 w-11 items-end justify-center overflow-hidden rounded-full bg-slate-200">
        <img
          src={img}
          alt="Graphic of person rating photo"
          className="h-10 w-10"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-primary-800">{name}</p>
        <div className="flex items-center">
          <Star className="fill-yellow mr-1.5 h-4 w-4" />
          <p className="text-xs font-semibold text-slate-600">
            {count.toFixed(1)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Rating;
