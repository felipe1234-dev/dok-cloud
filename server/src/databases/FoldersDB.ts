import DBAccess from "@services/DBAccess";
import { Folder } from "dok-fortress-globals";

class FoldersDB extends DBAccess<Folder> {
    constructor() {
        super("folders");
    }

    public override async get() {
        const results = await super.get();
        return results.map((data) => new Folder(data));
    }

    public async folderExists(uid: string) {
        const doc = await this.getByUid(uid);
        return !!doc;
    }
}

export default FoldersDB;
