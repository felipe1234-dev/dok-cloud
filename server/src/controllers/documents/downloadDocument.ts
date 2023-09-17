import { codes } from "dok-fortress-globals";
import { Request, RouteController } from "@typings";
import { DocumentsDB, ChunksDB } from "@databases";
import {
    Forbidden,
    MissingURLParam,
    NotFound,
    ServerError,
    Unauthenticated,
} from "@errors";

const downloadDocumentController: RouteController = async (
    req: {
        params: {
            documentUid?: string;
        };
    } & Request,
    res
) => {
    try {
        const { documentUid } = req.params;
        if (!documentUid) throw new MissingURLParam("documentUid");

        const { user } = req;
        if (!user) throw new Unauthenticated("You're not authenticated");

        const docDB = new DocumentsDB();
        const document = await docDB.getByUid(documentUid);
        if (!document) throw new NotFound("Document not found");

        if (document.createdBy !== user.uid)
            throw new Forbidden("You cannot download this document");

        if (document.loaded !== document.size)
            throw new Forbidden("This document is not fully loaded yet");

        const chunkDB = new ChunksDB();
        const chunks = await chunkDB.getDocumentChunks(document.uid);
        const bufferArr = chunks.reduce((arr, chunk) => {
            arr.push(...chunk.buffer);
            return arr;
        }, [] as number[]);
        const buffer = Buffer.from(bufferArr);

        res.sendResponse({
            status: 200,
            code: codes.DOCUMENT_DOWNLOADED,
            message: "Document downloaded successfully",
            document,
            buffer,
        });
    } catch (err) {
        res.sendResponse(err as ServerError);
    }
};

export { downloadDocumentController };
