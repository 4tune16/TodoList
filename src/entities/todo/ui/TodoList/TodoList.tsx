import { memo, useContext, type ComponentProps } from "react";
import { TodoItem, TasksContext } from "@/entities/todo";

export type Task = {
  title: string;
  id: string;
  isDone: boolean;
};

type StylesType = { styles: Record<string, string> };

const TodoListWithoutMemo = ({
  styles,
  ...restProps
}: ComponentProps<"ul"> & StylesType) => {
  const { tasks, filteredTasks } = useContext(TasksContext);
  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks) {
    return <div className={styles.emptyMessage}>There are no tasks yet</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className={styles.emptyMessage}>Tasks not found</div>;
  }

  return (
    <ul
      className={styles.list}
      {...restProps}>
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className={styles.item}
          key={task.id}
          {...task}
        />
      ))}
    </ul>
  );
};

TodoListWithoutMemo.displayName = "TodoList";

export const TodoList = memo(TodoListWithoutMemo);
