import { AxiosError } from "axios";

export interface ICustomError {
  message: string;
  status: number;
  data: unknown;
  isNetworkError: boolean;
  originalError: AxiosError;
}
