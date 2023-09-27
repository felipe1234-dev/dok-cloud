import { useState } from "react";
import { validateEmail } from "dok-fortress-globals";
import { useNavigator, useToast } from "@providers";
import { Api } from "@services";

function useLogic() {
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState<{ [field: string]: string }>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { navigate } = useNavigator();
    const toast = useToast();

    const checkName = (text: string) => {
        const [firstName, lastName] = text.split(" ");
        const isValid = !!(firstName && lastName);

        const getErrorMessage = () => {
            if (isValid) return "";
            if (!firstName && !lastName) return "Name can not be empty";
            if (!firstName) return "Missing first name";
            if (!lastName) return "Missing last name";
            return "Invalid name";
        };

        setErrors((prev) => ({
            ...prev,
            name: getErrorMessage(),
        }));

        return isValid;
    };

    const checkEmail = (text: string) => {
        const isValid = validateEmail(text);

        const getErrorMessage = () => {
            if (isValid) return "";
            if (!text) return "Email can not be empty";
            return "Invalid email";
        };

        setErrors((prev) => ({
            ...prev,
            email: getErrorMessage(),
        }));

        return isValid;
    };

    const checkPassword = (text: string) => {
        const isValid = text.length > 0;

        const getErrorMessage = () => {
            if (isValid) return "";
            if (!text) return "Password can not be empty";
            return "Invalid password";
        };

        setErrors((prev) => ({
            ...prev,
            password: getErrorMessage(),
        }));

        return isValid;
    };

    const checkConfirmPassword = (text: string) => {
        const isValid = text === password;

        setErrors((prev) => ({
            ...prev,
            confirmPassword: isValid ? "" : "Password does not match",
        }));

        return isValid;
    };

    const handleRegister = async () => {
        try {
            setLoading(true);

            const canProceed =
                checkName(name) &&
                checkEmail(email) &&
                checkPassword(password) &&
                checkConfirmPassword(confirmPassword);
            if (!canProceed) return;

            await Api.auth.register(name, email, password);

            navigate("Login", {
                registeredANewUser: true,
            });
        } catch (err) {
            const error = err as Error;
            console.error("error", error);
            toast.error({
                title: "Error creating a new account",
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePasswordView = () => {
        setShowPassword((prev) => !prev);
    };

    const handleNameChange = (text: string) => {
        setName(text);
        checkName(text);
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        checkEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        checkPassword(text);
    };

    const handleConfirmPasswordChange = (text: string) => {
        setConfirmPassword(text);
        checkConfirmPassword(text);
    };

    const buttonDisabled =
        Object.values(errors).some((error) => !!error) || loading;

    return {
        loading,
        errors,
        buttonDisabled,
        showPassword,
        handleRegister,
        handleNameChange,
        name,
        handleEmailChange,
        email,
        handlePasswordChange,
        password,
        handleConfirmPasswordChange,
        confirmPassword,
        handleTogglePasswordView,
    };
}

export default useLogic;
