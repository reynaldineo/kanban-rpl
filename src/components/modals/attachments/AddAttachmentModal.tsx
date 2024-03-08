import Modal from "@/components/Modal";
import Input from "@/components/form/Input";
import { Task } from "@/types/tasks/task";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import GetTaskData from "@/hooks/GetTaskData";
import { Attachment } from "@/types/tasks/attachment";
import AddAttachment from "@/hooks/AddAttachment";
import Button from "@/components/Button";

type ModalReturnType = {
  openModal: () => void;
};

export default function AddAttachmentModal({
  children,
  task,
}: {
  children: (props: ModalReturnType) => JSX.Element;
  task: Task;
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

  // * React Hook Form
  const methods = useForm<Attachment[]>();
  const { handleSubmit } = methods;

  // * Handle On Submit
  const { mutateAddAttachment, isPending } = AddAttachment();
  const { refetch } = GetTaskData();
  const onSubmit: SubmitHandler<Attachment[]> = (data) => {
    mutateAddAttachment({ data: data, taskId: task._id }).then(() => {
      refetch();
    });
    setOpen(false);
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title="Add attachment">
        <Modal.Section>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex-col space-y-4"
            >
              <Input
                id="displayText"
                label="Display Text"
                validation={{
                  required: "Display text is required!",
                }}
              />
              <Input
                id="link"
                label="Link"
                validation={{
                  required: "Link is required!",
                }}
              />
              <Button
                size="sm"
                type="submit"
                isLoading={isPending}
                className="mt-4 w-full"
              >
                Submit
              </Button>
            </form>
          </FormProvider>
        </Modal.Section>
      </Modal>
    </>
  );
}
