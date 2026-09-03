import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const useQueryBlogPosts = () => {
  const {
    data: blogPosts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: api.getBlogPosts,
  });

  return { blogPosts, error, isLoading };
};

export default useQueryBlogPosts;
