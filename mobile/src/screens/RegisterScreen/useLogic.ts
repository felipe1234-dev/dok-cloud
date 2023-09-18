import { useState } from "react";
import { validateEmail } from "dok-fortress-globals";
import { useAuth, useNavigator, useToast } from "@providers";

function useLogic() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ [field: string]: string }>({
        email: "",
        password: "",
    });

    const { login } = useAuth();
    const { navigate } = useNavigator();
    const toast = useToast();

    const checkEmail = (text: string) => {
        const isValid = validateEmail(text);

        setErrors((prev) => ({
            ...prev,
            email: isValid ? "" : "Invalid email",
        }));

        return isValid;
    };

    const checkPassword = (text: string) => {
        const isValid = text.length > 0;

        setErrors((prev) => ({
            ...prev,
            password: isValid ? "" : "Invalid password",
        }));

        return isValid;
    };

    const handleLogin = async () => {
        try {
            setLoading(true);

            const bothAreValid = checkEmail(email) && checkPassword(password);
            if (!bothAreValid) return;

            await login(email, password, false);

            navigate("Home");
        } catch (err) {
            const error = err as Error;
            console.error("error", error);
            toast.error({
                title: "Error logging in",
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePasswordView = () => {
        setShowPassword((prev) => !prev);
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        checkEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        checkPassword(text);
    };

    const buttonDisabled =
        Object.values(errors).some((error) => !!error) || loading;

    return {
        loading,
        errors,
        buttonDisabled,
        showPassword,
        handleLogin,
        handleEmailChange,
        email,
        handlePasswordChange,
        password,
        handleTogglePasswordView,
    };
}

export default useLogic;
