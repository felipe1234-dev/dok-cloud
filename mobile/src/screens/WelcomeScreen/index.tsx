import { View, Image, Text } from "react-native";

import { WELCOME_SCREEN } from "@assets/images";
import { useI18n } from "@providers";
import { Button } from "@components";

import useStyles from "./useStyles";
import useLogic from "./useLogic";

function WelcomeScreen() {
    const { t } = useI18n();
    const { handleGoToLogin, handleGoToRegister } = useLogic();
    const styles = useStyles();

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Image
                    source={WELCOME_SCREEN}
                    style={styles.image}
                />
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>
                    {t("Manage your files in a simple way")}
                </Text>
                <Text style={styles.subtitle}>
                    {t(
                        "Storage and secure your files in the cloud infinitely in DokFortress"
                    )}
                </Text>
            </View>
            <View style={styles.footer}>
                <Button
                    fullWidth
                    variant="secondary"
                    tone="light"
                    style={styles.button}
                    onPress={handleGoToLogin}
                >
                    <Text style={styles.loginText}>{t("Login")}</Text>
                </Button>
                <Button
                    outlined
                    fullWidth
                    variant="secondary"
                    tone="light"
                    style={styles.button}
                    onPress={handleGoToRegister}
                >
                    <Text style={styles.registerText}>
                        {t("New here? Register!")}
                    </Text>
                </Button>
            </View>
        </View>
    );
}

export { WelcomeScreen };
