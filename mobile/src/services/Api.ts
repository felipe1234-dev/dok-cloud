import axios, { AxiosError } from "axios";
import { User, Document, Folder } from "dok-fortress-globals";
import { auth } from "./firebase";
import { isLocal, JSONToURLQuery } from "@functions";
import { Response, isResponse, Filters } from "@types";
import { LocalStorage } from "./LocalStorage";

const apiURL = isLocal()
    ? "http://127.0.0.1:5001/dokcloud-95c82/us-central1/default"
    : "";

const httpEndpoint = axios.create({
    baseURL: apiURL,
    timeout: 0,
});

httpEndpoint.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const responseData = error.response?.data;

        if (isResponse(responseData)) {
            const responseError: Response = {
                ...error,
                ...responseData,
            };

            return Promise.reject(responseError);
        } else {
            return Promise.reject(error);
        }
    }
);

const Api = {
    httpEndpoint,

    async ping() {
        await httpEndpoint.get("/ping");
    },

    auth: {
        recoverSession: async () => {
            try {
                const refreshToken = await LocalStorage.getItem("refreshToken");

                const { data } = await httpEndpoint.post("/auth/session", {
                    refreshToken,
                });

                const user = new User(data.user);
                httpEndpoint.defaults.headers.common.authorization = data.token;
                await auth.signInAnonymously();

                return user;
            } catch {
                await LocalStorage.removeItem("refreshToken");
                await auth.signOut();
                return undefined;
            }
        },
        login: async (
            email: string,
            password: string,
            rememberMe?: boolean
        ) => {
            const { data } = await httpEndpoint.post("/auth/login", {
                email,
                password,
                rememberMe,
            });

            const token: string = data.token;
            const refreshToken: string = data.refreshToken;
            const rememberMeToken: string = data.rememberMeToken;

            httpEndpoint.defaults.headers.common.authorization = token;
            await LocalStorage.setItem("refreshToken", refreshToken);
            await LocalStorage.setItem("rememberMeToken", rememberMeToken);
            await auth.signInAnonymously();

            return new User(data.user);
        },
        logout: async () => {
            await httpEndpoint.post("/auth/logout");
            httpEndpoint.defaults.headers.common.authorization = "";
            await LocalStorage.removeItem("refreshToken");
            await auth.signOut();
        },
        register: async (name: string, email: string, password: string) => {
            await httpEndpoint.post("/auth/register", {
                name,
                email,
                password,
            });
        },
    },

    documents: {
        async get(filters: Filters<Document> = {}) {
            const { data } = await httpEndpoint.get(
                `/documents/?${JSONToURLQuery(filters)}`
            );

            return (data.documents as any[]).map((data) => new Document(data));
        },
    },

    folders: {
        async get(filters: Filters<Folder> = {}) {
            const { data } = await httpEndpoint.get(
                `/folders/?${JSONToURLQuery(filters)}`
            );

            return (data.folders as any[]).map((data) => new Folder(data));
        },
    },
};

export { Api };
