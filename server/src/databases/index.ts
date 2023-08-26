import configs from "@configs";
import admin from "firebase-admin";

const app = admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(configs.database.serviceAccount),
    databaseURL: configs.database.url,
    serviceAccountId: configs.database.serviceAccount.client_email,
    storageBucket: `${configs.database.serviceAccount.project_id}.appspot.com`,
});

const firestore = app.firestore();
firestore.settings({ ignoreUndefinedProperties: true });
const storage = app.storage();
const bucket = storage.bucket();

export { app, firestore, storage, bucket };

export { default as UsersDB } from "./UsersDB";
export { default as FoldersDB } from "./FoldersDB";
export { default as DocumentsDB } from "./DocumentsDB";
export { default as ChunksDB } from "./ChunksDB";
