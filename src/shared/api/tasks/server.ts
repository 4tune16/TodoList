import type { Task } from "@/entities/todo/ui/TodoList";

const URL = "http://localhost:3001/tasks";

const headers = {
  "Content-Type": "application/json",
};

export const serverAPI = {
  getAll: () => {
    return fetch(URL).then((response) => response.json() as Promise<Task[]>);
  },

  getById: (id: string) => {
    return fetch(`${URL}/${id}`).then((response) => response.json());
  },

  add: (newTask: Omit<Task, "id">) => {
    return fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(newTask),
    }).then((response) => response.json());
  },

  delete: (taskId: string) => {
    return fetch(`${URL}/${taskId}`, {
      method: "DELETE",
    }).then((response) => response.json());
  },

  deleteAll: (tasks: Task[]) => {
    return Promise.all(
      tasks.map((task) => {
        return serverAPI.delete(task.id);
      })
    );
  },

  toggleComplete: (taskId: string, isDone: boolean) => {
    return fetch(`${URL}/${taskId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone: isDone }),
    }).then((response) => response.json());
  },
};
