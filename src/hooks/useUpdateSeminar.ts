import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSeminar } from "../services/api";
import { toast } from "react-toastify";

export const useUpdateSeminar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSeminar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seminars"] });
      toast.success("Семинар успешно обновлён!");
    },
    onError: (error) => {
      toast.error(`Ошибка: ${error.message}`);
    },
  });
};
