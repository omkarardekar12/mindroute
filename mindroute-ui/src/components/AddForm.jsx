import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import toast from "react-hot-toast";

export default function AddForm() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

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
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        ></input>
        <button>Add Task</button>
      </form>
    </>
  );
}
