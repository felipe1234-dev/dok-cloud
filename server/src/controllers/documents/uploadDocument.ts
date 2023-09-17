import { Request, RouteController } from "@typings";
import { codes, Document } from "dok-fortress-globals";
import { DocumentsDB, FoldersDB } from "@databases";
import { getFileExtension, getFileMimetype } from "@utils";
import {
    MissingBodyParam,
    NotFound,
    ServerError,
    Unauthenticated,
} from "@errors";

const uploadDocumentController: RouteController = async (
    req: {
        body: {
            filename?: string;
            folder?: string;
            size?: number;
            metadata?: {
                [key: string]: any;
            };
        };
    } & Request,
    res
) => {
    try {
        const { filename, folder, size, metadata = {} } = req.body;

        if (!filename) throw new MissingBodyParam("filename");
        if (!folder) throw new MissingBodyParam("folder");
        if (!size) throw new MissingBodyParam("size");

        const { user } = req;
        if (!user) throw new Unauthenticated("You're not authenticated");

        const foldersDB = new FoldersDB();
        const folderExists = await foldersDB.folderExists(folder);
        if (!folderExists) throw new NotFound("Folder doesn't exist");

        const docDB = new DocumentsDB();

        const mimetype = getFileMimetype(filename);
        const extension = getFileExtension(filename);

        const newMetadata = {
            ...metadata,
            filename,
            mimetype,
            extension,
            size,
        };

        const newDocument = new Document({
            filename,
            mimetype,
            extension,
            size,
            folder,
            metadata: newMetadata,
            createdBy: user.uid,
        });

        await docDB.doc(newDocument.uid).create(newDocument);

        res.sendResponse({
            status: 200,
            code: codes.DOCUMENT_SAVED,
            message: "File saved successfully",
            document: newDocument,
        });
    } catch (err) {
        res.sendResponse(err as ServerError);
    }
};

export { uploadDocumentController };
