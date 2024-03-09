import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import UpdateTask from "@/hooks/UpdateTask";
import Modal from "../Modal";
import Input from "../form/Input";
import { Task } from "@/types/tasks/task";
import Button from "../Button";

type ModalReturnType = {
  openModal: () => void;
};

type Tag = {
  tags: string;
};

export default function AddTagModal({
  children,
  task,
}: {
  children: (props: ModalReturnType) => JSX.Element;
  task: Task;
}) {
  // * ====== Modal ======
  const [open, setOpen] = useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  // * ====== Form ======
  const methods = useForm<Tag>();
  const { handleSubmit } = methods;

  // * ====== Handle Submit ======
  const { mutateUpdatTask } = UpdateTask();
  const onSubmit: SubmitHandler<Tag> = (data: Tag) => {
    const tags = task.tags;
    tags.push(data.tags);
    const dataTag = { tags };
    mutateUpdatTask({ taskId: task._id, taskData: dataTag });
    setOpen(false);
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title="Add tag">
        <Modal.Section>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                id="tags"
                label="Tag"
                placeholder="Input tag here..."
                validation={{
                  required: "Tag is required!",
                }}
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full mt-3"
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
