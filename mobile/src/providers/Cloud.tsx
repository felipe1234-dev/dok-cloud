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
    root: Tree | undefined;
    trash: Tree | undefined;
    loadFolder(folder: Folder): Promise<void>;
    folders: Folder[];
    documents: Document[];
}

const CloudContext = createContext<CloudValue | undefined>(undefined);

function CloudProvider({ children }: { children: ReactNode }) {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loadedFolders, setLoadedFolders] = useState<Folder[]>([]);
    const [root, setRoot] = useState<Tree>();
    const [trash, setTrash] = useState<Tree>();
    const { user } = useAuth();

    const rootUid = useMemo(() => {
        if (!user) return undefined;
        return `${user.uid}-root`;
    }, [user]);

    const rootFolder = useMemo(() => {
        return folders.find((folder) => folder.uid === rootUid);
    }, [rootUid, folders]);

    const trashUid = useMemo(() => {
        if (!user) return undefined;
        return `${user.uid}-trash`;
    }, [user]);

    const trashFolder = useMemo(() => {
        return folders.find((folder) => folder.uid === trashUid);
    }, [trashUid, folders]);

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
        setRoot(newTree);
    }, [rootFolder, folders, documents]);

    useAsyncEffect(async () => {
        if (!trashUid) return;
        const trashFolder = await Api.folders.get(trashUid);
        await loadFolder(trashFolder);
    }, [trashUid]);

    useEffect(() => {
        if (!trashFolder) return;
        const newTree = createTree(trashFolder, folders, documents, true);
        setTrash(newTree);
    }, [trashFolder, folders, documents]);

    return (
        <CloudContext.Provider
            value={{
                root,
                trash,
                loadFolder,
                folders,
                documents,
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
