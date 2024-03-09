import { useState } from "react";
import DeleteTask from "@/hooks/DeleteTask";
import Modal from "../Modal";
import Button from "../Button";
import GetTaskData from "@/hooks/GetTaskData";

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
  // * ====== Modal ======
  const [open, setOpen] = useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  // * ====== Handle Delete Task ======
  const { mutateDeletTask, isPending } = DeleteTask();
  const { refetch } = GetTaskData();
  const handleDelete = (taskId: string) => {
    mutateDeletTask(taskId).then(() => refetch());
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
            <Button onClick={() => setOpen(false)} variant="gray">
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(taskId)}
              isLoading={isPending}
              variant="danger"
            >
              Delete
            </Button>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}
