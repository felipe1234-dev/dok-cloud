import {
    ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

import { useCloud } from "@providers";
import { TreeItem } from "@types";

interface CloudExplorerValue {
    folder: TreeItem | undefined;
    open: (folder: TreeItem) => Promise<void>;
}

const CloudExplorerContext = createContext<CloudExplorerValue | undefined>(
    undefined
);

function CloudExplorerProvider({ children }: { children: ReactNode }) {
    const [folder, setFolder] = useState<TreeItem>();
    const { root, loadFolder } = useCloud();

    const open = async (folder: TreeItem) => {
        setFolder(folder);
        await loadFolder(folder);
    };

    useEffect(() => {
        setFolder(root);
    }, [root]);

    return (
        <CloudExplorerContext.Provider
            value={{
                folder,
                open,
            }}
        >
            {children}
        </CloudExplorerContext.Provider>
    );
}

function useCloudExplorer() {
    const context = useContext(CloudExplorerContext);

    if (!context) {
        throw new Error(
            "useCloudExplorer must be used within a CloudExplorerProvider"
        );
    }

    return context;
}

export { CloudExplorerContext, CloudExplorerProvider, useCloudExplorer };
export type { CloudExplorerValue };
