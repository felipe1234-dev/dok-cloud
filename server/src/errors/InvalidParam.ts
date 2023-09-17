import ServerError from "./ServerError";
import { codes } from "dok-fortress-globals";

class InvalidParam extends ServerError {
    constructor(message: string, status = 400) {
        super(codes.BAD_REQUEST, message, status);
    }
}

export default InvalidParam;
