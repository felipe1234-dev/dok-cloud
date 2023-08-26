import ServerError from "./ServerError";
import { codes } from "dok-cloud-globals";

class OverloadError extends ServerError {
    constructor(status = 400) {
        super(
            codes.BAD_REQUEST,
            "Memory space reserved for this document exceeded",
            status
        );
    }
}

export default OverloadError;
