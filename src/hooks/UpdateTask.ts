import api from "@/libs/api";
import { UpdateTaskData } from "@/types/tasks/editTask";
import { useMutation } from "@tanstack/react-query";

export default function UpdateTask() {
  const { mutate: mutateUpdatTask, isPending } = useMutation({
    mutationFn: ({
      taskId,
      taskData,
    }: {
      taskId: string;
      taskData: UpdateTaskData;
    }) => {
      return api.put(`/task/${taskId}`, taskData, { toastify: true });
    },
  });
  return { mutateUpdatTask, isPending };
}
