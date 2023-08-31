import { HTTPRouter } from "@typings";
import { useRouteController, useRouteMiddleware } from "@utils";
import { authenticationMiddleware } from "@middlewares";
import {
    createFolderController,
    searchFoldersController,
    getFolderController,
    updateFolderController,
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
        useRouteController(getFolderController)
    );
    api.patch(
        "/folders/:folderUid",
        useRouteMiddleware(authenticationMiddleware),
        useRouteController(updateFolderController)
    );
};

export default foldersRouter;
