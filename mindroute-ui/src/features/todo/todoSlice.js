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
      state.loading = true;
      try {
        const newTodo = {
          id: nanoid(),
          task: action.payload,
          isDone: false,
        };
        const response = apiAddTodo(userId, newTodo);
        state.todos.push(newTodo);
      } catch (err) {
        state.todos = state.todos;
      } finally {
        state.loading = false;
      }
    },
    deleteTodo: (state, action) => {
      state.loading = true;
      try {
        const todoId = action.payload;
        const response = apiDeleteTodo(user, todoId);
        state.todos = state.todos.filter((todo) => todo.id !== todoId);
      } catch (err) {
        state.todos = state.todos;
      } finally {
        state.loading = false;
      }
    },
    marksAsDone: (state, action) => {
      state.loading = true;
      try {
        const todoId = action.payload;
        const response = apiMarkAsDoneTodo(userId, todoId);
        state.todos = state.todos.map((todo) => {
          if (todo.id === todoId) {
            return { ...todo, isDone: true };
          }
          return todo;
        });
      } catch (err) {
        state.todos = state.todos;
      } finally {
        state.loading = false;
      }
    },
  },
});

export const { addTodo, deleteTodo, marksAsDone } = todoSlice.actions;
export default todoSlice.reducer;
