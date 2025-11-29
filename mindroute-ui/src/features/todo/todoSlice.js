import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getOrCreateUserId } from "../../utils/userId.js";
import {
  getTodos,
  addTodo,
  marksAsDoneTodo,
  deleteTodo,
} from "../../service/todos.js";

const initialState = {
  userId: getOrCreateUserId(),
  todos: [],
  loading: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getTodos: async (state, action) => {
      state.loading = true;
      try {
        const todos = await getTodos(state.userId);
        state.todos = todos;
      } catch (err) {
        state.todos = [];
      } finally {
        state.loading = false;
      }
    },
    addTodo: async (state, action) => {
      state.loading = true;
      try {
        const newTodo = {
          id: nanoid(),
          task: action.payload,
          isDone: false,
        };
        const response = await addTodo(userId, newTodo);
        state.todos.push(newTodo);
      } catch (err) {
        state.todos = state.todos;
      } finally {
        state.loading = false;
      }
    },
    deleteTodo: async (state, action) => {
      state.loading = true;
      try {
        const todoId = action.payload;
        const response = await deleteTodo(user, todoId);
        state.todos = state.todos.filter((todo) => todo.id !== todoId);
      } catch (err) {
        state.todos = state.todos;
      } finally {
        state.loading = false;
      }
    },
    marksAsDone: async (state, action) => {
      state.loading = true;
      try {
        const todoId = action.payload;
        const response = await marksAsDoneTodo(userId, todoId);
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
