import { Task, TaskPriority } from "../types/task";

export const createTask = (
  description: string,
  priority: TaskPriority,
  title?: string
): Task => {
  const now = Date.now();
  const today = new Date().toISOString().split("T")[0];

  return {
    id: `task-${now}`,     
    description,
    title,
    priority,
    date: today,
    isCompleted: false,
    createdAt: now,
    updatedAt: now,
  };
};
