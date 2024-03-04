import DeleteAttachment from "@/hooks/DeleteAttachment";
import UpdateAttachment from "@/hooks/UpdateAttachment";
import clsxm from "@/libs/clxsm";
import { UpdateAttachmentType } from "@/types/tasks/attachment";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "@/components/Modal";

type ModalReturnType = {
  openModal: () => void;
};

export default function EditAttachmentModal({
  children,
  attachment,
  taskId,
}: {
  children: (props: ModalReturnType) => JSX.Element;
  attachment: UpdateAttachmentType;
  taskId: string;
}) {
  // * ===== Edit Form =====
  const [isEdit, setIsEdit] = React.useState(false);

  // * ===== Modal =====
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => {
      setOpen(true);
      setIsEdit(false);
    },
  };

  // * ===== Form =====
  const { register, handleSubmit } = useForm<UpdateAttachmentType>();

  // * ===== Handle Form =====
  const { mutateUpdateAttachment } = UpdateAttachment();
  const onSubmit: SubmitHandler<UpdateAttachmentType> = (data) => {
    console.log(data);

    mutateUpdateAttachment({ attachmentId: attachment._id, taskId, data });
  };

  const { mutateDeleteAttachment } = DeleteAttachment();
  const handleDelete = (attachmentId: string) => {
    mutateDeleteAttachment({ attachmentId, taskId });
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title="Delete Task">
        <Modal.Section>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-col space-y-4"
          >
            <div>
              <label htmlFor="displayText">Display Text</label>
              <input
                {...register("displayText")}
                id="displayText"
                disabled={!isEdit}
                defaultValue={attachment.displayText}
                className="border px-1 mt-1.5 w-full"
              />
            </div>
            <div>
              <label htmlFor="link">Title</label>
              <input
                {...register("link")}
                id="link"
                disabled={!isEdit}
                defaultValue={attachment.link}
                className="border px-1 mt-1.5 w-full"
              />
            </div>

            <div>
              <button
                onClick={() => {
                  if (!isEdit) setIsEdit(true);
                  else if (isEdit) {
                    setIsEdit(false);
                    setOpen(false);
                  }
                }}
                type="submit"
                className={clsxm(
                  "px-2 py-1 w-full mt-4 rounded-xl text-white",
                  isEdit
                    ? "bg-green-400 hover:bg-green-500"
                    : "bg-blue-400 hover:bg-blue-500"
                )}
              >
                {isEdit ? "Update" : "Edit"}
              </button>
            </div>
          </form>
          <button
            onClick={() => handleDelete(attachment._id)}
            className="mt-2 px-2 py-1 w-full bg-red-500 hover:bg-red-700 rounded-xl text-white"
          >
            Delete
          </button>
        </Modal.Section>
      </Modal>
    </>
  );
}
