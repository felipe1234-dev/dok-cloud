import ServerError from "./ServerError";
import { codes } from "dok-fortress-globals";

class MissingHeaderParam extends ServerError {
    constructor(param: string, status = 400) {
        super(codes.BAD_REQUEST, `Missing "${param}" header param`, status);
    }
}

export default MissingHeaderParam;
