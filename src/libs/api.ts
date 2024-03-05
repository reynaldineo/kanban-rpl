import axios, { AxiosError, AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";
import { toast } from "sonner";
import Cookies from "universal-cookie";

import { ApiError, ApiResponse } from "@/types/api";

import { getToken } from "@/libs/cookies";

const isServer = typeof window === "undefined";
let context: GetServerSidePropsContext | undefined;
let toastId: string | number;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // headers: {
  //   "Content-Type": "aplication/json",
  // },
  withCredentials: false,
  timeout: 120000,
  timeoutErrorMessage: "No internet connection",
});

api.interceptors.request.use((config) => {
  if (!config.headers) return config;

  let token: string | undefined;

  if (!isServer) token = getToken();
  else {
    if (!context) {
      throw "Api Context not found. You must call `setApiContext(context)` before calling api on server-side!";
    }

    const cookies = new Cookies(context.req?.headers.cookie);
    token = cookies.get("@reynaldineo/token");
  }

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
    const message = response?.data.message || error.message;
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
