import { useState, useEffect, useMemo } from "react";
import { Folder, Document } from "dok-fortress-globals";

import { useCloud } from "@providers";
import { TreeItem } from "@types";

type SortOrder = "asc" | "desc";

function useLogic() {
    const [parentFolder, setParentFolder] = useState<TreeItem>();
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
    const { root, loadFolder } = useCloud();

    const handleOpenFolder = async (folder: TreeItem) => {
        await loadFolder(folder);
        setParentFolder(folder);
    };

    const handleToggleSortOrder = () => {
        setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    };

    useEffect(() => {
        if (!root) return;
        setParentFolder(root);
    }, [root]);

    const children = useMemo(() => {
        return (parentFolder?.children || []).sort((a, b) => {
            const aIsFolder = Folder.isFolder(a);
            const bIsFolder = Folder.isFolder(b);

            if (aIsFolder && !bIsFolder) return -1;
            if (!aIsFolder && bIsFolder) return 1;

            const aIsDoc = Document.isDocument(a);
            const bIsDoc = Document.isDocument(b);
            const bothAreDocs = aIsDoc && bIsDoc;
            const bothAreFolders = aIsFolder && bIsFolder;

            let aStr = "";
            let bStr = "";

            if (bothAreDocs) {
                aStr = a.filename;
                bStr = b.filename;
            } else if (bothAreFolders) {
                aStr = `${a.name} ${b.description}`;
                bStr = `${b.name} ${b.description}`;
            }

            if (sortOrder === "desc")
                return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
            if (sortOrder === "asc")
                return aStr < bStr ? 1 : aStr > bStr ? -1 : 0;
            return 0;
        });
    }, [sortOrder, parentFolder?.children, parentFolder]);

    return {
        parentFolder,
        handleOpenFolder,
        children,
        handleToggleSortOrder,
        sortOrder,
    };
}

export default useLogic;
