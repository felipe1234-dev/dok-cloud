import { DocumentListener, DocumentSnapshot, DocumentData } from "@types";
import { createSnapshotListener } from "./createSnapshotListener";

function createDocumentListener(
    runOnInit: boolean,
    callback: DocumentListener
) {
    return createSnapshotListener<DocumentSnapshot<DocumentData>>(
        runOnInit,
        callback
    );
}

export { createDocumentListener };
