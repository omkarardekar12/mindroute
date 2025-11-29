import api from "./api.js";

export const getTodos = async (userId) => {
  const response = await api.get(`/todos/${userId}`);
  return response.data;
};

export const addTodo = async (userId, todo) => {
  const response = await api.post(`/todos/${userId}`);
  return response.data;
};

export const marksAsDoneTodo = async (userId, todoId) => {
  const response = await api.put(`/todos/${userId}/${todoId}`);
  return response.data;
};

export const deleteTodo = async (userId, todoId) => {
  const response = await api.delete(`/todos/${userId}/${todoId}`);
  return response.data;
};
