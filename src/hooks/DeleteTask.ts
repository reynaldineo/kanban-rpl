import api from "@/libs/api";
import { useMutation } from "@tanstack/react-query";

export default function DeleteTask() {
  const { mutateAsync: mutateDeletTask, isPending } = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`/task/${id}`, { toastify: true });
    },
  });
  return { mutateDeletTask, isPending };
}
