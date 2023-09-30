import { QueryListener, QuerySnapshot, DocumentData } from "@types";
import { createSnapshotListener } from "./createSnapshotListener";

function createQueryListener(runOnInit: boolean, callback: QueryListener) {
    return createSnapshotListener<QuerySnapshot<DocumentData>>(
        runOnInit,
        callback
    );
}

export { createQueryListener };
