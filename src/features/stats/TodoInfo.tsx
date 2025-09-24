import { memo, useContext, useMemo, type ComponentProps } from "react";
import { TasksContext } from "@/entities/todo";

const TodoInfoWithoutMemo = ({
  styles,
  ...restProps
}: ComponentProps<"div"> & { styles: Record<string, string> }) => {
  const { tasks, deleteAllTasks } = useContext(TasksContext);

  const doneTasks = useMemo(() => {
    return tasks.filter((task) => task.isDone);
  }, [tasks]);

  const total = tasks.length;
  const hasTasks = total > 0;
  const done = doneTasks.length;

  return (
    <div
      className={styles.info}
      {...restProps}>
      <div className={styles.totalTasks}>
        Done {done} from {total}
      </div>
      {hasTasks && (
        <button
          className={styles.deleteAllButton}
          type="button"
          onClick={deleteAllTasks}>
          Delete all
        </button>
      )}
    </div>
  );
};

TodoInfoWithoutMemo.displayName = "TodoInfo";

export const TodoInfo = memo(TodoInfoWithoutMemo);
