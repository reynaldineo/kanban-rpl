import api from "@/libs/api";
import { Attachment } from "@/types/tasks/attachment";
import { useMutation } from "@tanstack/react-query";

export default function AddAttachment() {
  const { mutateAsync: mutateAddAttachment, isPending } = useMutation({
    mutationFn: ({ data, taskId }: { data: Attachment[]; taskId: string }) => {
      const attachData = [data];
      return api.post(`task/${taskId}/attachment`, attachData, {
        toastify: true,
      });
    },
  });
  return { mutateAddAttachment, isPending };
}
