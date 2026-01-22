import { TaskPriority } from "./task";

export type TaskStatusFilter = "ALL" | "PENDING" | "COMPLETE";

export type TaskFilter = {
    status: TaskStatusFilter;
    priority: TaskPriority[];
    dateRange: {
        from: number | null;
        to: number | null;
    }
} 