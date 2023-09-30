import { DocumentsDB } from "@databases";
import { codes } from "dok-fortress-globals";
import { RouteController, Request } from "@typings";
import {
    MissingURLParam,
    NotFound,
    ServerError,
    Unauthenticated,
} from "@errors";

const findDocumentController: RouteController = async (
    req: Request & {
        params: {
            documentUid?: string;
        };
    },
    res
) => {
    try {
        const { documentUid } = req.params;
        if (!documentUid) throw new MissingURLParam("documentUid");

        const currentUser = req.user;
        if (!currentUser) throw new Unauthenticated("You're not authenticated");

        const docDB = new DocumentsDB();
        const document = await docDB.getByUid(documentUid);

        if (!document) throw new NotFound("Document not found");

        return res.sendResponse({
            status: 200,
            code: codes.DOCUMENT_FETCHED,
            message: "Document fetched successfully",
            document,
        });
    } catch (err) {
        return res.sendResponse(err as ServerError);
    }
};

export { findDocumentController };
