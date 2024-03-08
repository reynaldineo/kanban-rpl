import { useMutation } from "@tanstack/react-query";
import api from "@/libs/api";

export default function DeleteAttachment() {
  const { mutateAsync: mutateDeleteAttachment, isPending } = useMutation({
    mutationFn: ({
      attachmentId,
      taskId,
    }: {
      attachmentId: string;
      taskId: string;
    }) => {
      return api.delete(`/task/${taskId}/attachment/${attachmentId}`, {
        toastify: true,
      });
    },
  });
  return { mutateDeleteAttachment, isPending };
}
