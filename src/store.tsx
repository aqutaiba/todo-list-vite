import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Todo = { id: number; title: string; done?: boolean };

export type TodosState = {
  todos: Array<Todo>;
  add: (title: string) => void;
  remove: (id: number) => void;
  edit: (id: number, newTitle: string) => void;
  toggleDone: (id: number) => void;
};

const storeCallback = (set: any) => ({
  todos: [],
  add: (title: string) =>
    set((state: { todos: any }) => ({
      todos: [...state.todos, { title: title, id: new Date().getTime() }],
    })),
  toggleDone: (selectId: number) =>
    set((state: { todos: any[] }) => ({
      todos: state.todos.map((todo) => {
        if (todo.id !== selectId) {
          return todo;
        }
        return { ...todo, done: !todo.done };
      }),
    })),
  remove: (selectId: number) =>
    set((state: { todos: any[] }) => ({
      todos: state.todos.filter((todo) => todo.id !== selectId),
    })),
  edit: (selectId: number, newTitle: string) =>
    set((state: { todos: any[] }) => ({
      todos: state.todos.map((todo) =>
        todo.id == selectId ? { ...todo, title: newTitle } : todo
      ),
    })),
});

export const useStore = create(
  persist(storeCallback, {
    name: "todo-storage",
    storage: createJSONStorage(() => sessionStorage),
  })
);
