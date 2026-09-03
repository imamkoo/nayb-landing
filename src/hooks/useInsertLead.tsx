import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
import { Lead } from "../utils/contentTypes";

interface useInsertLeadProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}
const useInsertLead = ({ onError, onSuccess }: useInsertLeadProps) => {
  const mutation = useMutation({
    mutationFn: async (lead: Lead) => api.insertLead(lead),
    onSuccess: onSuccess,
    onError: onError,
  });

  return mutation;
};

export default useInsertLead;
