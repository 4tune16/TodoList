import { useContext, useState, type ComponentProps } from "react";
import Button from "@/shared/ui/Button";
import Field from "@/shared/ui/Field";
import { TasksContext } from "@/entities/todo";

const AddTaskForm = ({
  styles,
  ...restProps
}: ComponentProps<"form"> & { styles: Record<string, string> }) => {
  const { addTask, newTaskInputRef } = useContext(TasksContext);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState("");

  const clearNewTaskTitle = newTaskTitle.trim();
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!isNewTaskTitleEmpty) {
      addTask(clearNewTaskTitle, () => setNewTaskTitle(""));
    }
  };

  const onInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLTextAreaElement;
    const clearValue = value.trim();
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0;
    setNewTaskTitle(value);
    setError(hasOnlySpaces ? "The task can not be empty" : "");
  };

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      {...restProps}>
      <Field
        className={styles.field}
        label="New task title"
        id="new-task"
        value={newTaskTitle}
        error={error}
        onInput={onInput}
        ref={newTaskInputRef}
      />
      <Button
        type="submit"
        disabled={isNewTaskTitleEmpty}>
        Add
      </Button>
    </form>
  );
};

export default AddTaskForm;
