import { useMemo, useRef } from "react";
import type { Task } from "../ui/TodoList";

export const useIncompleteTaskScroll = ({ tasks }: { tasks: Task[] }) => {
  const firstIncompleteTaskRef = useRef<HTMLLIElement>(null);
  const firstIncompleteTaskId = useMemo(() => {
    return tasks.find((task: Task) => task.isDone === false)?.id;
  }, [tasks]);
  return { firstIncompleteTaskRef, firstIncompleteTaskId };
};
