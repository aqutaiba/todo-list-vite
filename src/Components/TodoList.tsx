import React from "react";
import { useStore, Todo as TodoType, TodosState } from "../store";
import { TodoCard } from "./TodoCard";

const TodoList: React.FC = () => {
  const todos = useStore((state: TodosState) => state.todos);

  const renderTodos = () => {
    if (!todos.length) {
      return (
        <div className="w-3/4 bg-blue-900 rounded-xl shadow-md overflow-hidden">
          <div className="p-4">
            <h4 className="font-bold text-base text-gray-300">
              You have nothing to do!
            </h4>
          </div>
        </div>
      );
    } else {
      return todos.map((todo: TodoType) => (
        <TodoCard key={todo.id} {...todo} />
      ));
    }
  };

  return (
    <div className=" m-4 w-full flex flex-col items-center">
      {renderTodos()}
    </div>
  );
};

export default TodoList;
