import { View, Text, Image } from "react-native";

import { useI18n } from "@providers";
import { EMPTY_BOX } from "@assets/images";
import { Link } from "@components";

import useStyles from "./useStyles";
import useLogic from "./useLogic";

function Recents() {
    const { t } = useI18n();
    const styles = useStyles();
    const { handleGoToFileExplorer, isEmpty } = useLogic();

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.title}>{t("Recent files")}</Text>
            </View>
            {isEmpty ? (
                <View style={styles.empty}>
                    <Image
                        source={EMPTY_BOX}
                        style={styles.image}
                    />
                    <Text style={styles.title}>
                        {t("You don't have any recent files")}
                    </Text>
                    <Text style={styles.paragraph}>
                        {t(
                            "Please, click the button below to go to the file explorer"
                        )}
                    </Text>
                    <Link
                        variant="primary"
                        tone="main"
                        to="Cloud"
                        reload={false}
                        style={styles.fileExplorerButton}
                    >
                        {t("File explorer")}
                    </Link>
                </View>
            ) : (
                <></>
            )}
        </View>
    );
}

export { Recents };
