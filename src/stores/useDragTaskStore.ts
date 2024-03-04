import { create } from "zustand";

type DragTaskState = {
  draggedTaskId: string | null;
};

type DragTaskAction = {
  setDraggedTaskId: (id: string) => void;
  resetDraggedTaskId: () => void;
};

export const useDragTaskStore = create<DragTaskState & DragTaskAction>(
  (set) => ({
    draggedTaskId: null,
    setDraggedTaskId: (id) => set({ draggedTaskId: id }),
    resetDraggedTaskId: () => set({ draggedTaskId: null }),
  })
);
