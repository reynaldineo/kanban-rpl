import api from "@/libs/api";
import { setToken } from "@/libs/cookies";
import useAuthStore from "@/stores/useAuthStore";
import { ApiLoginResponse, LoginResponseType, LoginType } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

export default function Login() {
  const { login } = useAuthStore();

  const {
    mutate: mutateLogin,
    isPending,
    isSuccess,
  } = useMutation<AxiosResponse, AxiosError<ApiError>, LoginType>({
    mutationFn: async (data: LoginType) => {
      const res = await api.post<ApiLoginResponse<LoginResponseType>>(
        "/user/login",
        data,
        { toastify: true }
      );
      const { accessToken } = res.data;
      setToken(accessToken);

      // const user = await api.get<ApiResponse<User>>("/user");
      // if (user)
      login({ ...res.data.data });

      return res;
    },
  });
  return { mutateLogin, isPending, isSuccess };
}
