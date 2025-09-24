import { createContext, useMemo, type ReactNode } from "react";
import type { Task } from "../ui/TodoList";
import { useTasks } from "./useTasks";
import { useIncompleteTaskScroll } from "./useIncompleteTaskScroll";

type TasksContextType = {
  tasks: Task[];
  filteredTasks: Task[] | null;
  // newTaskTitle: string;
  // setNewTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  newTaskInputRef: React.RefObject<HTMLInputElement | null>;
  firstIncompleteTaskRef: React.RefObject<HTMLLIElement | null>;
  firstIncompleteTaskId: string | undefined;
  addTask: (clearNewTaskTitle: string, callbackAfterAdding: () => void) => void;
  deleteTask: (id: string) => void;
  deleteAllTasks: () => void;
  toggleTaskComplete: (taskId: string, isDone: boolean) => void;
  disappearingTaskId: string | null;
  appearingTaskId: string | null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const TasksContext = createContext<TasksContextType>(
  {} as TasksContextType
);

export const TasksContextProvider = ({ children }: { children: ReactNode }) => {
  const x = useTasks();

  const { firstIncompleteTaskId, firstIncompleteTaskRef } =
    useIncompleteTaskScroll({ tasks: x.tasks });

  const value = useMemo(
    () => ({
      ...x,
      firstIncompleteTaskId,
      firstIncompleteTaskRef,
    }),
    [x, firstIncompleteTaskId, firstIncompleteTaskRef]
  );

  return <TasksContext value={value}>{children}</TasksContext>;
};
