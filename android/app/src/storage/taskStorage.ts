import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";

const TASKS_STORAGE_KEY = "TASK_MANAGER_TASKS";

const readTasks = async (): Promise<Task[]> => {
    try{
        const raw = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        if(!raw) return [];
        return JSON.parse(raw) as Task[];
    }catch(error){
        console.error("Error reading task", error);
        return [];
    }
};

const writeTasks = async (tasks: Task[]):Promise<void> => {
    try{
        await AsyncStorage.setItem(
            TASKS_STORAGE_KEY,
            JSON.stringify(tasks)
        );
    }catch(error){
        console.error("Error writing task", error);
    }
}

export const getTasks = async (): Promise<Task[]> => {
    return await readTasks();
}

export const addTask = async (task: Task):Promise<void> => {
    const tasks = await readTasks();
    await writeTasks([...tasks, task]);
}

export const updateTask = async (updatedTask: Task): Promise<void> => {
  const tasks = await readTasks();
  const newTasks = tasks.map(task =>
    task.id === updatedTask.id
      ? { ...updatedTask, updatedAt: Date.now() }
      : task
  );
  await writeTasks(newTasks);
};

export const deleteTask = async (taskId: string): Promise<void> => {
    const tasks = await readTasks();
    await writeTasks(tasks.filter(t => t.id !== taskId));
} 

export const toggleTaskStatus = async (taskId: string): Promise<void> => {
    const tasks = await readTasks();
    const newTask = tasks.map( task =>
        task.id === taskId
        ? {
            ...task,
            isCompleted: !task.isCompleted,
            updatedAt: Date.now(),
        }
        :task
    );
    await writeTasks(newTask);
}