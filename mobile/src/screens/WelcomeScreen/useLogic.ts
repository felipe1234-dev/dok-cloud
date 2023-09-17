import { useNavigator } from "@providers";

function useLogic() {
    const { navigate } = useNavigator();

    const handleGoToLogin = () => {
        navigate("Login");
    };

    const handleGoToRegister = () => {
        navigate("Register");
    };

    return { handleGoToLogin, handleGoToRegister };
}

export default useLogic;
