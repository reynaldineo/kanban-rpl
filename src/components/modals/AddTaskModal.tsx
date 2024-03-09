import Modal from "@/components/Modal";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { PostTask } from "@/types/tasks/postTask";
import Input from "@/components/form/Input";
import Button from "../Button";
import AddTask from "@/hooks/AddTask";
import GetTaskData from "@/hooks/GetTaskData";
import SelectInput from "../form/SelectInput";
import { useState } from "react";

type ModalReturnType = {
  openModal: () => void;
};

export default function AddTaskModal({
  children,
  defaultStatus,
}: {
  children: (props: ModalReturnType) => JSX.Element;
  defaultStatus?: string;
}) {
  // * ====== Modal ======
  const [open, setOpen] = useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  // * ====== React Hook Form ======
  const methods = useForm<PostTask>();
  const { handleSubmit, register } = methods;

  // * ====== Hook API  ======
  const { mutateNewTask } = AddTask();
  const { refetch } = GetTaskData();

  // * ====== Handle Submit ======
  const onSubmit: SubmitHandler<PostTask> = async (data) => {
    await mutateNewTask(data);
    await refetch();
    setOpen(false);
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title="Add New Task">
        <Modal.Section>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <Input
                id="title"
                label="Title"
                placeholder="Input title here..."
                validation={{
                  required: "Title is required!",
                }}
              />
              <Input
                id="description"
                label="Description"
                placeholder="Input description here..."
                validation={{
                  required: "Description is required!",
                }}
              />
              <Input
                id="dueDate"
                type="date"
                label="Due date"
                validation={{
                  required: "Due date is required!",
                }}
              />
              <SelectInput
                id="status"
                label="Status"
                placeholder="Select Status"
                defaultValue={defaultStatus}
                validation={{
                  required: "Status is required!",
                }}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </SelectInput>
              <Button
                type="submit"
                size="sm"
                variant="primary"
                className="w-full mt-5"
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
