import {
    ChangeType,
    DocumentChange,
    DocumentData,
    QuerySnapshot,
} from "@types";

function filterByChangeType(
    changeType: ChangeType,
    snapshot: QuerySnapshot<DocumentData>
): DocumentChange<DocumentData>[] {
    const changes = snapshot.docChanges();
    return changes.filter((change) => change.type === changeType);
}

export { filterByChangeType };
