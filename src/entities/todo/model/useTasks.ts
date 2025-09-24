import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useReducer,
} from "react";
import type { Task } from "../ui/TodoList";
import { tasksAPI } from "@/shared/api/tasks";

// type ActionType = {
//   type: "SET_ALL" | "ADD" | "TOGGLE_COMPLETE" | "DELETE" | "DELETE_ALL";
//   tasks?: Task[];
//   task?: Partial<Task>;
//   id?: string;
//   isDone?: boolean;
// };

type ActionType =
  | {
      type: "SET_ALL";
      tasks: Task[];
    }
  | { type: "ADD"; task: Task }
  | ({ type: "TOGGLE_COMPLETE" } & Pick<Task, "id" | "isDone">)
  | ({ type: "DELETE" } & Pick<Task, "id">)
  | { type: "DELETE_ALL" };

const tasksReducer = (state: Task[], action: ActionType) => {
  switch (action.type) {
    case "SET_ALL": {
      return Array.isArray(action.tasks) ? action.tasks : state;
    }
    case "ADD": {
      const { /* type, */ task } = action;
      return [...state, task];
    }
    case "TOGGLE_COMPLETE": {
      const { /* type, */ id, isDone } = action;

      return state.map((task) => {
        return task.id === id ? { ...task, isDone } : task;
      });
    }
    case "DELETE": {
      return state.filter((task) => task.id !== action.id);
    }
    case "DELETE_ALL": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export const useTasks = () => {
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [disappearingTaskId, setDisappearingTaskId] = useState<string | null>(
    null
  );
  const [appearingTaskId, setAppearingTaskId] = useState<string | null>(null);

  const newTaskInputRef = useRef<HTMLInputElement>(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure you want to delete all?");
    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then((values) => {
        console.log({ values });
        // setTasks([]);  ---    раньше было так
        dispatch({ type: "DELETE_ALL" });
      });
    }

    /*  tasks.forEach((task) => {
      console.log(task.title, "foreach");

      fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          console.log(task.title, "then-1");

          return response.json();
        })
        .then((deletedTask: Task) => {
          console.log(task.title, "then-2", "deleted");
          setTasks((tasksPrev) =>
            tasksPrev.filter((task) => task.id !== deletedTask.id)
          );
        });
    }); */
  }, [tasks]);

  const deleteTask = useCallback((taskId: string) => {
    tasksAPI.delete(taskId).then((deletedTask: Task) => {
      setDisappearingTaskId(taskId);
      setTimeout(() => {
        /* setTasks((tasksPrev) =>
          tasksPrev.filter((task) => task.id !== deletedTask.id)
        ); */ // ------ раньше было так
        dispatch({ type: "DELETE", id: deletedTask.id });
        setDisappearingTaskId(null);
      }, 400);
    });
  }, []);

  const toggleTaskComplete = useCallback((taskId: string, isDone: boolean) => {
    tasksAPI.toggleComplete(taskId, isDone).then((updatedTask: Task) => {
      /*  setTasks(
          tasks.map((task) => {
            if (task.id === taskId) {
              return updatedTask;
            }
            return task;        // ------ раньше было так
          })
        ); */
      dispatch({
        type: "TOGGLE_COMPLETE",
        id: updatedTask.id,
        isDone: updatedTask.isDone,
      });
    });
  }, []);

  const addTask = useCallback(
    (clearNewTaskTitle: string, callbackAfterAdding: () => void) => {
      const newTask: Omit<Task, "id"> = {
        title: clearNewTaskTitle,
        isDone: false,
      };

      tasksAPI.add(newTask).then((addedTask: Task) => {
        // setTasks((prevTasks) => [...prevTasks, addedTask]);    // раньше было так
        dispatch({ type: "ADD", task: addedTask });
        callbackAfterAdding();
        setSearchQuery("");
        newTaskInputRef.current?.focus();
        setAppearingTaskId(addedTask.id);
        setTimeout(() => {
          setAppearingTaskId(null);
        }, 400);
      });
    },
    []
  );

  useEffect(() => {
    tasksAPI.getAll().then((data) => {
      // setTasks(data);  // раньше было так
      dispatch({ type: "SET_ALL", tasks: data });
    });
    newTaskInputRef.current?.focus();
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();
    return clearSearchQuery.length > 0
      ? tasks.filter((task) =>
          task.title.toLowerCase().includes(clearSearchQuery)
        )
      : null;
  }, [searchQuery, tasks]);
  return {
    tasks,
    filteredTasks,
    newTaskInputRef,
    searchQuery,
    setSearchQuery,

    addTask,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,

    disappearingTaskId,
    appearingTaskId,
  };
};
