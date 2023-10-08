import axios, { AxiosError, AxiosResponse } from "axios";
import { codes } from "dok-fortress-globals";
import { isLocal } from "@functions";

interface APIResponse {
    status: number;
    code: (typeof codes)[keyof typeof codes];
    message: string;
    [key: string]: any;
}

function isAPIResponse(obj: any): obj is APIResponse {
    const possibleCodes = Object.values(codes);
    return (
        obj instanceof Object &&
        typeof obj.status === "number" &&
        typeof obj.message === "string" &&
        possibleCodes.includes(obj.code)
    );
}

const apiURL = isLocal()
    ? "http://localhost:5001/dokcloud-95c82/us-central1/default"
    : "";

const httpEndpoint = axios.create({
    baseURL: apiURL,
    timeout: 0,
});

httpEndpoint.interceptors.response.use(
    (response) => {
        const responseData = response.data;

        if (isAPIResponse(responseData)) {
            const apiResponse: APIResponse & AxiosResponse = {
                ...response,
                ...responseData,
            };

            return Promise.resolve(apiResponse);
        } else {
            return Promise.resolve(response);
        }
    },
    (error: AxiosError) => {
        const responseData = error.response?.data;

        if (isAPIResponse(responseData)) {
            const apiResponse: APIResponse = {
                ...error,
                ...responseData,
            };

            return Promise.reject(apiResponse);
        } else {
            return Promise.reject(error);
        }
    }
);

export default httpEndpoint;
