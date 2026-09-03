import React from "react";
import { motion } from "motion/react";
import useQueryBlogPosts from "../../hooks/useQueryBlogPosts";
import Error from "../Error";
import Loader from "../Loader";
import BlogPost from "./BlogPost";

const News: React.FC = () => {
  const { blogPosts, error, isLoading } = useQueryBlogPosts();

  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOutExpo" }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-800 mb-14 sm:mb-20 text-center tracking-tight"
        >
          Discover Our New Adventures
        </motion.h2>
        {isLoading && !error && <Loader />}

        {!isLoading && !error && (
          <ul className="flex flex-col gap-12 sm:gap-16">
            {blogPosts?.map((news) => <BlogPost {...news} key={news.id} />)}
          </ul>
        )}

        {!isLoading && error && (
          <Error>
            It looks like something went wrong while loading our recent news.
          </Error>
        )}
      </div>
    </section>
  );
};

export default News;
