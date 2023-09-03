import { View, Text } from "react-native";
import { useI18n } from "@providers";
import { ImageBackground } from "@components";
import { WAVE_PATTERN } from "@assets/images";
import useStyles from "./useStyles";

function LoginScreen() {
    const { t } = useI18n();
    const styles = useStyles();

    return (
        <View style={styles.root.container}>
            <View />

            <View style={styles.header.container}>
                <Text style={styles.header.title}>{t("Welcome back!")}</Text>
                <Text style={styles.header.subtitle}>
                    {t("Please, enter the details below to continue")}
                </Text>
            </View>

            <ImageBackground
                source={WAVE_PATTERN}
                viewStyle={styles.footer.container}
                imageStyle={styles.footer.image}
            >
                <Text style={styles.footer.noAccount}>
                    {t("Don't have an account yet?")}
                </Text>
            </ImageBackground>
        </View>
    );
}

export { LoginScreen };
