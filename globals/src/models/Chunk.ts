import { generateUid, toDate } from "../functions";

class Chunk {
    public uid: string;
    public document: string;
    public buffer: string;
    public index: number;
    public deleted: boolean;
    public deletedAt?: Date;
    public createdBy: string;
    public createdAt: Date;

    constructor(data: Partial<Chunk> = {}) {
        const prefix = "chunk-";

        const {
            uid = generateUid(prefix, prefix.length + 25),
            document = "",
            buffer = "",
            index = 0,
            deleted = false,
            deletedAt,
            createdAt = new Date(),
            createdBy = "",
        } = data;

        this.uid = uid;
        this.document = document;
        this.buffer = buffer;
        this.index = index;
        this.deleted = deleted;
        if (deletedAt) this.deletedAt = toDate(deletedAt);

        this.createdAt = toDate(createdAt);
        this.createdBy = createdBy;
    }

    public static isChunk(obj: any): obj is Chunk {
        return (
            obj instanceof Chunk ||
            (obj instanceof Object &&
                typeof obj.uid === "string" &&
                typeof obj.document === "string" &&
                typeof obj.buffer === "string" &&
                typeof obj.index === "number" &&
                typeof obj.deleted === "boolean" &&
                (obj.deletedAt === undefined ||
                    toDate(obj.deletedAt) instanceof Date) &&
                typeof obj.createdBy === "string" &&
                toDate(obj.createdAt) instanceof Date)
        );
    }
}

export { Chunk };
