export type TaskPriority = 'HIGH' | 'MEDIUM' | 'LOW';

export type Task = {
    id: string,
    description: string,
    title?: string,
    date: string,
    isCompleted: boolean,
    priority: TaskPriority,
    createdAt: number,
    updatedAt: number,
}