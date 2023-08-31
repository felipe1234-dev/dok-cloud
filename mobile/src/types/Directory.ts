import { Folder, Document } from "dok-cloud-globals";

interface Directory extends Folder {
    directories: Directory[];
    documents: Document[];
}

export type { Directory };
