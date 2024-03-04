import { BoardTitle } from "@/types/tasks/task";

interface ChecklistItem {
  checklistItem: string;
  isDone: boolean;
}

interface Attachment {
  link: string;
  displayText: string;
}

export interface PostTask {
  title: string;
  description: string;
  dueDate: string; // Assuming dueDate is a string in ISO format
  tags: string[];
  checklists: ChecklistItem[];
  attachments: Attachment[];
  status: keyof typeof BoardTitle;
}
