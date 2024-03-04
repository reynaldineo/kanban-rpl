import UpdateTask from "@/hooks/UpdateTask";
import clsxm from "@/libs/clxsm";
import { UpdateTaskData } from "@/types/tasks/editTask";
import { Task } from "@/types/tasks/task";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import Modal from "../Modal";
import Tag from "../Tag";
import EditAttachmentModal from "./EditAttachmentModal";

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
  const { register, handleSubmit } = useForm<UpdateTaskData>();

  // * ===== Handle Form =====
  const { mutateUpdatTask } = UpdateTask();
  const onSubmit: SubmitHandler<UpdateTaskData> = (data) => {
    mutateUpdatTask({ taskId: task._id, taskData: data });
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title="Detail Task">
        <Modal.Section>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-col space-y-4"
          >
            <div>
              <label htmlFor="title">Title</label>
              <input
                {...register("title")}
                id="title"
                disabled={!isEdit}
                defaultValue={task.title}
                className="border px-1 mt-1.5 w-full"
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                {...register("description")}
                id="description"
                disabled={!isEdit}
                defaultValue={task.description}
                className="border px-1 mt-1.5 w-full"
              />
            </div>
            <div>
              <label htmlFor="dueDate">Due Date</label>
              <input
                {...register("dueDate")}
                disabled={!isEdit}
                type="date"
                defaultValue={task.dueDate}
                id="dueDate"
                name="dueDate"
                className="border px-1 mt-1.5 w-full"
              />
            </div>
            <div>
              <label htmlFor="status">Status</label>
              <select
                {...register("status")}
                disabled={!isEdit}
                defaultValue={task.status}
                id="status"
                name="status"
                className="border px-1 mt-1.5 w-full"
              >
                <option value="" hidden>
                  Select Status
                </option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div>
              <label htmlFor="status">Tag</label>
              <div className="flex items-center flex-row flex-wrap gap-1.5">
                {task.tags.map((tag) => (
                  <Tag title={tag} key={tag} />
                ))}
                <button className="flex items-center bg-gray-200 hover:bg-gray-400 w-fit rounded-lg px-2.5 py-1 text-sm mt-2 ml-2">
                  <FaPlus className="mr-2" /> Add Tag
                </button>
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
                <button className="flex items-center bg-gray-200 hover:bg-gray-400 w-fit rounded-lg px-2.5 py-1 text-sm mt-2 ml-2">
                  <FaPlus className="mr-2" /> Add Attachment
                </button>
              </div>
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
                  isEdit ? "bg-green-400" : "bg-blue-400"
                )}
              >
                {isEdit ? "Update" : "Edit"}
              </button>
            </div>
          </form>
        </Modal.Section>
      </Modal>
    </>
  );
}
