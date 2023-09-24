import {
    ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
} from "react";
import { Folder, Document } from "dok-fortress-globals";

import { Api } from "@services";
import { useAsyncEffect } from "@hooks";
import { useAuth } from "@providers";
import { Filters, Tree } from "@types";
import { createTree } from "@functions";

interface CloudValue {
    root: Folder | undefined;
    tree: Tree | undefined;
    load(folder: Folder): Promise<void>;
}

const CloudContext = createContext<CloudValue | undefined>(undefined);

function CloudProvider({ children }: { children: ReactNode }) {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loadedFolders, setLoadedFolders] = useState<Folder[]>([]);
    const [tree, setTree] = useState<Tree>();
    const { user } = useAuth();

    const rootUid = useMemo(() => {
        if (!user) return undefined;
        return `${user.uid}-root`;
    }, [user]);

    const rootFolder = useMemo(() => {
        return folders.find((folder) => folder.uid === rootUid);
    }, [rootUid, folders]);

    const folderAlreadyIncluded = (folder: Folder) => {
        return !!folders.find(({ uid }) => uid === folder.uid);
    };

    const addFolder = (folder: Folder) => {
        setFolders((prev) => {
            const folderAlreadyIncluded = !!prev.find(
                ({ uid }) => uid === folder.uid
            );
            return folderAlreadyIncluded ? prev : [...prev, folder];
        });
    };

    const addFolders = (...folders: Folder[]) => {
        for (const folder of folders) {
            addFolder(folder);
        }
    };

    const addDocument = (document: Document) => {
        setDocuments((prev) => {
            const documentAlreadyIncluded = !!prev.find(
                ({ uid }) => uid === document.uid
            );
            return documentAlreadyIncluded ? prev : [...prev, document];
        });
    };

    const addDocuments = (...documents: Document[]) => {
        for (const document of documents) {
            addDocument(document);
        }
    };

    const folderIsLoaded = (folder: Folder) => {
        return !!loadedFolders.find((f) => f.uid === folder.uid);
    };

    const loadFolder = async (folder: Folder) => {
        const alreadyIncluded = folderAlreadyIncluded(folder);
        if (!alreadyIncluded) addFolder(folder);

        const alreadyLoaded = folderIsLoaded(folder);
        if (alreadyLoaded) return;

        setLoadedFolders((prev) => [...prev, folder]);

        const filters: Filters<{ folder: string }> = {
            where: [["folder", "==", folder.uid]],
        };

        const childFolders = await Api.folders.list(filters);
        const childDocuments = await Api.documents.list(filters);

        addFolders(...childFolders);
        addDocuments(...childDocuments);
    };

    useAsyncEffect(async () => {
        if (!rootUid) return;
        const rootFolder = await Api.folders.get(rootUid);
        await loadFolder(rootFolder);
    }, [rootUid]);

    useEffect(() => {
        if (!rootFolder) return;
        const newTree = createTree(rootFolder, folders, documents, true);
        setTree(newTree);
    }, [rootFolder, folders, documents]);

    return (
        <CloudContext.Provider
            value={{
                root: rootFolder,
                tree,
                load: loadFolder,
            }}
        >
            {children}
        </CloudContext.Provider>
    );
}

function useCloud() {
    const context = useContext(CloudContext);

    if (!context) {
        throw new Error("useCloud must be used within a CloudProvider");
    }

    return context;
}

export { CloudContext, CloudProvider, useCloud };
export type { CloudValue };
