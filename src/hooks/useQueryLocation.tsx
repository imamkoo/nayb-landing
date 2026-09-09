import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { locations as fallbackLocations } from "../utils/content";

const useQueryLocation = () => {
  const {
    data: locations,
    error,
    isLoading,
  } = useQuery({ queryKey: ["Locations"], queryFn: async () => {
      try {
        const data = await api.getLocations();
        return data && data.length > 0 ? data : fallbackLocations;
      } catch {
        return fallbackLocations;
      }
    },
    retry: false,
    staleTime: Infinity,
    initialData: fallbackLocations,
  });

  return {
    locations,
    error,
    isLoading,
  };
};

export default useQueryLocation;
