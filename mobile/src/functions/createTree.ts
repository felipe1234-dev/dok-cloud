import { Folder, Document } from "dok-fortress-globals";
import { Tree, TreeItem } from "@types";

function createTree(
    parentFolder: Folder,
    allFolders: Folder[],
    allDocuments: Document[],
    recursive = false
): Tree {
    const childFolders = allFolders.filter(
        (folder) => folder.folder === parentFolder.uid
    );
    const childDocuments = allDocuments.filter(
        (document) => document.folder === parentFolder.uid
    );
    const childTreeItems: TreeItem[] = childFolders.map((folder) => ({
        ...folder,
        children: [],
    }));

    if (recursive) {
        for (const treeItem of childTreeItems) {
            const tree = createTree(
                treeItem,
                allFolders,
                allDocuments,
                recursive
            );
            treeItem.children = tree.children;
        }
    }

    return {
        ...parentFolder,
        children: [...childDocuments, ...childTreeItems],
    };
}

export { createTree };
