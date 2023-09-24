import DBAccess from "@services/DBAccess";
import { Folder, User } from "dok-fortress-globals";

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

    public getRootUid(user: User) {
        return `${user.uid}-root`;
    }

    public getTrashUid(user: User) {
        return `${user.uid}-trash`;
    }

    public createTrashFolder(user: User) {
        const trashFolder = new Folder({
            uid: this.getTrashUid(user),
            name: "Trash",
            description: "Deleted items go to here",
            createdBy: user.uid,
        });

        return this.uid(trashFolder.uid).create(trashFolder);
    }

    public createRootFolder(user: User) {
        const rootFolder = new Folder({
            uid: this.getRootUid(user),
            name: "Root",
            description: "All items go to here",
            createdBy: user.uid,
        });

        return this.uid(rootFolder.uid).create(rootFolder);
    }
}

export default FoldersDB;
