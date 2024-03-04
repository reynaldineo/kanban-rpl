import api from "@/libs/api";
import { useMutation } from "@tanstack/react-query";

export default function DeleteTask() {
  const { mutate: mutateDeletTask } = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`/task/${id}`);
    },
  });
  return { mutateDeletTask };
}
