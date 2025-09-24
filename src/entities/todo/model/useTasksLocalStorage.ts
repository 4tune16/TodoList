import { useCallback } from "react";
import type { Task } from "../ui/TodoList";

export const useTasksLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");

  const saveTasks = useCallback((tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, []);
  return {
    savedTasks: savedTasks ? (JSON.parse(savedTasks) as Task[]) : null,
    saveTasks,
  };
};
