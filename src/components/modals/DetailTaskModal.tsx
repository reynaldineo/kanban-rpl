import UpdateTask from "@/hooks/UpdateTask";
import clsxm from "@/libs/clxsm";
import { UpdateTaskData } from "@/types/tasks/editTask";
import { Task } from "@/types/tasks/task";
import { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import Modal from "../Modal";
import Tag from "../Tag";
import EditAttachmentModal from "./attachments/EditAttachmentModal";
import Input from "../form/Input";
import { format } from "date-fns";
import SelectInput from "../form/SelectInput";
import Button from "../Button";
import AddAttachmentModal from "./attachments/AddAttachmentModal";
import AddTagModal from "./AddTagModal";
import GetTaskData from "@/hooks/GetTaskData";

type ModalReturnType = {
  openModal: () => void;
};

export default function DetailTaskModal({
  children,
  task,
}: {
  children: (props: ModalReturnType) => JSX.Element;
  task: Task;
}) {
  // * ===== Edit Form =====
  const [isEdit, setIsEdit] = useState(false);
  const [isDetailEdit, setDetailEdit] = useState(false);

  // * ===== Modal =====
  const [open, setOpen] = useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => {
      setOpen(true);
      setIsEdit(false);
      setDetailEdit(false);
    },
  };

  // * ===== Form =====
  const methods = useForm<UpdateTaskData>({
    mode: "onSubmit",
    defaultValues: {
      title: task.title,
      description: task.description,
      dueDate: format(new Date(task.dueDate), "yyyy-MM-dd"),
    },
  });
  const { handleSubmit } = methods;

  // * ===== Handle Form =====
  const { mutateUpdatTask, isPending } = UpdateTask();
  const { refetch } = GetTaskData();
  const onSubmit: SubmitHandler<UpdateTaskData> = (data) => {
    isDetailEdit &&
      mutateUpdatTask({ taskId: task._id, taskData: data }).then(() => {
        refetch();
      });
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title="Detail Task">
        <Modal.Section>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex-col space-y-4"
            >
              <Input id="title" label="Title" disabled={!isEdit} />
              <Input id="description" label="Description" disabled={!isEdit} />
              <Input
                id="dueDate"
                type="date"
                label="Due date"
                disabled={!isEdit}
              />
              <SelectInput
                id="status"
                label="Status"
                placeholder="Select Status"
                disabled={!isEdit}
                defaultValue={task.status}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </SelectInput>

              <div>
                <label htmlFor="status">Tag</label>
                <div className="flex items-center flex-row flex-wrap gap-1.5">
                  {task.tags.map((tag) => (
                    <Tag title={tag} key={tag} />
                  ))}
                  <AddTagModal task={task}>
                    {({ openModal }) => (
                      <button
                        onClick={openModal}
                        type="button"
                        className="flex items-center bg-gray-200 hover:bg-gray-400 w-fit rounded-lg px-2.5 py-1 text-sm mt-2 ml-2"
                      >
                        <FaPlus className="mr-2" /> Add Tag
                      </button>
                    )}
                  </AddTagModal>
                </div>
              </div>

              <div>
                <label>Attachment</label>
                <div className="flex items-center flex-row flex-wrap gap-1.5">
                  {task.attachments.map((attachment) => (
                    <EditAttachmentModal
                      attachment={attachment}
                      taskId={task._id}
                      key={attachment._id}
                    >
                      {({ openModal }) => (
                        <div
                          onClick={openModal}
                          className="px-2.5 py-1.5 bg-teal-500 rounded-lg text-white w-fit text-sm"
                        >
                          {attachment.displayText}
                        </div>
                      )}
                    </EditAttachmentModal>
                  ))}
                  <AddAttachmentModal task={task}>
                    {({ openModal }) => (
                      <button
                        type="button"
                        onClick={openModal}
                        className="flex items-center bg-gray-200 hover:bg-gray-400 w-fit rounded-lg px-2.5 py-1 text-sm mt-2 ml-2"
                      >
                        <FaPlus className="mr-2" /> Add Attachment
                      </button>
                    )}
                  </AddAttachmentModal>
                </div>
              </div>

              <div>
                <Button
                  onClick={() => {
                    if (!isEdit) {
                      setIsEdit(true);
                    } else if (isEdit) {
                      setIsEdit(false);
                      setOpen(false);
                      setDetailEdit(true);
                    }
                  }}
                  variant={isEdit ? "success" : "primary"}
                  type={isEdit ? "button" : "submit"}
                  size="sm"
                  className={clsxm(" w-full mt-4 ")}
                  isLoading={isPending}
                >
                  {isEdit ? "Update" : "Edit"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </Modal.Section>
      </Modal>
    </>
  );
}
