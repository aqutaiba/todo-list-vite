import { useState } from "react";
import { useStore, Todo as TodoType, TodosState } from "../store";
import InputField from "./InputField";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit, FaRegCheckSquare } from "react-icons/fa";
import { IoRefresh } from "react-icons/io5";

export function TodoCard({ id, title, done }: TodoType) {
  const [showEdit, setShowEdit] = useState(false);
  const toggleComplete = useStore((state: TodosState) => state.toggleDone);
  const remove = useStore((state: TodosState) => state.remove);
  const edit = useStore((state: TodosState) => state.edit);

  const handleToggleComplete = () => {
    toggleComplete(id);
  };

  const handleRemove = () => {
    remove(id);
  };

  const handleEdit = () => {
    setShowEdit((prev) => !prev);
  };

  const handleEditSubmit = (text: string) => {
    edit(id, text);
    setShowEdit(false);
  };

  return (
    <div className="justify-self-center flex w-4/6  bg-blue-900 shadow-md rounded-md p-4 mb-4">
      {showEdit ? (
        <InputField
          customSubmitStyle="bg-orange-400 hover:bg-orange-700	"
          defaultValue={title}
          submitButtonText="Update"
          onActionExecute={handleEditSubmit}
        />
      ) : (
        <div className="w-full mt-2">
          <p className="flex justify-start mb-2 card_title ">{title} </p>
          <div className="flex justify-between">
            <button
              className="flex hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
              onClick={handleToggleComplete}
            >
              <div className="flex w-23">
                {done ? (
                  <>
                    <IoRefresh className="mx-1" size={20} color={"ffffff"} />{" "}
                    mark unDone
                  </>
                ) : (
                  <>
                    <FaRegCheckSquare
                      className="mx-1"
                      size={20}
                      color={"ffffff"}
                    />
                    mark Completed
                  </>
                )}
              </div>
            </button>

            <div className="flex">
              <button
                className="flex hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleEdit}
              >
                <FaEdit size={20} color={"ffffff"} />
                <p className="mx-1"> Edit</p>
              </button>

              <button
                className="flex hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleRemove}
              >
                <AiFillDelete size={20} color={"red"} />
                <p className="mx-1"> Delete </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
