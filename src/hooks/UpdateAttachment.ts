import api from "@/libs/api";
import { UpdateAttachmentType } from "@/types/tasks/attachment";
import { useMutation } from "@tanstack/react-query";

export default function UpdateAttachment() {
  const { mutate: mutateUpdateAttachment } = useMutation({
    mutationFn: async ({
      attachmentId,
      taskId,
      data,
    }: {
      attachmentId: string;
      taskId: string;
      data: UpdateAttachmentType;
    }) => {
      return await api.put(`/task/${taskId}/attachment/${attachmentId}`, data);
    },
  });
  return { mutateUpdateAttachment };
}
