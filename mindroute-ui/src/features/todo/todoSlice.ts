import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getOrCreateUserId } from "../../utils/userId.ts";
import {
  getTodos as apiGetTodos,
  addTodo as apiAddTodo,
  markAsDoneTodo as apiMarkAsDoneTodo,
  deleteTodo as apiDeleteTodo,
  type Todo,
} from "../../service/todos.ts";

const userId = getOrCreateUserId();

interface TodoState {
  userId: string;
  todos: Todo[];
  loading: boolean;
  addLoading: boolean;
  markLoading: boolean;
  deleteLoading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  userId,
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk<Todo[]>(
  "todo/fetchTodos",
  async () => {
    const todos = await apiGetTodos(userId);
    return todos;
  }
);

export const addTodoAsync = createAsyncThunk<Todo, string>(
  "todo/addTodoAsync",
  async (task: string) => {
    const newTodo: Todo = {
      id: nanoid(),
      task,
      isDone: false,
    };

    await apiAddTodo(userId, newTodo);
    return newTodo;
  }
);

export const markAsDoneAsync = createAsyncThunk<string, string>(
  "todo/markAsDoneAsync",
  async (todoId: string) => {
    await apiMarkAsDoneTodo(userId, todoId);
    return todoId;
  }
);

export const deleteTodoAsync = createAsyncThunk<string, string>(
  "todo/deleteTodoAsync",
  async (todoId: string) => {
    await apiDeleteTodo(userId, todoId);
    return todoId;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || "Failed to load todos";
      });
  },
});

export default todoSlice.reducer;
