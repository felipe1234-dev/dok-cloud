import ServerError from "./ServerError";
import { codes } from "dok-fortress-globals";

class Forbidden extends ServerError {
    constructor(message: string, status = 403) {
        super(codes.FORBIDDEN, message, status);
    }
}

export default Forbidden;
