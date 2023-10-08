import { useState } from "react";
import { Api, loadLocalFile } from "@services";
import { useCloudExplorer, useNavigator, useToast } from "@providers";

function useLogic() {
    const [showModal, setShowModal] = useState(false);
    const { navigate } = useNavigator();
    const toast = useToast();
    const explorer = useCloudExplorer();

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    const handleUploadFiles = async () => {
        try {
            const openFolder = explorer.folder;
            if (!openFolder) return;

            const files = await loadLocalFile({
                type: "*/*",
                copyToCacheDirectory: true,
                multiple: true,
            });

            const promises: Promise<void>[] = [];
            for (const file of files) {
                const promise = new Promise<void>((resolve) => {
                    Api.documents
                        .upload(file, openFolder)
                        .catch((err) => {
                            toast.error({
                                title: "Error uploading files",
                                description: (err as Error).message,
                            });
                        })
                        .finally(() => resolve());
                });
                promises.push(promise);
            }

            await Promise.all(promises);

            navigate("Cloud");
        } catch (err) {
            console.error("error", err);
        }
    };

    return {
        showModal,
        handleShowModal,
        handleHideModal,
        handleUploadFiles,
    };
}

export default useLogic;
