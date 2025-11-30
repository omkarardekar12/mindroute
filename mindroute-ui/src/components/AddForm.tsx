import { useState } from "react";
import { useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store.ts";
import { addTodoAsync } from "../features/todo/todoSlice.ts";
import toast from "react-hot-toast";

export default function AddForm() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const submitHandler = (evt) => {
    evt.preventDefault();
    if (!task.trim()) {
      toast.error("Task cannot be empty!");
      return;
    }
    //console.log(task);
    dispatch(addTodo(task));
    toast.success("Task added!");
    setTask("");
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
        className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-xl outline-none placeholder-gray-500border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 transition"
      ></input>
      <button
        type="submit"
        className="px-5 py-3 bg-blue-600 rounded-xl font-semibold text-white hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!task.trim()}
      >
        Add Task
      </button>
    </form>
  );
}
