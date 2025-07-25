import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true, 
    headers: {
        "Content-Type": "application/json",
    },
});


// src/services/api.js
export const getProducts = (page = 1) => API.get(`/products?page=${page}`);
export const addProduct = (data) => API.post("/products", data);
export const updateProductQuantity = (id, quantity) =>
  API.put(`/products/${id}/quantity`, { quantity });


export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
