import { View, Text, Image } from "react-native";

import { LOGIN_SCREEN } from "@assets/images";
import { useI18n } from "@providers";
import { TextInput, Button, Icon, Link } from "@components";
import { ScreenProps } from "@types";

import useStyles from "./useStyles";
import useLogic from "./useLogic";

interface LoginScreenProps extends ScreenProps {
    params: {
        registeredANewUser?: boolean;
    }
}

function LoginScreen(props: LoginScreenProps) {
    const { t } = useI18n();
    const {
        loading,
        errors,
        buttonDisabled,
        showPassword,
        handleEmailChange,
        email,
        handlePasswordChange,
        password,
        handleTogglePasswordView,
        handleLogin,
    } = useLogic(props);
    const styles = useStyles();

    const baseInputProps = {
        fullWidth: true,
        autoCapitalize: "none" as "none",
        autoCorrect: false,
    };

    return (
        <View style={styles.main}>
            <Image
                source={LOGIN_SCREEN}
                style={styles.image}
            />

            <View style={styles.header}>
                <Text style={styles.title}>{t("Welcome back! 👋")}</Text>
                <Text style={styles.subtitle}>
                    {t("Please, enter the details below to continue")}
                </Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    {...baseInputProps}
                    autoComplete="email"
                    label={t("Email")}
                    labelStyle={styles.label}
                    placeholder={t("Enter your email address")}
                    onChangeText={handleEmailChange}
                    value={email}
                    error={t(errors.email || "")}
                />
                <TextInput
                    {...baseInputProps}
                    secureTextEntry={!showPassword}
                    label={t("Password")}
                    labelStyle={styles.label}
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
                    onChangeText={handlePasswordChange}
                    value={password}
                    error={t(errors.password || "")}
                />
            </View>

            <View style={styles.footer}>
                <Button
                    fullWidth
                    variant="primary"
                    tone="main"
                    textVariant="text"
                    textTone="light"
                    style={styles.login}
                    disabled={buttonDisabled}
                    onPress={handleLogin}
                    loading={loading}
                >
                    {t("Login")}
                </Button>
                <Link
                    to="Register"
                    style={styles.register}
                >
                    {t("Don't have an account? Create an account!")}
                </Link>
            </View>
        </View>
    );
}

export { LoginScreen };
export type { LoginScreenProps };
