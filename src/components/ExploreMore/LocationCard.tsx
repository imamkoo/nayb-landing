import { motion } from "motion/react";
import React from "react";
import { Location } from "../../utils/contentTypes";
import { Location as LocationIcon } from "../Icons/Location";
import Star from "../Icons/Star";

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <motion.li
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOutExpo" }}
    >
      <div className="relative mb-4 overflow-hidden rounded-2xl aspect-[4/3]">
        <img
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          src={location.img}
          alt={location.alt}
        />
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/85 backdrop-blur px-3 py-1.5 rounded-full">
          <Star className="fill-yellow w-4 h-4" />
          <p className="text-sm font-semibold text-slate-700">
            {location.rating}
          </p>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-lg font-semibold text-primary-800 mb-1">
            {location.title}
          </p>
          <div className="flex items-center">
            <LocationIcon className="w-4 h-4 mr-1.5 text-slate-400" />
            <p className="text-sm text-slate-500">{location.location}</p>
          </div>
        </div>
        <p className="text-lg font-semibold text-primary-700">
          ${location.pricePerPerson}/
          <span className="text-xs font-normal text-slate-500">Pax</span>
        </p>
      </div>
    </motion.li>
  );
};

export default LocationCard;
