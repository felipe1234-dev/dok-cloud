import { User, Document, Folder, secureUserData } from "dok-fortress-globals";

import { JSONToURLQuery } from "@functions";
import { Filters } from "@types";

import { LocalStorage } from "../LocalStorage";
import { auth, userCollection } from "../firebase";

import endpoint from "./endpoint";
import { createDocumentListener } from "./utils";

const Api = {
    endpoint,

    async ping() {
        await endpoint.get("/ping");
    },

    auth: {
        async recoverSession() {
            try {
                const refreshToken = await LocalStorage.getItem("refreshToken");

                const { data } = await endpoint.post("/auth/session", {
                    refreshToken,
                });

                const user = new User(data.user);
                endpoint.defaults.headers.common.authorization = data.token;
                await auth.signInAnonymously();

                return user;
            } catch {
                await LocalStorage.removeItem("refreshToken");
                await auth.signOut();
                return undefined;
            }
        },
        async login(email: string, password: string, rememberMe?: boolean) {
            const { data } = await endpoint.post("/auth/login", {
                email,
                password,
                rememberMe,
            });

            const token: string = data.token;
            const refreshToken: string = data.refreshToken;
            const rememberMeToken: string = data.rememberMeToken;

            endpoint.defaults.headers.common.authorization = token;
            await LocalStorage.setItem("refreshToken", refreshToken);
            await LocalStorage.setItem("rememberMeToken", rememberMeToken);
            await auth.signInAnonymously();

            return new User(data.user);
        },
        async logout() {
            await endpoint.post("/auth/logout");
            endpoint.defaults.headers.common.authorization = "";
            await LocalStorage.removeItem("refreshToken");
            await auth.signOut();
        },
        async register(name: string, email: string, password: string) {
            await endpoint.post("/auth/register", {
                name,
                email,
                password,
            });
        },
    },

    documents: {
        async get(uid: string) {
            const { data } = await endpoint.get(`/documents/${uid}`);
            return new Document(data.document);
        },
        async list(filters: Filters<Document> = {}) {
            const { data } = await endpoint.get(
                `/documents/?${JSONToURLQuery(filters)}`
            );

            return (data.documents as any[]).map((data) => new Document(data));
        },
    },

    folders: {
        async get(uid: string) {
            const { data } = await endpoint.get(`/folders/${uid}`);
            return new Folder(data.folder);
        },
        async list(filters: Filters<Folder> = {}) {
            const { data } = await endpoint.get(
                `/folders/?${JSONToURLQuery(filters)}`
            );

            return (data.folders as any[]).map((data) => new Folder(data));
        },
    },

    users: {
        async get(uid: string) {
            const { data } = await endpoint.get(`/users/${uid}`);
            return new User(data.user);
        },
        async update(uid: string, updates: Partial<User>) {
            await endpoint.put(`/users/${uid}`, updates);
        },
        watch(uid: string) {
            return {
                onUpdate(callback: (user: User) => void, runOnInit = false) {
                    return userCollection.doc(uid).onSnapshot(
                        createDocumentListener(runOnInit, (snapshot) => {
                            if (!snapshot.exists)
                                throw new Error("User not found");

                            const user = secureUserData(
                                new User(snapshot.data())
                            );
                            callback(user);
                        })
                    );
                },
            };
        },
    },
};

export { Api };
