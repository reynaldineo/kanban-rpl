import { BoardTitle } from "@/types/tasks/task";

interface ChecklistItem {
  checklistItem: string;
  isDone: boolean;
}

interface Attachment {
  link: string;
  displayText: string;
}

export type UpdateTaskData = {
  title?: string;
  description?: string;
  dueDate?: string;
  tags?: string[];
  checklists?: ChecklistItem[];
  attachments?: Attachment[];
  status?: keyof typeof BoardTitle;
};
