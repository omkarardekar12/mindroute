import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store.ts";
import AddForm from "./AddForm.tsx";
import { FaTasks } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  fetchTodos,
  deleteTodoAsync,
  markAsDoneAsync,
} from "../features/todo/todoSlice.ts";
import toast from "react-hot-toast";
import Loading from "./Loading.tsx";

export default function Todo() {
  const { todos, loading } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTodoAsync(id)).unwrap();
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const markAsDone = async (id: string) => {
    try {
      await dispatch(markAsDoneAsync(id)).unwrap();
      toast.success("Marked as done");
    } catch (error) {
      toast.error("Failed to mark as done");
    }
  };

  if (loading) {
    return <Loading />;
  }

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
                  onClick={() => handleDelete(todo.id)}
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
