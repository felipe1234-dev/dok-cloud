import { FoldersDB } from "@databases";
import { Folder, codes } from "dok-fortress-globals";
import { RouteController, Request } from "@typings";
import { stringToWhere } from "@utils";
import { ServerError, Unauthenticated } from "@errors";

const searchFoldersController: RouteController = async (
    req: Request & {
        query: {
            where?: string;
            or?: string;
            startAfter?: string;
            limit?: string;
        };
    },
    res
) => {
    try {
        const { where, or, limit, startAfter } = req.query;
        const currentUser = req.user;
        if (!currentUser) throw new Unauthenticated("You're not authenticated");

        let query = new FoldersDB();

        if (where) {
            for (const operation of where.split(",")) {
                const args = stringToWhere<Folder>(operation);
                if (!args) continue;

                query = query.where(...args);
            }
        }

        if (or) {
            const operations = or.split(",");
            const firstWhere = stringToWhere<Folder>(operations[0]);

            operations.shift();

            if (firstWhere) {
                query = query.or(...firstWhere);

                for (const operation of operations) {
                    const args = stringToWhere<Folder>(operation);
                    if (!args) continue;

                    query = query.where(...args);
                }
            }
        }

        if (startAfter) {
            query = query.startAfter(startAfter);
        }

        if (limit) {
            query = query.limit(Number(limit));
        }

        const folders = await query.get();

        return res.sendResponse({
            status: 200,
            code: codes.FOLDERS_FETCHED,
            message: "Folders fetched successfully",
            folders,
        });
    } catch (err) {
        return res.sendResponse(err as ServerError);
    }
};

export { searchFoldersController };
