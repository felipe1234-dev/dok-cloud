import { Request, RouteController } from "@typings";
import { codes } from "dok-fortress-globals";
import { UsersDB } from "@databases";
import { Token } from "@services";
import {
    MissingBodyParam,
    NotFound,
    ServerError,
    Unauthenticated,
} from "@errors";

const refreshSessionController: RouteController = async (
    req: Request & {
        body: {
            refreshToken?: string;
        };
    },
    res
) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw new MissingBodyParam("refreshToken");

        const usersDB = new UsersDB();

        const user = await usersDB.getByRefreshToken(refreshToken);
        if (!user) throw new NotFound("Token not found");

        const tokenExpired = user.token && (await Token.isExpired(user.token));
        if (!user.token || tokenExpired) {
            await usersDB.uid(user.uid).update({ refreshToken: "" });
            throw new Unauthenticated("Token expired");
        }

        return res.sendResponse({
            status: 200,
            code: codes.SESSION_RECOVERED,
            message: "User session recovered successfully",
            user,
            token: user.token,
        });
    } catch (err) {
        return res.sendResponse(err as ServerError);
    }
};

export { refreshSessionController };
