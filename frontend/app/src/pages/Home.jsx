import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-2xl mx-auto mt-20 space-y-6">
      <h1 className="text-2xl font-bold">ホーム</h1>

      <div className="p-4 border rounded">
        <p className="mb-2">ようこそ <span className="font-semibold">{user.name}</span> さん！</p>
        <button
          onClick={logout}
          className="border px-3 py-1 rounded hover:bg-gray-100"
        >
          ログアウト
        </button>
      </div>

      <p className="text-gray-500">
        ここから投稿一覧やプロフィール編集など SNS 機能を追加していきます。
      </p>
    </div>
  );
}