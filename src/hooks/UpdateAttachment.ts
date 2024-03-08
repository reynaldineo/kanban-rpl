import api from "@/libs/api";
import { UpdateAttachmentType } from "@/types/tasks/attachment";
import { useMutation } from "@tanstack/react-query";

export default function UpdateAttachment() {
  const { mutateAsync: mutateUpdateAttachment, isPending } = useMutation({
    mutationFn: ({
      attachmentId,
      taskId,
      data,
    }: {
      attachmentId: string;
      taskId: string;
      data: UpdateAttachmentType;
    }) => {
      return api.put(`/task/${taskId}/attachment/${attachmentId}`, data, {
        toastify: true,
      });
    },
  });
  return { mutateUpdateAttachment, isPending };
}
