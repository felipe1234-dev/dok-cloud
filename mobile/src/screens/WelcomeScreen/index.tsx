import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { FOLDER_CLOUD_FILES } from "@assets/images";
import { useI18n, useTheme } from "@providers";
import { Button } from "@components";

import useStyles from "./useStyles";

function WelcomeScreen() {
    const { t } = useI18n();
    const { palette } = useTheme();
    const styles = useStyles();

    const gradientColors: string[] = Object.values(palette.primary).reverse();

    return (
        <LinearGradient
            colors={gradientColors}
            style={styles.root.container}
        >
            <View style={styles.header.container}>
                <Image
                    source={FOLDER_CLOUD_FILES}
                    style={styles.header.image}
                />
            </View>

            <View style={styles.body.container}>
                <Text style={styles.body.title}>
                    {t("Manage your files in a simple way")}
                </Text>
                <Text style={styles.body.subtitle}>
                    {t(
                        "Storage and secure your files in the cloud infinitely with password and fingerprint"
                    )}
                </Text>
            </View>

            <View style={styles.footer.container}>
                <Button round>
                    <Text>Test</Text>
                </Button>
            </View>
        </LinearGradient>
    );
}

export { WelcomeScreen };
