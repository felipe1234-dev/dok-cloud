import { View, Text } from "react-native";

import { useI18n } from "@providers";
import { TextInput, Button, Icon } from "@components";

import useStyles from "./useStyles";
import useLogic from "./useLogic";

function LoginScreen() {
    const { t } = useI18n();
    const { showPassword, handleTogglePasswordView } = useLogic();
    const styles = useStyles();

    return (
        <View style={styles.root.container}>
            <View style={styles.header.container}>
                <View style={styles.header.circle1} />
                <View style={styles.header.circle2} />
                <View style={styles.header.circle3} />
                <Text style={styles.header.title}>{t("Login")}</Text>
            </View>

            <View style={styles.form.container}>
                <View style={styles.form.formFields}>
                    <TextInput
                        autoFocus
                        fullWidth
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect={false}
                        label={t("Email")}
                        labelStyle={styles.form.label}
                        placeholder={t("Enter your email address")}
                    />
                    <TextInput
                        fullWidth
                        autoCorrect={false}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        label={t("Password")}
                        labelStyle={styles.form.label}
                        placeholder={t("Enter your password")}
                        right={
                            <Button
                                round
                                transparent
                                onPress={handleTogglePasswordView}
                            >
                                <Icon
                                    type="font-awesome"
                                    name={showPassword ? "eye-slash" : "eye"}
                                    size={18}
                                />
                            </Button>
                        }
                    />
                </View>

                <Button fullWidth>
                    <Text style={styles.form.buttonText}>{t("Login")}</Text>
                </Button>
            </View>
        </View>
    );
}

export { LoginScreen };
