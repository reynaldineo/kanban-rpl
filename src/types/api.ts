import "axios";

import { AxiosError } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    toastify?: boolean;
    loadingMessage?: string;
  }
}

export type ResultMessage = {
  en: string;
};

export type ApiResponse<T = undefined> = {
  resultMessage: ResultMessage;
  resultCode: string;
  data: T;
};

export type ApiError = AxiosError<{
  resultMessage: ResultMessage;
  resultCode: string;
}>;
