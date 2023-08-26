import DBAccess from "@services/DBAccess";
import { Document } from "dok-cloud-globals";

class DocumentsDB extends DBAccess<Document> {
    constructor() {
        super("documents");
    }

    public override async get() {
        const results = await super.get();
        return results.map((data) => new Document(data));
    }

    public getUserDocuments(userUid: string) {
        return this.where("createdBy", "==", userUid).get();
    }

    public async documentExists(uid: string) {
        const doc = await this.getByUid(uid);
        return !!doc;
    }
}

export default DocumentsDB;
