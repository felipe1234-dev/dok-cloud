import { RouteMiddleware } from "@typings";
import { codes } from "dok-fortress-globals";
import { AxiosError } from "axios";

const responseFormatterMiddleware: RouteMiddleware = (req, res, next) => {
    res.sendResponse = (data) => {
        console.log(
            "Finishing request from",
            req.headers.origin,
            "... at",
            new Date()
        );

        if (data instanceof Error) {
            console.log("Finished request with error:");

            if (data instanceof AxiosError) {
                console.log(
                    "data.response?.data:",
                    JSON.stringify(data.response?.data || {}, null, 2)
                );
            }

            try {
                console.log("data:", JSON.stringify({ ...data }, null, 2));
            } catch {
                console.log("data:", data);
            }

            return res.status(data.status || 500).send({
                ...(data instanceof AxiosError ? data.response?.data : data),
                success: false,
                status: data.status || 500,
                code: data.code || codes.INTERNAL_SERVER_ERROR,
                message: data.message || "Unknown error",
            });
        } else {
            console.log("Finished successfully!");

            return res.status(data.status).send({
                ...data,
                success: true,
                status: data.status,
                code: data.code,
                message: data.message,
            });
        }
    };

    next();
};

export default responseFormatterMiddleware;
