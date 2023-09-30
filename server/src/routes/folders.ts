import { HTTPRouter } from "@typings";
import { useRouteController, useRouteMiddleware } from "@utils";
import { authenticationMiddleware } from "@middlewares";
import {
    createFolderController,
    searchFoldersController,
    findFolderController,
    updateFolderController,
    getFolderStatsController,
} from "@controllers/folders";

const foldersRouter: HTTPRouter = (api) => {
    api.get(
        "/folders",
        useRouteMiddleware(authenticationMiddleware),
        useRouteController(searchFoldersController)
    );
    api.post(
        "/folders",
        useRouteMiddleware(authenticationMiddleware),
        useRouteController(createFolderController)
    );

    api.get(
        "/folders/:folderUid",
        useRouteMiddleware(authenticationMiddleware),
        useRouteController(findFolderController)
    );
    api.patch(
        "/folders/:folderUid",
        useRouteMiddleware(authenticationMiddleware),
        useRouteController(updateFolderController)
    );
    api.get(
        "/folders/:folderUid/stats",
        useRouteMiddleware(authenticationMiddleware),
        useRouteController(getFolderStatsController)
    );
};

export default foldersRouter;
