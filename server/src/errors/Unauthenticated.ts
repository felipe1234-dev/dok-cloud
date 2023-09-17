import ServerError from "./ServerError";
import { codes } from "dok-fortress-globals";

class Unauthenticated extends ServerError {
    constructor(message: string, status = 401) {
        super(codes.UNAUTHENTICATED, message, status);
    }
}

export default Unauthenticated;
