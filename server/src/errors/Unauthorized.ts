import ServerError from "./ServerError";
import { codes } from "dok-fortress-globals";

class Unauthorized extends ServerError {
    constructor(message: string, status = 403) {
        super(codes.UNAUTHORIZED, message, status);
    }
}

export default Unauthorized;
