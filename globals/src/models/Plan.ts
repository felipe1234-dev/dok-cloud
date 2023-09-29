import { generateUid, toDate } from "../functions";

class Plan {
    public uid: string;
    public name: string;
    public description: string;
    public storage: number;
    public bandwidth: number;
    public deleted: boolean;
    public createdAt: Date;
    public createdBy: string;

    constructor(data: Partial<Plan>) {
        const prefix = "plan-";

        const {
            uid = generateUid(prefix, prefix.length + 25),
            name = "",
            description = "",
            storage = 0,
            bandwidth = 0,
            deleted = false,
            createdAt = new Date(),
            createdBy = "",
        } = data;

        this.uid = uid;
        this.name = name;
        this.description = description;
        this.storage = storage;
        this.bandwidth = bandwidth;
        this.deleted = deleted;
        this.createdAt = toDate(createdAt);
        this.createdBy = createdBy;
    }

    public static isPlan(obj: any): obj is Plan {
        return (
            obj instanceof Plan ||
            (obj instanceof Object &&
                typeof obj.uid === "string" &&
                typeof obj.name === "string" &&
                typeof obj.description === "string" &&
                typeof obj.storage === "number" &&
                typeof obj.bandwidth === "number" &&
                typeof obj.deleted === "boolean" &&
                typeof obj.createdBy === "string" &&
                toDate(obj.createdAt) instanceof Date)
        );
    }
}

export { Plan };
