import { Folder, Document } from "dok-fortress-globals";

interface TreeItem extends Folder {
    children: (TreeItem | Document)[];
}

interface Tree extends TreeItem {}

export type { Tree, TreeItem };