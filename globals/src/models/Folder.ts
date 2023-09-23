import { generateUid, toDate } from "../functions";

class Folder {
    public uid: string;
    public folder: string;
    public name: string;
    public description: string;
    public deleted: boolean;
    public deletedAt?: Date;
    public createdBy: string;
    public createdAt: Date;

    constructor(data: Partial<Folder> = {}) {
        const prefix = "folder-";
        const {
            uid = generateUid(prefix, prefix.length + 25),
            folder = "",
            name = "",
            description = "",
            deleted = false,
            deletedAt,
            createdBy = "",
            createdAt = new Date(),
        } = data;

        this.uid = uid;
        this.folder = folder;
        this.name = name;
        this.description = description;

        this.deleted = deleted;
        if (deletedAt) this.deletedAt = toDate(deletedAt);

        this.createdBy = createdBy;
        this.createdAt = toDate(createdAt);
    }

    public static isFolder(obj: any): obj is Folder {
        return (
            obj instanceof Folder ||
            (obj instanceof Object &&
                typeof obj.uid === "string" &&
                (obj.folder === undefined || typeof obj.folder === "string") &&
                typeof obj.name === "string" &&
                typeof obj.description === "string" &&
                typeof obj.deleted === "boolean" &&
                (obj.deletedAt === undefined ||
                    toDate(obj.deletedAt) instanceof Date) &&
                typeof obj.createdBy === "string" &&
                toDate(obj.createdAt) instanceof Date)
        );
    }
}

export { Folder };
