import { generateUid, toDate } from "../functions";

class Document {
    public uid: string;
    public folder: string;
    public filename: string;
    public extension: string;
    public mimetype: string;
    public loaded: number;
    public size: number;
    public metadata?: {
        [key: string]: any;
    };
    public deleted: boolean;
    public deletedAt?: Date;
    public deletedBy?: string;
    public createdBy: string;
    public createdAt: Date;

    constructor(data: Partial<Document> = {}) {
        const prefix = "doc-";

        const {
            uid = generateUid(prefix, prefix.length + 25),
            folder = "",
            filename = "",
            extension = "",
            mimetype = "",
            loaded = 0,
            size = 0,
            metadata = {},
            deleted = false,
            deletedAt,
            createdAt = new Date(),
            createdBy = "",
        } = data;

        this.uid = uid;
        this.folder = folder;
        this.filename = filename;
        this.extension = extension;
        this.mimetype = mimetype;
        this.loaded = loaded;
        this.size = size;
        this.metadata = metadata;

        this.deleted = deleted;
        if (deletedAt) this.deletedAt = toDate(deletedAt);

        this.createdAt = toDate(createdAt);
        this.createdBy = createdBy;
    }

    public static isDocument(obj: any): obj is Document {
        return (
            obj instanceof Document ||
            (obj instanceof Object &&
                typeof obj.uid === "string" &&
                typeof obj.filename === "string" &&
                typeof obj.extension === "string" &&
                typeof obj.mimetype === "string" &&
                typeof obj.loaded === "number" &&
                typeof obj.size === "number" &&
                (obj.metadata === undefined ||
                    obj.matadata instanceof Object) &&
                typeof obj.deleted === "boolean" &&
                (obj.deletedAt === undefined ||
                    toDate(obj.deletedAt) instanceof Date) &&
                typeof obj.createdBy === "string" &&
                toDate(obj.createdAt) instanceof Date)
        );
    }
}

export { Document };
