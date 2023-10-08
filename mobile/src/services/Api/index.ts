import { User, Document, Folder } from "dok-fortress-globals";
import { secureUserData, getChunks } from "dok-fortress-globals";
import { MAX_CHUNK_SIZE, INTEGER_SIZE } from "dok-fortress-globals";

import { JSONToURLQuery } from "@functions";
import { Filters, LocalFile } from "@types";

import { LocalStorage } from "../LocalStorage";
import { auth, documentCollection, userCollection } from "../firebase";

import endpoint from "./endpoint";
import {
    createDocumentListener,
    createQueryListener,
    filterByChangeType,
} from "./utils";

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
        async upload(localFile: LocalFile, folder: Folder): Promise<Document> {
            const { data } = await endpoint.post("/documents", {
                filename: localFile.name,
                folder: folder.uid,
                size: localFile.size,
            });

            const document = new Document(data.document);
            if (localFile.buffer)
                await Api.chunks.upload(document.uid, localFile.buffer);

            return document;
        },
        watch: (user: User) => ({
            onUpload(
                callback: (document: Document) => void,
                runOnInit = false
            ) {
                return documentCollection
                    .where("createdBy", "==", user.uid)
                    .onSnapshot(
                        createQueryListener(runOnInit, (snapshot) => {
                            const changes = filterByChangeType(
                                "added",
                                snapshot
                            );
                            for (const change of changes) {
                                const { doc } = change;
                                if (!doc.exists)
                                    throw new Error("Document not found");

                                const document = new Document(doc.data());
                                callback(document);
                            }
                        })
                    );
            },
            onUpdate(
                callback: (document: Document) => void,
                runOnInit = false
            ) {
                return documentCollection
                    .where("createdBy", "==", user.uid)
                    .onSnapshot(
                        createQueryListener(runOnInit, (snapshot) => {
                            const changes = filterByChangeType(
                                "modified",
                                snapshot
                            );

                            for (const change of changes) {
                                const { doc } = change;
                                if (!doc.exists)
                                    throw new Error("Document not found");

                                const document = new Document(doc.data());
                                callback(document);
                            }
                        })
                    );
            },
        }),
    },

    chunks: {
        async upload(documentUid: string, buffer: ArrayBuffer) {
            const typedArray = new Uint8Array(buffer);
            const arrayOfNumbers = Array.from(typedArray);

            const chunks = getChunks(
                arrayOfNumbers,
                MAX_CHUNK_SIZE / INTEGER_SIZE
            );

            console.log("arrayOfNumbers", arrayOfNumbers);
            console.log("chunks", chunks);
            console.log("MAX_CHUNK_SIZE", MAX_CHUNK_SIZE);
            console.log("INTEGER_SIZE", INTEGER_SIZE);  

            const promises: Promise<void>[] = [];
            for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];
                console.log("i", i);
                console.log("chunk", chunk);

                const promise = new Promise<void>(async (resolve, reject) => {
                    try {
                        await endpoint.post(
                            `/documents/${documentUid}/chunks`,
                            {
                                index: i,
                                buffer: chunk,
                            }
                        );
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                });

                promises.push(promise);
            }

            await Promise.all(promises);
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
        watch: (uid: string) => ({
            onUpdate(callback: (user: User) => void, runOnInit = false) {
                return userCollection.doc(uid).onSnapshot(
                    createDocumentListener(runOnInit, (snapshot) => {
                        if (!snapshot.exists) throw new Error("User not found");
                        const user = secureUserData(new User(snapshot.data()));
                        callback(user);
                    })
                );
            },
        }),
    },
};

export { Api };
