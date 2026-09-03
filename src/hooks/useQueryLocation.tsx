import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const useQueryLocation = () => {
  const {
    data: locations,
    error,
    isLoading,
  } = useQuery({ queryKey: ["Locations"], queryFn: api.getLocations });

  return {
    locations,
    error,
    isLoading,
  };
};

export default useQueryLocation;
