import { View, Text } from "react-native";
import { useI18n } from "@providers";
import useStyles from "./useStyles";
import useLogic from "./useLogic";

function Pinned() {
    const { t } = useI18n();
    const { isEmpty } = useLogic();
    const styles = useStyles();

    if (isEmpty) return <></>;

    return (
        <View style={styles.list}>
            <View style={styles.header}>
                <Text style={styles.title}>{t("Pinned")}</Text>
            </View>
        </View>
    );
}

export { Pinned };
