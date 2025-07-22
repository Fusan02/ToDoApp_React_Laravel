import { createContext, useContext, useEffect, useState } from "react";
import { currentUser, login, logout, register } from "../lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function bootstrap() {
        try {
            const u = await currentUser();
            setUser(u);
        } catch (_) { 
            // 未ログインのため何もしない
        }
        setLoading(false);
    }
    
    // 初期化時に現在のユーザーを取得
    // これにより、ページリロード後もログイン状態を維持できる
    // また、useEffectの依存配列を空にすることで、コンポーネントのマウント時にのみ実行される
    // これにより、無限ループを防ぎます。
    useEffect(() => { bootstrap(); }, []);
    
    const value = {
        user,
        login: async (data) => {
            await login(data);
            await bootstrap();
        },
        register: async (data) => {
            await register(data);
            await bootstrap();
        },
        logout: async () => {
            await logout();
            setUser(null);
        }
    };

    if (loading) {
        return null; // ローディング中は何も表示しない
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}