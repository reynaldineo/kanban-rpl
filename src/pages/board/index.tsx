import BoardArea from "@/pages/board/container/BoardArea";
import AddModal from "@/components/modals/AddTaskModal";
import { FaPlus } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import withAuth from "@/components/hoc/withAuth";

export default withAuth(BoardPage);
function BoardPage() {
  return (
    <main className="min-h-screen ">
      <Navbar />
      <div className="flex items-center justify-between mr-10 py-5 px-8">
        <p className="text-3xl font-bold pl-5">TaskBoard</p>
        <AddModal>
          {({ openModal }) => (
            <button
              type="button"
              className="p-2 bg-blue-500 text-white rounded-lg flex items-center "
              onClick={openModal}
            >
              <FaPlus />
              <span className="hidden md:block ml-2">Add New Task</span>
            </button>
          )}
        </AddModal>
      </div>

      <div className="p-[1px] rounded-xl bg-slate-200 mx-14" />

      <div className="px-8">
        <BoardArea />
      </div>
    </main>
  );
}
