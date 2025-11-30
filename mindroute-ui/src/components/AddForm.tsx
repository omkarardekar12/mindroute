import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { addTodoAsync } from "../features/todo/todoSlice.ts";
import toast from "react-hot-toast";
import ButtonLoading from "./ButtonLoading.tsx";

export default function AddForm() {
  const [task, setTask] = useState("");
  const dispatch = useAppDispatch();
  const addLoading = useAppSelector((state) => state.todo.addLoading);

  const submitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!task.trim()) {
      toast.error("Task cannot be empty!");
      return;
    }

    try {
      await dispatch(addTodoAsync(task)).unwrap();
      toast.success("Task added!");
      setTask("");
    } catch {
      toast.error("Failed to add task.");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-full md:w-[60%] flex items-center gap-3 mb-6"
    >
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task..."
        className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-xl outline-none placeholder-gray-500border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 transition"
      ></input>
      <button
        type="submit"
        className="flex items-center justify-center px-5 py-3 bg-blue-600 rounded-xl font-semibold text-white hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!task.trim() || addLoading}
      >
        {addLoading ? (
          <div className="flex items-center gap-3">
            <ButtonLoading size="md" />
            <span>Adding Task...</span>
          </div>
        ) : (
          <span>Add Task</span>
        )}
      </button>
    </form>
  );
}
