import axios from "axios";

// トークンを取得してヘッダーにセットする共通インスタンス
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

// リクエストごとに Authorization ヘッダを自動で追加
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ログイン：トークンを取得して保存
export async function login(data) {
  const res = await api.post("/api/login", data);
  localStorage.setItem("token", res.data.token);
  return res.data.user;
}

// 登録（ログインと同様にトークンを保存する場合）
export async function register(data) {
  const res = await api.post("/api/register", data);
  localStorage.setItem("token", res.data.token);
  return res.data.user;
}

// ログアウト：トークン削除
export async function logout() {
  // Laravel側でトークン失効処理があるなら以下を呼び出してもよい
  return api.post("/api/logout"); // APIが必要なら
}

// 現在のログインユーザー取得
export async function currentUser() {
  const res = await api.get("/api/user");
  return res.data;
}

export default api;