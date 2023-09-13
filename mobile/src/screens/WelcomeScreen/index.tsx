import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

import { FOLDER_CLOUD_FILES } from "@assets/images";
import { useI18n, useRouter, useTheme } from "@providers";
import { Button } from "@components";

import useStyles from "./useStyles";

function WelcomeScreen() {
    const { t } = useI18n();
    const { palette } = useTheme();
    const { navigate } = useRouter();
    const styles = useStyles();

    const gradientColors: string[] = Object.values(palette.primary)
        .reverse()
        .slice(2);

    const handleGoToLoginScreen = () => {
        navigate("Login");
    };

    return (
        <LinearGradient
            colors={gradientColors}
            start={{
                x: 0,
                y: 0.5,
            }}
            end={{
                x: 1,
                y: 0.5,
            }}
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
                <Button
                    round
                    onPress={handleGoToLoginScreen}
                    style={styles.footer.button}
                >
                    <AntDesign
                        name="arrowright"
                        size={16}
                        style={styles.footer.icon}
                    />
                </Button>
            </View>
        </LinearGradient>
    );
}

export { WelcomeScreen };
