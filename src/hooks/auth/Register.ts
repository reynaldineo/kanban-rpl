import api from "@/libs/api";
import { LoginType } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export default function Register() {
  const {
    mutate: mutateRegister,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (registerData: LoginType) => {
      return api.post("/user", registerData, { toastify: true });
    },
  });
  return { mutateRegister, isPending, isSuccess };
}
