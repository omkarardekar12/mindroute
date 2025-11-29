import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getOrCreateUserId } from "../../utils/userId.js";

const userId = getOrCreateUserId();

const initialState = {
  userId,
  todos: [],
  loading: false,
  error: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        task: action.payload,
        isDone: false,
      };
      state.todos.push(newTodo);
    },
    deleteTodo: (state, action) => {
      const todoId = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
    marksAsDone: (state, action) => {
      const todoId = action.payload;
      state.todos = state.todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, isDone: true };
        }
        return todo;
      });
    },
  },
});

export const { addTodo, deleteTodo, marksAsDone } = todoSlice.actions;
export default todoSlice.reducer;
