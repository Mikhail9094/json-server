import { useQuery } from "@tanstack/react-query";
import { getSeminars } from "../services/api";

export const useSeminarsQuery = () => {
  return useQuery({
    queryFn: getSeminars,
    queryKey: ["seminars"],
  });
};
