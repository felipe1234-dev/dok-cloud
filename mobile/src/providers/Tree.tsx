import React, { createContext, useContext, useState } from "react";
import { Folder, Document } from "dok-fortress-globals";

import { Directory } from "@types";
import { useAsyncEffect } from "@hooks";
import { Api } from "@services";

const root = new Folder({
    uid: "root",
    name: "Root",
    description: "Base folder",
    createdBy: "system",
});

const rootDirectory = {
    ...root,
    documents: [],
    directories: [],
};

interface Tree extends Directory {}

interface TreeValue {
    tree: Tree;
    allDocuments: Document[];
    allFolders: Folder[];
    loadDirectoryFolders: (folder: Folder) => Promise<void>;
    loadFolderDocuments: (folder: Folder) => Promise<void>;
}

const TreeContext = createContext<TreeValue | undefined>(undefined);

function TreeProvider(props: { children: React.ReactNode }) {
    const [allFolders, setAllFolders] = useState<Folder[]>([]);
    const [allDocuments, setAllDocuments] = useState<Document[]>([]);
    const [tree, setTree] = useState<Tree>(rootDirectory);

    const fetchDocuments = async (parentFolder: Folder) => {
        const documents = await Api.documents.get({
            where: [["folder", "==", parentFolder.uid]],
        });

        return documents;
    };

    const fetchFolders = async (parentFolder: Folder) => {
        const folders = await Api.folders.get({
            where: [["folder", "==", parentFolder.uid]],
        });

        return folders;
    };

    const loadFolderDocuments = async (folder: Folder) => {
        const newDocuments = await fetchDocuments(folder);
        setAllDocuments((prev) => {
            const documents = [...prev];

            for (const newDocument of newDocuments) {
                const alreadyIncluded = !!documents.find(
                    (document) => document.uid === newDocument.uid
                );
                if (alreadyIncluded) continue;

                documents.push(newDocument);
            }

            return documents;
        });
    };

    const loadDirectoryFolders = async (folder: Folder) => {
        const newFolders = await fetchFolders(folder);
        setAllFolders((prev) => {
            const folders = [...prev];

            for (const newFolder of newFolders) {
                const alreadyIncluded = !!folders.find(
                    (folder) => folder.uid === newFolder.uid
                );
                if (alreadyIncluded) continue;

                folders.push(newFolder);
            }

            return folders;
        });
    };

    useAsyncEffect(async () => {
        const rootFolders = await fetchFolders(root);
        const rootDocuments = await fetchDocuments(root);
        const tree = createTree(root, rootFolders, rootDocuments);

        setTree(tree);
        setAllFolders(rootFolders);
        setAllDocuments(rootDocuments);
    }, []);

    return (
        <TreeContext.Provider
            value={{
                tree,
                allDocuments,
                allFolders,
                loadDirectoryFolders,
                loadFolderDocuments,
            }}
        >
            {props.children}
        </TreeContext.Provider>
    );
}

function useDocTree() {
    const context = useContext(TreeContext);

    if (!context) {
        throw new Error("useDocTree must be used within a TreeProvider");
    }

    return context;
}

export { TreeContext, TreeProvider, useDocTree };
export type { TreeValue, Tree };

function createTree(
    parent: Folder,
    allFolders: Folder[],
    allDocuments: Document[]
): Tree {
    const documents = allDocuments.filter(
        (document) => document.folder === parent.uid
    );
    const directories = allFolders
        .filter((folder) => folder.folder === parent.uid)
        .map((folder) => createTree(folder, allFolders, allDocuments));

    return {
        ...parent,
        documents,
        directories,
    };
}
