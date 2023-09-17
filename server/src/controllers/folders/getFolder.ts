import { FoldersDB } from "@databases";
import { codes } from "dok-fortress-globals";
import { RouteController, Request } from "@typings";
import {
    MissingURLParam,
    NotFound,
    ServerError,
    Unauthenticated,
} from "@errors";

const getFolderController: RouteController = async (
    req: Request & {
        params: {
            folderUid?: string;
        };
    },
    res
) => {
    try {
        const { folderUid } = req.params;
        if (!folderUid) throw new MissingURLParam("folderUid");

        const currentUser = req.user;
        if (!currentUser) throw new Unauthenticated("You're not authenticated");

        const foldersDB = new FoldersDB();
        const folder = await foldersDB.getByUid(folderUid);

        if (!folder) throw new NotFound("Folder not found");

        return res.sendResponse({
            status: 200,
            code: codes.FOLDER_FETCHED,
            message: "Folder fetched successfully",
            folder,
        });
    } catch (err) {
        return res.sendResponse(err as ServerError);
    }
};

export { getFolderController };
