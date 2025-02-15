import axios, { AxiosError, AxiosInstance } from "axios";
import { ISeminar } from "../components/SeminarList/types";
import { ICustomError } from "../types";

const BASE_URL = "http://localhost:4000/seminars";

const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (axios.isAxiosError(error)) {
        // Создаем объект ошибки с дополнительной информацией
        const customError: ICustomError = {
          message: "Ошибка сети или сервера",
          status: error.response?.status || 0,
          data: error.response?.data || null,
          isNetworkError: !error.response, // Проверка на сетевую ошибку
          originalError: error, // Исходная ошибка axios
        };
        return Promise.reject(customError); // Возвращаем объект ошибки
      }

      // Бросаем неизвестную ошибку
      return Promise.reject({ message: "Произошла неизвестная ошибка" });
    }
  );

  return instance;
};

export const apiClient = createApiClient();

// Получение списка семинаров
export const getSeminars = async (): Promise<ISeminar[]> => {
  const response = await apiClient.get<ISeminar[]>("/");
  return response.data;
};

// Обновление семинара
export const updateSeminar = async (seminar: ISeminar): Promise<ISeminar> => {
  const response = await apiClient.put<ISeminar>(`/${seminar.id}`, seminar);
  return response.data;
};

// Удаление семинара
export const deleteSeminar = async (id: number): Promise<void> => {
  await apiClient.delete(`/${id}`);
};
