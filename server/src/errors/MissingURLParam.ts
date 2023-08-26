import ServerError from "./ServerError";
import { codes } from "dok-cloud-globals";

class MissingURLParam extends ServerError {
    constructor(param: string, status = 400) {
        super(codes.BAD_REQUEST, `Missing "${param}" URL param`, status);
    }
}

export default MissingURLParam;
