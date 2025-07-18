import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(form);          // ← AuthContext 経由
      nav("/");                   // ログイン後 Home へ
    } catch (err) {
      setError("ログインに失敗しました");
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-xl font-bold mb-6">ログイン</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="メールアドレス"
          type="email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="パスワード"
          type="password"
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          ログイン
        </button>
      </form>
      <p className="mt-4 text-sm">
        アカウントが無い方は <Link to="/register" className="text-blue-600 underline">新規登録</Link>
      </p>
    </div>
  );
}