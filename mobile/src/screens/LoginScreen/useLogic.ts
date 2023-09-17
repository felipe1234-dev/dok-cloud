import { useState } from "react";
import { useNavigator } from "@providers";

function useLogic() {
    const [showPassword, setShowPassword] = useState(false);
    const { navigate } = useNavigator();

    const handleLogin = () => {
        navigate("Home");
    };

    const handleTogglePasswordView = () => {
        setShowPassword((prev) => !prev);
    };

    return { showPassword, handleLogin, handleTogglePasswordView };
}

export default useLogic;
