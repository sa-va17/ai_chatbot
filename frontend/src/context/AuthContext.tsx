import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, logoutUser } from "../utils/api-communication";

type User = {
    name: string,
    email: string
}

type UserAuth = {
    isLoggedIn: boolean,
    user: User | null
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>
}

const AuthContext = createContext<UserAuth | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        //to fetch if cookies are valid. else skip login.
        async function checkStatus() {
            const data = await checkAuthStatus();
            if (data) {
                setUser({ email: data.email, name: data.name });
                setLoggedIn(true)
            }
        }
        checkStatus()
    }, []);

    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password)
        if (data) {
            setUser({ email: data.email, name: data.name });
            setLoggedIn(true);
        }
    }
    const signup = async (name: string, email: string, password: string) => { }
    const logout = async () => {
        await logoutUser();
        setLoggedIn(false);
        setUser(null);
        window.location.reload();
    }

    const value = {
        user,
        isLoggedIn,
        login,
        signup,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext)