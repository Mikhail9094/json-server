import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteSeminar } from "../services/api";
import { ICustomError } from "../types";

export const useDeleteSeminar = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ICustomError, number>({
    mutationFn: deleteSeminar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seminars"] });
      toast.success("Семинар успешно удален!");
    },
    onError: (error) => {
      if (error.isNetworkError) {
        toast.error("Ошибка соединения. Проверьте интернет.");
      } else if (error.status === 404) {
        toast.warn("Семинар не найден! Возможно, он уже был удален.");
      } else {
        toast.error(`Ошибка (код: ${error.status}): ${error.message}`);
      }
    },
  });
};
