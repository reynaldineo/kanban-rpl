import GetTaskData from "@/hooks/GetTaskData";
import UpdateTask from "@/hooks/UpdateTask";
import clsxm from "@/libs/clxsm";
import { useDragTaskStore } from "@/stores/useDragTaskStore";
import { BoardTitle } from "@/types/tasks/task";
import { FaPlus } from "react-icons/fa";
import Loading from "@/components/Loading";
import AddTaskModal from "@/components/modals/AddTaskModal";
import Card from "@/pages/board/components/Card";

export default function Board({ title }: { title: keyof typeof BoardTitle }) {
  const { taskData, refetch } = GetTaskData();
  const { draggedTaskId, resetDraggedTaskId } = useDragTaskStore();
  const { mutateUpdatTask } = UpdateTask();

  if (!taskData) {
    return <Loading />;
  }

  const DataByStatus = taskData.data.data.tasks.filter(
    (task) => task.status === title && !task.deletedAt
  );

  // * Handle Dropped Task
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    draggedTaskId &&
      mutateUpdatTask({
        taskId: draggedTaskId,
        taskData: { status: title },
      }).then(() => {
        refetch();
      });
    resetDraggedTaskId();
  };

  return (
    <section className="w-full min-h-[60vh]  ">
      <div className="flex items-center gap-3">
        <p
          className={clsxm(
            "text-base font-semibold",
            "py-[2px] px-2 rounded-md w-fit ",
            title === "To Do" && "bg-red-300",
            title === "In Progress" && "bg-blue-300",
            title === "Done" && "bg-green-300"
          )}
        >
          {title}
        </p>
        <p className="text-gray-400 font-semibold">{DataByStatus.length}</p>
      </div>

      <div
        className={clsxm(
          "mt-4 rounded-xl bg-gray-700/50 p-4 h-full pb-10 flex flex-col gap-4 min-w-[300px]"
        )}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {DataByStatus.map((cardData) => (
          <Card cardData={cardData} key={cardData._id} />
        ))}
        <AddTaskModal defaultStatus={title}>
          {({ openModal }) => (
            <button
              type="button"
              className="p-1.5 bg-gray-300 hover:bg-gray-500 text-white rounded-lg flex items-center justify-center"
              onClick={openModal}
            >
              <FaPlus className="mr-1.5" /> New Task
            </button>
          )}
        </AddTaskModal>
      </div>
    </section>
  );
}
