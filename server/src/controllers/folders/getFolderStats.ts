import { DocumentsDB, FoldersDB } from "@databases";
import { Folder, codes } from "dok-fortress-globals";
import { RouteController, Request } from "@typings";
import {
    MissingURLParam,
    NotFound,
    ServerError,
    Unauthenticated,
    Unauthorized,
} from "@errors";

async function getFolderSize(folder: Folder) {
    const foldersDB = new FoldersDB();
    const documentsDB = new DocumentsDB();

    const folders = await foldersDB.where("folder", "==", folder.uid).and("deleted", "==", false).get();
    const documents = await documentsDB.where("folder", "==", folder.uid).and("deleted", "==", false).get();

    let totalSize = 0;

    for (const document of documents) {
        totalSize += document.size;
    }

    for (const folder of folders) {
        const size = await getFolderSize(folder);
        totalSize += size;
    }

    return totalSize;
}

const getFolderStatsController: RouteController = async (
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

        if (folder.createdBy !== currentUser.uid) throw new Unauthorized("You're not authorized");

        const size = await getFolderSize(folder);

        return res.sendResponse({
            status: 200,
            code: codes.FOLDER_STATS_FETCHED,
            message: "Folder stats fetched successfully",
            stats: { size },
        });
    } catch (err) {
        return res.sendResponse(err as ServerError);
    }
};

export { getFolderStatsController };
