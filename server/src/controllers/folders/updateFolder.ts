import { FoldersDB } from "@databases";
import { codes, Folder } from "dok-cloud-globals";
import { RouteController, Request } from "@typings";
import {
    MissingURLParam,
    NotFound,
    ServerError,
    Unauthenticated,
    Unauthorized,
} from "@errors";

const updateFolderController: RouteController = async (
    req: Request & {
        params: {
            folderUid?: string;
        };
        body: Partial<Folder>;
    },
    res
) => {
    try {
        const { folderUid } = req.params;
        if (!folderUid) throw new MissingURLParam("folderUid");

        const foldersDB = new FoldersDB();
        const originalFolder = await foldersDB.getByUid(folderUid);
        if (!originalFolder) throw new NotFound("Folder not found");

        const currentUser = req.user;
        if (!currentUser) throw new Unauthenticated("You're not authenticated");

        if (originalFolder.createdBy !== currentUser.uid)
            throw new Unauthorized("You are not allowed to update this folder");

        const updates = req.body;
        const {
            uid,
            deleted,
            deletedAt,
            createdBy,
            createdAt,
            ...secureUpdates
        } = updates;

        await foldersDB.uid(folderUid).update({ ...secureUpdates });
        const updatedFolder = await foldersDB.uid(folderUid).get();

        return res.sendResponse({
            status: 200,
            code: codes.FOLDER_FETCHED,
            message: "Folder created successfully",
            folder: updatedFolder,
        });
    } catch (err) {
        return res.sendResponse(err as ServerError);
    }
};

export { updateFolderController };
