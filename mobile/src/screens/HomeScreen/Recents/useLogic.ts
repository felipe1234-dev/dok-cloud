import { useCloud, useNavigator } from "@providers";

function useLogic() {
    const { documents } = useCloud();
    const { navigate } = useNavigator();

    const recentDocuments = documents
        .sort((a, b) => {
            const aTime = a.createdAt.getTime();
            const bTime = b.createdAt.getTime();
            return aTime < bTime ? -1 : aTime > bTime ? 1 : 0;
        })
        .slice(0, 10);

    const isEmpty = recentDocuments.length === 0;

    const handleGoToFileExplorer = () => {
        navigate("Cloud", {}, false);
    };

    return {
        recentDocuments,
        isEmpty,
        handleGoToFileExplorer,
    };
}

export default useLogic;
