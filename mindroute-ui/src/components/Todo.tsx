import { useSelector } from "react-redux";
import AddForm from "./AddForm.js";
import { FaTasks } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../features/todo/todoSlice.js";
import { marksAsDone } from "../features/todo/todoSlice.js";

export default function Todo() {
  const todos = useSelector((state) => state.todos);
  console.log(todos);
  const dispatch = useDispatch();

  const clickHandler = (id) => {
    //console.log("delete", id);
    dispatch(deleteTodo(id));
  };

  const markAsDone = (id) => {
    //console.log("mark as done", id);
    dispatch(marksAsDone(id));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-950 to-gray-950 text-white p-4">
      <AddForm />
      <div className="w-full md:w-[60%] flex flex-col justify-center p-4 gap-4 text-xl">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="w-full flex flex-row justify-between flex-wrap"
            >
              {todo.isDone ? (
                <div className="flex items-center line-through text-green-500 opacity-70 gap-3">
                  <BsListTask className="size-6" />
                  <span>{todo.task}</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <BsListTask className="size-6" />
                  <span>{todo.task}</span>
                </div>
              )}
              <div className="flex flex-row gap-2 flex-wrap">
                {!todo.isDone && (
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg text-sm hover:bg-green-700 transition-all duration-200 cursor-pointer"
                    onClick={() => markAsDone(todo.id)}
                  >
                    <IoMdCheckmarkCircleOutline className="size-5" />
                    <span>Mark As Done</span>
                  </button>
                )}
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg text-sm hover:bg-red-700 transition-all duration-200 cursor-pointer"
                  onClick={() => clickHandler(todo.id)}
                >
                  <IoMdCloseCircleOutline className="size-5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-md text-gray-400 flex flex-row items-center justify-center gap-3">
            <FaTasks className="size-5" /> Current No Task
          </p>
        )}
      </div>
    </div>
  );
}
