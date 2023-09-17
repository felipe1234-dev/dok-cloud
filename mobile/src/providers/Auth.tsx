import React, { createContext, useContext, useEffect, useState } from "react";
import { User, codes } from "dok-fortress-globals";
import { Api } from "@services";
import { useLoader } from "./Loader";

interface AuthValue {
    user?: User;
    login: (
        email: string,
        password: string,
        rememberMe: boolean
    ) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | undefined>(undefined);

function AuthProvider(props: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>();
    const loader = useLoader();

    const login = async (
        email: string,
        password: string,
        rememberMe: boolean
    ) => {
        const response = await Api.auth.login(email, password, rememberMe);
        setUser(response);
    };

    const logout = async () => {
        if (!user) return;
        await Api.auth.logout();
        setUser(undefined);
    };

    useEffect(() => {
        Api.httpEndpoint.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                if (error.code === codes.UNAUTHENTICATED) await logout();
                return Promise.reject(error);
            }
        );

        loader.show();
        Api.auth.recoverSession().then(setUser).finally(loader.hide);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
}

export { AuthContext, AuthProvider, useAuth };
