import { View, Text, Image } from "react-native";

import { REGISTER_SCREEN } from "@assets/images";
import { useI18n } from "@providers";
import { TextInput, Button, Icon, Link } from "@components";

import useStyles from "./useStyles";
import useLogic from "./useLogic";

function RegisterScreen() {
    const { t } = useI18n();
    const {
        loading,
        errors,
        buttonDisabled,
        showPassword,
        handleNameChange,
        name,
        handleEmailChange,
        email,
        handlePasswordChange,
        password,
        handleConfirmPasswordChange,
        confirmPassword,
        handleTogglePasswordView,
        handleRegister,
    } = useLogic();
    const styles = useStyles();

    const baseInputProps = {
        fullWidth: true,
        autoCapitalize: "none" as "none",
        autoCorrect: false,
    };

    return (
        <View style={styles.main}>
            <Image
                source={REGISTER_SCREEN}
                style={styles.image}
            />

            <View style={styles.header}>
                <Text style={styles.title}>{t("You come in peace 👋")}</Text>
                <Text style={styles.subtitle}>
                    {t("Please, enter the details below to continue")}
                </Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    {...baseInputProps}
                    autoComplete="name"
                    label={t("Name")}
                    labelStyle={styles.label}
                    placeholder={t("Enter your first and last name")}
                    onChangeText={handleNameChange}
                    value={name}
                    error={t(errors.name || "")}
                />
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
                <TextInput
                    {...baseInputProps}
                    secureTextEntry={!showPassword}
                    label={t("Confirm password")}
                    labelStyle={styles.label}
                    placeholder={t("Enter your password again")}
                    onChangeText={handleConfirmPasswordChange}
                    value={confirmPassword}
                    error={t(errors.confirmPassword || "")}
                />
            </View>

            <View style={styles.footer}>
                <Button
                    fullWidth
                    variant="primary"
                    tone="main"
                    textVariant="text"
                    textTone="light"
                    style={styles.register}
                    disabled={buttonDisabled}
                    onPress={handleRegister}
                    loading={loading}
                >
                    {t("Register")}
                </Button>
                <Link
                    to="Login"
                    style={styles.login}
                >
                    {t("Already have an account?")}
                </Link>
            </View>
        </View>
    );
}

export { RegisterScreen };
