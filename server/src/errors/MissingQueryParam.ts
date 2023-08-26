import ServerError from "./ServerError";
import { codes } from "dok-cloud-globals";

class MissingQueryParam extends ServerError {
    constructor(param: string, status = 400) {
        super(codes.BAD_REQUEST, `Missing "${param}" query param`, status);
    }
}

export default MissingQueryParam;
