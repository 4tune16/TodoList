import { useContext, type ComponentProps } from "react";
import Field from "@/shared/ui/Field";
import { TasksContext } from "@/entities/todo";

export const SearchTaskForm = ({
  styles,
  ...restProps
}: ComponentProps<"form"> & { styles: Record<string, string> }) => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext);
  return (
    <form
      className={styles.form}
      onSubmit={(event) => event.preventDefault()}
      {...restProps}>
      <Field
        className={styles.field}
        label="Search task"
        id="search-task"
        type="search"
        value={searchQuery}
        onInput={(event) => {
          const eventTarget = event.target as HTMLInputElement;

          setSearchQuery(eventTarget.value);
        }}
      />
    </form>
  );
};
