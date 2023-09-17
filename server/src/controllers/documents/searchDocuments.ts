import { DocumentsDB } from "@databases";
import { codes, Document } from "dok-fortress-globals";
import { RouteController, Request } from "@typings";
import { stringToWhere } from "@utils";
import { ServerError, Unauthenticated } from "@errors";

const searchDocumentsController: RouteController = async (
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

        let query = new DocumentsDB();

        if (where) {
            for (const operation of where.split(",")) {
                const args = stringToWhere<Document>(operation);
                if (!args) continue;

                query = query.where(...args);
            }
        }

        if (or) {
            const operations = or.split(",");
            const firstWhere = stringToWhere<Document>(operations[0]);

            operations.shift();

            if (firstWhere) {
                query = query.or(...firstWhere);

                for (const operation of operations) {
                    const args = stringToWhere<Document>(operation);
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

        const documents = await query.get();

        return res.sendResponse({
            status: 200,
            code: codes.DOCUMENTS_FETCHED,
            message: "Documents fetched successfully",
            documents,
        });
    } catch (err) {
        return res.sendResponse(err as ServerError);
    }
};

export { searchDocumentsController };
