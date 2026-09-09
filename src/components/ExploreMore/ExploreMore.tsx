import React, { useState } from "react";
import { motion } from "motion/react";
import useQueryLocations from "../../hooks/useQueryLocation";
import { LOCATION_CARDS_SHOWN } from "../../utils/constants";
import Error from "../Error";
import CaretUp from "../Icons/CaretUp";
import Loader from "../Loader";
import LocationCard from "./LocationCard";

const ExploreMore: React.FC = () => {
  const { locations, error, isLoading } = useQueryLocations();

  const [currIndex, setCurrIndex] = useState<number>(0);

  const totalLocations = locations?.length || 0;
  const renderedLocations = locations?.slice(
    currIndex,
    currIndex + LOCATION_CARDS_SHOWN
  );

  const handleRightClick = () => setCurrIndex((prevIndex) => prevIndex + 1);
  const handleLeftClick = () => setCurrIndex((prevIndex) => prevIndex - 1);

  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8" id="ExploreMore">
      <span id="destinasi" className="block h-0 scroll-mt-24" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOutExpo" }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-800 mb-3 tracking-tight">
              Start Your Global Quest
            </h2>
            <p className="text-base sm:text-lg text-slate-500 font-light">
              Study abroad and make new friends
            </p>
          </motion.div>
          <div className="flex gap-4">
            <button
              className="bg-slate-200 hover:bg-slate-300 flex h-12 w-12 cursor-pointer place-content-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="arrow left"
              onClick={handleLeftClick}
              disabled={currIndex === 0}
            >
              <CaretUp className="w-4 -rotate-90 fill-white mt-4" />
            </button>
            <button
              className="bg-primary-700 hover:bg-primary-800 flex h-12 w-12 cursor-pointer place-content-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="arrow right"
              onClick={handleRightClick}
              disabled={currIndex >= totalLocations - 6}
            >
              <CaretUp className="w-4 rotate-90 fill-white mt-4" />
            </button>
          </div>
        </div>
        {isLoading && !error && <Loader />}
        {!isLoading && !error && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {renderedLocations?.map((location) => (
              <LocationCard location={location} key={location.id} />
            ))}
          </ul>
        )}
        {!isLoading && error && (
          <Error>
            It looks like something went wrong while loading our travel
            locations.
          </Error>
        )}
      </div>
    </section>
  );
};

export default ExploreMore;
