import { createContext, useContext, useEffect, useState } from "react";
import { currentUser, login, logout, register } from "../lib/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
// export function useAuth() {
// return useContext(AuthContext);
// }

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

    return loading ? null : <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}