import api from "@/libs/api";
import { PostTask } from "@/types/tasks/postTask";
import { useMutation } from "@tanstack/react-query";

export default function AddTask() {
  const { mutateAsync: mutateNewTask, isPending } = useMutation({
    mutationFn: (newTask: PostTask) => {
      return api.post("/task", newTask, { toastify: true });
    },
  });
  return { mutateNewTask, isPending };
}
