import axios from "axios";

const api = axios.create({
  baseURL: "/api/inventory",
});

export const addItem = (formData) => api.post("/", formData);
export const getAllItems = () => api.get("/");
export const updateItem = (id, formData) => api.put(`/${id}`, formData);
export const deleteItem = (id) => api.delete(`/${id}`);

export default api;
