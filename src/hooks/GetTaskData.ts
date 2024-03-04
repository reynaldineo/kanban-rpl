import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../types/api";
import api from "@/libs/api";
import { TaskData } from "@/types/tasks/task";

export default function GetTaskData() {
  const {
    data: taskData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["/task"],
    queryFn: () => {
      return api.get<ApiResponse<TaskData>>("/task");
    },
  });
  return { taskData, isLoading, refetch };
}
