import type { Task } from "@/entities/todo/ui/TodoList";

const STORAGE_KEY = "tasks";

const read = (): Task[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return [];
  }
};

const write = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const delay = (ms: number = 150) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const localAPI = {
  getAll: async () => {
    await delay();

    return read();
  },

  getById: async (id: string) => {
    await delay();

    return read().find((task) => task.id === id) ?? null;
  },

  add: async (newTask: Omit<Task, "id">) => {
    await delay();

    const addedTask = {
      ...newTask,
      id: self.crypto?.randomUUID() ?? Date.now().toString(),
    };

    write([...read(), addedTask]);

    return addedTask;
  },

  delete: async (taskId: string) => {
    await delay();

    let taskForDelete: Task | null = null;
    const arrAfterUpd = read().filter((task) => {
      taskForDelete = task;
      return task.id !== taskId;
    });
    write(arrAfterUpd);

    return taskForDelete;
  },

  deleteAll: async (/* tasks: Task[] */) => {
    await delay();
    write([]);
  },

  toggleComplete: async (taskId: string, isDone: boolean) => {
    await delay();

    /* const arrAfterUpd = read().map((task) => {
      if (task.id === taskId) {
        return { ...task, isDone: isDone };
      }
      return task;
    }); */
    /* const oldArr = read();
    const foundObj = oldArr.find((task) => task.id === taskId);

    if (foundObj) {
      foundObj.isDone = isDone;
    }
    const arrAfterUpd = oldArr; */

    const oldArr = read();
    const foundObjIndex = oldArr.findIndex((task) => task.id === taskId);
    if (foundObjIndex !== -1) {
      oldArr[foundObjIndex].isDone = isDone;
    }

    write(oldArr);
    return oldArr[foundObjIndex];
  },
};
