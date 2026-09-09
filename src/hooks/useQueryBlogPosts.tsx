import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { blogPosts as fallbackBlogPosts } from "../utils/content";

const useQueryBlogPosts = () => {
  const {
    data: blogPosts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogPosts"],
    // Publik harus selalu tampil: Supabase gagal/kosong → pakai data lokal
    queryFn: async () => {
      try {
        const data = await api.getBlogPosts();
        return data && data.length > 0 ? data : fallbackBlogPosts;
      } catch {
        return fallbackBlogPosts;
      }
    },
    retry: false,
    staleTime: Infinity,
    initialData: fallbackBlogPosts,
  });

  return { blogPosts, error, isLoading };
};

export default useQueryBlogPosts;
