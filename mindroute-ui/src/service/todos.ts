import api from "./api.js";

export interface Todo {
  id: string;
  task: string;
  isDone: boolean;
}

export const getTodos = async (userId: string): Promise<Todo[]> => {
  const response = await api.get<Todo[]>(`/todos/${userId}`);
  return response.data;
};

export const addTodo = async (userId: string, todo: Todo): Promise<Todo> => {
  const response = await api.post<Todo>(`/todos/${userId}`, todo);
  return response.data;
};

export const markAsDoneTodo = async (
  userId: string,
  todoId: string
): Promise<{ success: boolean }> => {
  const response = await api.put<{ success: boolean }>(
    `/todos/${userId}/${todoId}`
  );
  return response.data;
};

export const deleteTodo = async (
  userId: string,
  todoId: string
): Promise<{ success: boolean }> => {
  const response = await api.delete<{ success: boolean }>(
    `/todos/${userId}/${todoId}`
  );
  return response.data;
};
