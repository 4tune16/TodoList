import { Todo } from "@/widgets/Todo";
import { TasksContextProvider } from "@/entities/todo";

export const TasksPage = () => {
  return (
    <TasksContextProvider>
      <Todo />
    </TasksContextProvider>
  );
};
