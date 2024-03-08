import { ResultMessage } from "../api";

export type LoginType = {
  email: string;
  password: string;
};

export type User = {
  _id: string;
  email: string;
  username: string;
  name: string;
  language: string;
  isVerified: boolean;
};

export type WithToken = {
  accessToken: string;
};

export type LoginResponseType = {
  user: User;
};

export type ApiLoginResponse<T = undefined> = {
  resultMessage: ResultMessage;
  resultCode: string;
  data: T;
  accessToken: string;
  refreshToken: string;
};
