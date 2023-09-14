import { View, Text } from "react-native";

import { useI18n } from "@providers";

import useStyles from "./useStyles";
import useLogic from "./useLogic";

function LoginScreen() {
    const { t } = useI18n();
    const { handleGoToLoginScreen } = useLogic();
    const styles = useStyles();

    return (
        <View style={styles.root.container}>
            <View style={styles.header.container}>
                <View style={{ ...styles.header.circle, ...styles.header.circle1 }} />
                <View style={{ ...styles.header.circle, ...styles.header.circle2 }} />
                <View style={{ ...styles.header.circle, ...styles.header.circle3 }} />
                <Text style={styles.header.title}>
                    {t("Login")}
                </Text>
            </View>

            <View style={styles.body.container}>
                
            </View>

            {/*<View style={styles.footer.container}>
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
            </View>*/}
        </View>
    );
}

export { LoginScreen };
