import clsxm from "@/libs/clxsm";
import { useDragTaskStore } from "@/stores/useDragTaskStore";
import { Task } from "@/types/tasks/task";
import { MdDelete, MdEdit } from "react-icons/md";
import Tag from "@/components/Tag";
import DeleteTaskModal from "@/components/modals/DeleteModal";
import { format } from "date-fns";
import DetailTaskModal from "@/components/modals/DetailTaskModal";
import Loading from "@/components/Loading";

export default function Card({ cardData }: { cardData: Task }) {
  const { setDraggedTaskId } = useDragTaskStore();

  if (!cardData) {
    return <Loading />;
  }
  const taskDueDate = format(new Date(cardData.dueDate), "dd/MM/yyyy");

  return (
    <div
      className={clsxm(
        "bg-white rounded-xl p-3  hover:bg-slate-300 w-[300px] md:w-full border-[2.5px]",
        cardData.status === "To Do" && "border-red-500",
        cardData.status === "In Progress" && "border-blue-500",
        cardData.status === "Done" && "border-green-500"
      )}
      draggable
      onDragStart={() => setDraggedTaskId(cardData._id)}
    >
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold">{cardData.title}</p>
        <div className="flex space-x-2">
          <DeleteTaskModal taskId={cardData._id}>
            {({ openModal }) => (
              <div
                onClick={openModal}
                className="rounded-full p-1.5 bg-red-500 text-white hover:bg-red-900"
              >
                <MdDelete size={15} />
              </div>
            )}
          </DeleteTaskModal>
          <DetailTaskModal task={cardData}>
            {({ openModal }) => (
              <div
                onClick={openModal}
                className="rounded-full p-1.5 bg-blue-500 text-white hover:bg-blue-900"
              >
                <MdEdit size={15} />
              </div>
            )}
          </DetailTaskModal>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-1.5">
        {cardData.tags.map((tag) => (
          <Tag title={tag} key={tag} />
        ))}
      </div>
      <div className="flex justify-end">
        <p className="mt-2 text-sm">{taskDueDate}</p>
      </div>
    </div>
  );
}
