import api from "@/libs/api";
import { setToken } from "@/libs/cookies";
import useAuthStore from "@/stores/useAuthStore";
import {
  LoginType,
  ApiLoginResponse,
  LoginResponseType,
} from "@/types/auth/login";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

export default function Login() {
  const { login } = useAuthStore();
  const router = useRouter();

  const { mutate: mutateLogin, isPending } = useMutation<
    AxiosResponse,
    AxiosError<ApiError>,
    LoginType
  >({
    mutationFn: async (data: LoginType) => {
      const res = await api.post<ApiLoginResponse<LoginResponseType>>(
        "/user/login",
        data,
        { toastify: true }
      );
      const { accessToken } = res.data;
      setToken(accessToken);

      if (res) login({ ...res.data.data.user, accessToken });

      return res;
    },
    onSuccess: () => {
      router.push("/board");
    },
  });
  return { mutateLogin, isPending };
}
