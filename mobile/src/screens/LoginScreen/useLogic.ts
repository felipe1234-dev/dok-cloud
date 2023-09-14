import { useRouter } from "@providers";

function useLogic() {
    const { navigate } = useRouter();

    const handleGoToLoginScreen = () => {
        navigate("Login");
    };
    
    return { handleGoToLoginScreen };
}

export default useLogic;