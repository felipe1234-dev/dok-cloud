import { Folder, Document } from "dok-fortress-globals";

interface Directory extends Folder {
    directories: Directory[];
    documents: Document[];
}

export type { Directory };
