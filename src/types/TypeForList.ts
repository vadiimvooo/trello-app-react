import { Task } from "./TypeForTask";

export interface List {
  title: string,
  id: number,
}

export interface ListWithTasks extends List {
  tasks: Task[];
}
