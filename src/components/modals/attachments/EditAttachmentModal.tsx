import DeleteAttachment from "@/hooks/DeleteAttachment";
import UpdateAttachment from "@/hooks/UpdateAttachment";
import { UpdateAttachmentType } from "@/types/tasks/attachment";
import React, { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Modal from "@/components/Modal";
import GetTaskData from "@/hooks/GetTaskData";
import clsx from "clsx";
import Input from "../../form/Input";
import Button from "../../Button";

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
  const [isEdit, setIsEdit] = useState(false);

  // * ===== Modal =====
  const [open, setOpen] = useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => {
      setOpen(true);
      setIsEdit(false);
    },
  };

  // * ===== Form =====
  const methods = useForm<UpdateAttachmentType>();
  const { handleSubmit } = methods;

  // * ===== Handle Form =====
  const { mutateUpdateAttachment, isPending: isPendingUpdate } =
    UpdateAttachment();
  const { refetch } = GetTaskData();
  const onSubmit: SubmitHandler<UpdateAttachmentType> = (data) => {
    mutateUpdateAttachment({
      attachmentId: attachment._id,
      taskId,
      data,
    }).then(() => {
      refetch();
    });
  };

  // * ===== Handle Delete =====
  const { mutateDeleteAttachment, isPending: isPendingDelete } =
    DeleteAttachment();
  const handleDelete = (attachmentId: string) => {
    mutateDeleteAttachment({ attachmentId, taskId }).then(() => {
      refetch();
    });
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title="Detail Attachment">
        <Modal.Section>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
              <Input
                id="displayText"
                label="Display Text"
                disabled={!isEdit}
                defaultValue={attachment.displayText}
              />
              <Input
                id="link"
                label="Link"
                disabled={!isEdit}
                defaultValue={attachment.link}
              />
              <div>
                <Button
                  size="sm"
                  type={isEdit ? "button" : "submit"}
                  onClick={() => {
                    if (!isEdit) setIsEdit(true);
                    else if (isEdit) {
                      setIsEdit(false);
                      setOpen(false);
                    }
                  }}
                  variant={isEdit ? "success" : "primary"}
                  className={clsx("w-full mt-5")}
                  isLoading={isPendingUpdate}
                >
                  {isEdit ? "Update" : "Edit"}
                </Button>
              </div>
            </form>
          </FormProvider>
          <Button
            variant="danger"
            size="sm"
            type="button"
            onClick={() => handleDelete(attachment._id)}
            isLoading={isPendingDelete}
            className="w-full mt-1"
          >
            Delete
          </Button>
        </Modal.Section>
      </Modal>
    </>
  );
}
