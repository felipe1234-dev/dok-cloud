import { FoldersDB } from "@databases";
import { codes, Folder } from "dok-fortress-globals";
import { RouteController, Request } from "@typings";
import { ServerError, Unauthenticated } from "@errors";

const createFolderController: RouteController = async (
    req: Request & {
        body: Partial<Folder>;
    },
    res
) => {
    try {
        const folderData = req.body;
        const currentUser = req.user;
        if (!currentUser) throw new Unauthenticated("You're not authenticated");

        const foldersDB = new FoldersDB();

        const newFolder = new Folder({
            ...folderData,
            deleted: false,
            createdBy: currentUser.uid,
        });

        await foldersDB.uid(newFolder.uid).create(newFolder);

        return res.sendResponse({
            status: 200,
            code: codes.FOLDER_FETCHED,
            message: "Folder created successfully",
            folder: newFolder,
        });
    } catch (err) {
        return res.sendResponse(err as ServerError);
    }
};

export { createFolderController };
