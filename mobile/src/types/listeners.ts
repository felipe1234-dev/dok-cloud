import firebase from "firebase/compat";

export type QuerySnapshot<T> = firebase.firestore.QuerySnapshot<T>;
export type DocumentSnapshot<T> = firebase.firestore.DocumentSnapshot<T>;
export type DocumentData = firebase.firestore.DocumentData;
export type ChangeType = firebase.firestore.DocumentChangeType | "any";
export type DocumentListener = (
    snapshot: DocumentSnapshot<DocumentData>
) => void;
export type QueryListener = (snapshot: QuerySnapshot<DocumentData>) => void;
export type DocumentChange<T> = firebase.firestore.DocumentChange<T>;
