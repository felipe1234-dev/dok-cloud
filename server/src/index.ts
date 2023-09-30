// @ts-ignore
import * as functions from "firebase-functions";
import express from "express";

import { useRouteMiddleware } from "@utils";
import {
    corsMiddleware,
    responseFormatterMiddleware,
    logRequestsMiddleware,
} from "@middlewares";
import {
    authRouter,
    usersRouter,
    documentsRouter,
    foldersRouter,
} from "@routes";
import { expireTokens, bandwidthMonthlyReset } from "@schedules";

const api = functions.runWith({
    timeoutSeconds: 540,
    memory: "8GB",
});

const https = api.https;
const scheduler = api.pubsub;

const app = express();

// Global route middlewares
app.use("/*", express.json());
app.use("/*", useRouteMiddleware(responseFormatterMiddleware));
app.use("/*", useRouteMiddleware(corsMiddleware));
app.use("/*", useRouteMiddleware(logRequestsMiddleware));

// Ping
app.get("/ping", (req, res) => res.status(200).send("Ping"));

// HTTP routes
authRouter(app);
usersRouter(app);
documentsRouter(app);
foldersRouter(app);

// Schedules
export const expireTokensJob = scheduler
    .schedule("every 1 hour")
    .onRun(expireTokens);
export const bandwidthMonthlyResetJob = scheduler
    .schedule("0 0 1 * *")
    .onRun(bandwidthMonthlyReset);

export default https.onRequest(app);
