import { codes } from "dok-cloud-globals";

interface Response {
    status: number;
    code: (typeof codes)[keyof typeof codes];
    message: string;
    [key: string]: any;
}

function isResponse(obj: any): obj is Response {
    const possibleCodes = Object.values(codes);
    return (
        obj instanceof Object &&
        typeof obj.status === "number" &&
        typeof obj.message === "string" &&
        possibleCodes.includes(obj.code)
    );
}

export type { Response };
export { isResponse };
