import { ResultMessage } from "./api";

export type LoginType = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  user: {
    _id: string;
    email: string;
    username: string;
    name: string;
    language: string;
    isVerified: boolean;
  };
};

export type ApiLoginResponse<T = undefined> = {
  resultMessage: ResultMessage;
  resultCode: string;
  data: T;
  accessToken: string;
  refreshToken: string;
};

export type RegisterType = {
  username: string;
  name: string;
  email: string;
  password: string;
  language: string;
};
