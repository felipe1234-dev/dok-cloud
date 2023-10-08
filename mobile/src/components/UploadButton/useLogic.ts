import { useState } from "react";
import { Api, loadLocalFile } from "@services";
import { useNavigator } from "@providers";

function useLogic() {
    const { navigate } = useNavigator();
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    const handleUploadFiles = async () => {
        try {
            const files = await loadLocalFile({
                type: "*/*",
                copyToCacheDirectory: true,
                multiple: true,
            });

            console.warn("files", files);

            

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
