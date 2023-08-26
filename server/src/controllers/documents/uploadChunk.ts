import { Request, RouteController } from "@typings";
import { Chunk, codes } from "dok-cloud-globals";
import { DocumentsDB, ChunksDB } from "@databases";
import {
    Forbidden,
    MissingBodyParam,
    MissingURLParam,
    NotFound,
    Overload,
    ServerError,
    Unauthenticated,
} from "@errors";

const uploadChunkController: RouteController = async (
    req: {
        params: {
            documentUid?: string;
        };
        body: {
            buffer?: number[];
        };
    } & Request,
    res
) => {
    try {
        const { documentUid } = req.params;
        const { buffer } = req.body;

        if (!documentUid) throw new MissingURLParam("documentUid");
        if (!buffer) throw new MissingBodyParam("buffer");

        const { user } = req;
        if (!user) throw new Unauthenticated("You're not authenticated");

        const docDB = new DocumentsDB();
        const document = await docDB.getByUid(documentUid);
        if (!document) throw new NotFound("Document not found");

        if (document.createdBy !== user.uid)
            throw new Forbidden("You cannot change this document");

        if (document.loaded >= document.size)
            throw new Forbidden("All chunks area loaded!");

        const loaded = document.loaded + buffer.length;
        if (loaded > document.size) throw new Overload();

        const chunkDB = new ChunksDB();

        const lastChunk = await chunkDB.getLastChunk(documentUid);
        const lastIndex = lastChunk?.index || -1;
        const index = lastIndex + 1;

        const newChunk = new Chunk({
            index,
            document: documentUid,
            buffer,
            createdBy: user.uid,
        });

        await chunkDB.doc(newChunk.uid).create(newChunk);
        await docDB.doc(document.uid).update({ loaded });

        document.loaded = loaded;

        res.sendResponse({
            status: 200,
            code: codes.CHUNK_SAVED,
            message: "Chunk saved successfully",
            document,
            chunk: newChunk,
        });
    } catch (err) {
        res.sendResponse(err as ServerError);
    }
};

export { uploadChunkController };
