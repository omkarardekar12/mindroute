import { useSelector } from "react-redux";
import AddForm from "./AddForm";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../features/todo/todoSlice";
import { marksAsDone } from "../features/todo/todoSlice";

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
    <div>
      <AddForm />
      <h2>Todo List App</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.isDone ? (
              <span
                style={{ textDecorationLine: "line-through", color: "red" }}
              >
                {todo.task}
              </span>
            ) : (
              <span>{todo.task}</span>
            )}
            &nbsp;&nbsp;&nbsp;
            <button onClick={() => clickHandler(todo.id)}>Delete</button>
            &nbsp;&nbsp;
            {!todo.isDone && (
              <button onClick={() => markAsDone(todo.id)}>Mark As Done</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
