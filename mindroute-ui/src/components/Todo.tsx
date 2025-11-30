import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
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
import ButtonLoading from "./ButtonLoading.tsx";
import type { Todo } from "../service/todos.ts";

export default function Todo() {
  const { todos, loading, markingId, deletingId } = useAppSelector(
    (state) => state.todo
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTodoAsync(id)).unwrap();
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const markAsDone = async (id: string) => {
    try {
      await dispatch(markAsDoneAsync(id)).unwrap();
      toast.success("Marked as done");
    } catch {
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
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo: Todo) => (
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
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg text-sm hover:bg-green-700 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => markAsDone(todo.id)}
                    disabled={markingId === todo.id}
                  >
                    {markingId === todo.id ? (
                      <>
                        <ButtonLoading />
                        <span>Marking...</span>
                      </>
                    ) : (
                      <>
                        <IoMdCheckmarkCircleOutline className="size-5" />
                        <span>Mark As Done</span>
                      </>
                    )}
                  </button>
                )}
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg text-sm hover:bg-red-700 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleDelete(todo.id)}
                  disabled={deletingId == todo.id}
                >
                  {deletingId == todo.id ? (
                    <>
                      <ButtonLoading />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <IoMdCloseCircleOutline className="size-5" />
                      <span>Delete</span>
                    </>
                  )}
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
