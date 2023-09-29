import { useCloud } from "@providers";

function useLogic() {
    const { folders } = useCloud();

    const pinnedFolders = folders
        .filter(folder => folder.pinned)
        .slice(0, 10);

    const isEmpty = pinnedFolders.length === 0;

    return {
        pinnedFolders,
        isEmpty,
    };
}

export default useLogic;
