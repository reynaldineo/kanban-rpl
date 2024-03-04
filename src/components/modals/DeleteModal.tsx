import * as React from "react";

import Modal from "../Modal";
import DeleteTask from "../../hooks/DeleteTask";

type ModalReturnType = {
  openModal: () => void;
};

export default function DeleteTaskModal({
  children,
  taskId,
}: {
  children: (props: ModalReturnType) => JSX.Element;
  taskId: string;
}) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  const { mutateDeletTask } = DeleteTask();
  const handleDelete = (taskId: string) => {
    mutateDeletTask(taskId);
    setOpen(false);
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title="Delete Task">
        <Modal.Section>
          <p className="mt-2 md:mt-0 mb-3">
            Are you sure you want to delete this task?
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setOpen(false)}
              className="p-2 bg-gray-400 text-white rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(taskId)}
              className="p-2 bg-red-500 text-white rounded-xl"
            >
              Delete
            </button>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}