import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    // @ts-ignore
} from "@env";

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
};

const app = firebase.initializeApp(firebaseConfig, PROJECT_ID);
const storage = app.storage();

const firestore = app.firestore();
firestore.settings({ ignoreUndefinedProperties: true });

const auth = app.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const userCollection = firestore.collection("users");
const folderCollection = firestore.collection("folders");
const chunkCollection = firestore.collection("chunks");
const documentCollection = firestore.collection("documents");
const planCollection = firestore.collection("plans");

export {
    firestore,
    storage,
    auth,
    userCollection,
    folderCollection,
    chunkCollection,
    documentCollection,
    planCollection,
};
