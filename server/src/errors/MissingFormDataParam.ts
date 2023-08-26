import ServerError from "./ServerError";
import { codes } from "dok-cloud-globals";

class MissingFormDataParam extends ServerError {
    constructor(param: string, status = 400) {
        super(codes.BAD_REQUEST, `Missing "${param}" form field`, status);
    }
}

export default MissingFormDataParam;
