import { useEffect, useState } from "react";
import type { Task } from "@/entities/todo/ui/TodoList";
import { tasksAPI } from "@/shared/api/tasks";

export const TaskPage = (props: { params: { id: string } }) => {
  const { params } = props;
  const taskId = params.id;

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    tasksAPI
      .getById(taskId)
      .then((taskData) => {
        setTask(taskData);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setisLoading(false);
      });
  }, [taskId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Task not found!</div>;
  }

  return (
    <div>
      <h1>{task?.title}</h1>
      <p>{task?.isDone ? "Задача выполнена" : "Задача не выполнена"}</p>
    </div>
  );
};
