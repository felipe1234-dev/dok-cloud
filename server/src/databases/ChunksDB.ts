import DBAccess from "@services/DBAccess";
import { Chunk } from "dok-fortress-globals";

class ChunksDB extends DBAccess<Chunk> {
    constructor() {
        super("chunks");
    }

    public override async get() {
        const results = await super.get();
        return results.map((data) => new Chunk(data));
    }

    public getDocumentChunks(documentUid: string) {
        return this.where("document", "==", documentUid)
            .orderBy("index", "asc")
            .get();
    }

    public async getLastChunk(documentUid: string) {
        const chunks = await this.where("document", "==", documentUid)
            .orderBy("index", "asc")
            .get();

        return chunks[chunks.length - 1] || undefined;
    }

    public async getFirstChunk(documentUid: string) {
        const chunks = await this.where("document", "==", documentUid)
            .orderBy("index", "asc")
            .get();

        return chunks[0] || undefined;
    }
}

export default ChunksDB;
