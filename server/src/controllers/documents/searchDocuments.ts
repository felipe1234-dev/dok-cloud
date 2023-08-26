import { DocumentsDB } from "@databases";
import { codes, operators, Document, Operator } from "dok-cloud-globals";
import { RouteController, Request } from "@typings";
import { ServerError, Unauthenticated } from "@errors";

const stringToWhere = (str: string) => {
    if (!str) return undefined;

    const operator = operators.find((operator) => str.includes(operator));
    if (!operator) return undefined;

    const [field, value] = str.split(operator);
    return [field, operator, value] as [
        field: keyof Document,
        operator: Operator,
        value: Document[keyof Document],
    ];
};

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
        const currentDocument = req.user;
        if (!currentDocument)
            throw new Unauthenticated("You're not authenticated");

        let query = new DocumentsDB();

        if (where) {
            for (const operation of where.split(",")) {
                const args = stringToWhere(operation);
                if (!args) continue;

                query = query.where(...args);
            }
        }

        if (or) {
            const operations = or.split(",");
            const firstWhere = stringToWhere(operations[0]);

            operations.shift();

            if (firstWhere) {
                query = query.or(...firstWhere);

                for (const operation of operations) {
                    const args = stringToWhere(operation);
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
