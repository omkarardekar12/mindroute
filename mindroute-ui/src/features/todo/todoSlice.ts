import {
  createSlice,
  nanoid,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
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
  addLoading: false,
  markLoading: false,
  deleteLoading: false,
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
        state.error = action.error.message || "Failed to load todos";
      })

      .addCase(addTodoAsync.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.addLoading = false;
        state.todos.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.error.message || "Failed to add todo";
      })

      .addCase(markAsDoneAsync.pending, (state) => {
        state.markLoading = true;
        state.error = null;
      })
      .addCase(
        markAsDoneAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.markLoading = false;
          const todoId = action.payload;
          state.todos = state.todos.map((todo) =>
            todo.id === todoId ? { ...todo, isDone: true } : todo
          );
        }
      )
      .addCase(markAsDoneAsync.rejected, (state, action) => {
        state.markLoading = false;
        state.error = action.error.message || "Failed to mark todo as done";
      })

      .addCase(deleteTodoAsync.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(
        deleteTodoAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.deleteLoading = false;
          const todoId = action.payload;
          state.todos = state.todos.filter((todo) => todo.id !== todoId);
        }
      )
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.error.message || "Failed to delete todo";
      });
  },
});

export default todoSlice.reducer;
