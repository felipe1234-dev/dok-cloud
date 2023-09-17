import ServerError from "./ServerError";
import { codes } from "dok-fortress-globals";

class NotFound extends ServerError {
    constructor(message: string, status = 404) {
        super(codes.NOT_FOUND, message, status);
    }
}

export default NotFound;
