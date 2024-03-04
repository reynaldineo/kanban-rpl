import axios, { AxiosError, AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";
import { toast } from "sonner";

import { ApiError, ApiResponse } from "@/types/api";

const isServer = typeof window === "undefined";
let context: GetServerSidePropsContext | undefined;
let toastId: string | number;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  timeout: 120000,
  timeoutErrorMessage: "No internet connection",
});
const token = process.env.NEXT_PUBLIC_TOKEN_SECRET;

api.interceptors.request.use((config) => {
  if (!config.headers) return config;

  if (!isServer && config.toastify) {
    toastId = toast.loading(config.loadingMessage || "Loading...");
  }

  config.headers.setAuthorization(token ? `Bearer ${token}` : "");

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    const { en: message } = response.data.resultMessage;
    const toastMessage =
      message.charAt(0).toUpperCase() + message.slice(1) + ".";

    if (!isServer && response.config.toastify) {
      toast.success(toastMessage, { id: toastId });
    }

    return response;
  },
  (error: AxiosError<ApiError>) => {
    const response = error.response;
    const message =
      response?.data.response?.data.resultMessage.en || error.message;
    const toastMessage =
      message.charAt(0).toUpperCase() + message.slice(1) + ".";

    if (!isServer && error.config?.toastify) {
      toast.error(toastMessage, { id: toastId });
    }

    return Promise.reject({ ...error });
  }
);

export const setApiContext = (ctx: GetServerSidePropsContext) => {
  context = ctx;
};

export default api;
