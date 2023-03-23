import { Task } from "../types/TypeForTask";

export function getTasksByListId(tasks: Task[], listId: number) {
  return tasks.filter(task => task.listId === listId);
}