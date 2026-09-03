import { motion } from "motion/react";
import React from "react";
import { type BlogPost } from "../../utils/contentTypes";
import formatDate from "../../utils/formatDate";
import { Button } from "../ui/button";

const BlogPost: React.FC<BlogPost> = ({ img, alt, date, summary, title }) => {
  const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);

  return (
    <motion.li
      className="group flex cursor-pointer flex-col gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 20 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="overflow-hidden rounded-2xl sm:w-2/5 shrink-0">
        <img
          src={img}
          alt={alt}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="sm:w-3/5">
        <p className="text-sm font-medium text-primary-300 mb-2">
          {formatDate(date)}
        </p>
        <h4 className="text-2xl font-semibold text-primary-800 mb-3 sm:text-3xl">
          {title}
        </h4>
        <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">
          {summary}
        </p>
        <Button variant="outline" size="sm" className="border-primary-800/15 text-primary-800 hover:bg-primary-100 font-medium">
          View More
        </Button>
      </div>
    </motion.li>
  );
};

export default BlogPost;
