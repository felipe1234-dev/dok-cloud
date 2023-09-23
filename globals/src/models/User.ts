import { generateUid, toDate } from "../functions";

class User {
    public uid: string;
    public name: string;
    public email: string;
    public photo: string;
    public theme: string;
    public language: string;
    public salt: string;
    public password: string;
    public deleted: boolean;
    public deletedAt?: Date;
    public online: boolean;
    public token?: string;
    public sessionStart?: Date;
    public sessionEnd?: Date;
    public refreshToken?: string;
    public rememberMeToken?: string;
    public recoveryToken?: string;
    public createdAt: Date;

    constructor(data: Partial<User> = {}) {
        const {
            uid = generateUid("user-", 5 + 25),
            name = "No name",
            email = "",
            photo = "",
            theme = "",
            language = "",
            salt = "",
            password = "",
            deleted = false,
            deletedAt,
            online = false,
            createdAt = new Date(),
            token = "",
            refreshToken,
            rememberMeToken,
            sessionStart = new Date(),
            sessionEnd = new Date(),
            recoveryToken = "",
        } = data;

        this.uid = uid;
        this.name = name;
        this.email = email;
        this.photo = photo;
        this.theme = theme;
        this.language = language;
        this.salt = salt;
        this.password = password;

        this.deleted = deleted;
        if (deletedAt) this.deletedAt = toDate(deletedAt);

        this.online = online;
        this.createdAt = toDate(createdAt);

        if (token) this.token = token;
        if (refreshToken) this.refreshToken = refreshToken;
        if (sessionStart) this.sessionStart = toDate(sessionStart);
        if (sessionEnd) this.sessionEnd = toDate(sessionEnd);
        if (recoveryToken) this.recoveryToken = recoveryToken;
        if (rememberMeToken) this.rememberMeToken = rememberMeToken;
    }

    public static isUser(obj: any): obj is User {
        return (
            obj instanceof User ||
            (obj instanceof Object &&
                typeof obj.uid === "string" &&
                typeof obj.name === "string" &&
                typeof obj.email === "string" &&
                typeof obj.photo === "string" &&
                typeof obj.theme === "string" &&
                typeof obj.language === "string" &&
                typeof obj.salt === "string" &&
                typeof obj.password === "string" &&
                toDate(obj.createdAt) instanceof Date &&
                typeof obj.online === "boolean" &&
                (obj.sessionStart === undefined ||
                    toDate(obj.sessionStart) instanceof Date) &&
                (obj.sessionEnd === undefined ||
                    toDate(obj.sessionEnd) instanceof Date) &&
                (obj.token === undefined || typeof obj.token === "string") &&
                (obj.refreshToken === undefined ||
                    typeof obj.refreshToken === "string") &&
                (obj.rememberMeToken === undefined ||
                    typeof obj.rememberMeToken === "string") &&
                (obj.recoveryToken === undefined ||
                    typeof obj.recoveryToken === "string") &&
                typeof obj.deleted === "boolean" &&
                (obj.deletedBy === undefined ||
                    typeof obj.deletedBy === "string"))
        );
    }
}

export { User };
