import { RouteMiddleware } from "@typings";

const logRequestsMiddleware: RouteMiddleware = (req, res, next) => {
    console.log(
        "New request to",
        req.originalUrl,
        "at",
        new Date(),
        "from",
        req.headers.origin
    );
    console.log("req.query:", req.query);
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);
    return next();
};

export default logRequestsMiddleware;
