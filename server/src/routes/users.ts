import { HTTPRouter } from "@typings";
import { useRouteController, useRouteMiddleware } from "@utils";
import { authenticationMiddleware } from "@middlewares";
import {
    getUserByUidController,
    updateUserController,
} from "@controllers/users";

const usersRouter: HTTPRouter = (api) => {
    api.get(
        "/users/:userUid",
        useRouteMiddleware(authenticationMiddleware),
        useRouteController(getUserByUidController)
    );
    api.put(
        "/users/:userUid",
        useRouteMiddleware(authenticationMiddleware),
        useRouteController(updateUserController)
    );
};

export default usersRouter;
