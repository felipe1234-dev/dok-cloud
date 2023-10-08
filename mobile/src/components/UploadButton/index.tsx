import { View, Text } from "react-native";

import { useI18n } from "@providers";

import { Button } from "../Button";
import { Icon } from "../Icon";
import { Modal } from "../Modal";

import useStyles from "./useStyles";
import useLogic from "./useLogic";

function UploadButton() {
    const { t } = useI18n();
    const { showModal, handleShowModal, handleHideModal, handleUploadFiles } =
        useLogic();
    const { styles, iconSize } = useStyles();

    return (
        <>
            <Button
                round
                variant="primary"
                tone="main"
                onPress={handleShowModal}
                style={styles.container}
            >
                <Icon
                    type="antdesign"
                    name="plus"
                    size={iconSize}
                    style={styles.icon}
                />
            </Button>
            <Modal
                isVisible={showModal}
                onBackdropPress={handleHideModal}
                style={styles.modalOuter}
            >
                <View style={styles.modalInner}>
                    <Button
                        variant="primary"
                        tone="main"
                        onPress={handleUploadFiles}
                        style={styles.modalButton}
                    >
                        <Icon
                            type="antdesign"
                            name="addfile"
                            size={iconSize}
                            style={styles.icon}
                        />
                        <Text style={styles.modalButtonText}>
                            {t("Upload a file")}
                        </Text>
                    </Button>
                    <Button
                        variant="primary"
                        tone="main"
                        style={styles.modalButton}
                    >
                        <Icon
                            type="antdesign"
                            name="addfolder"
                            size={iconSize}
                            style={styles.icon}
                        />
                        <Text style={styles.modalButtonText}>
                            {t("Create a folder")}
                        </Text>
                    </Button>
                </View>
            </Modal>
        </>
    );
}

export { UploadButton };
