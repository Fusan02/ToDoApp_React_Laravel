import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE, // http://localhost:8000
    withCredentials: true   // クッキー送受信
});

export async function getCsrf() {
    await api.get("/sanctum/scrf-coookie");
}

export async function register(data) {
    await getCsrf();
    return api.post("/register", data);
}

export async function login(data) {
    await getCsrf();
    return api.post("/login", data);
}

export async function logout() {
    return api.post("/logout");
}

export async function currentUser() {
    return api.get("/api/user").then(res => res.data);
}

export default api;