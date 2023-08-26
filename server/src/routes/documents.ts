import { HTTPRouter } from "@typings";
import { useRouteController, useRouteMiddleware } from "@utils";
import { authenticationMiddleware } from "@middlewares";
import {
    uploadDocumentController,
    uploadChunkController,
    searchDocumentsController,
} from "@controllers/documents";

const documentsRouter: HTTPRouter = (api) => {
    api.post(
        "/documents",
        useRouteMiddleware(authenticationMiddleware),
        useRouteController(uploadDocumentController)
    );
    api.get(
        "/documents",
        useRouteMiddleware(authenticationMiddleware),
        useRouteController(searchDocumentsController)
    );
    api.post(
        "/documents/:documentUid/chunks",
        useRouteMiddleware(authenticationMiddleware),
        useRouteController(uploadChunkController)
    );
    api.get(
        "/documents/:documentUid/chunks",
        useRouteMiddleware(authenticationMiddleware),
        useRouteController(uploadChunkController)
    );
};

export default documentsRouter;
