import { useNavigator } from "@providers";
import { ScreenName } from "@types";

function useLogic() {
    const { screenConfig, navigate } = useNavigator();

    const handleNavigateToScreen = (screen: ScreenName) => () => {
        navigate(screen, {}, false);
    };

    const currentScreen = screenConfig?.name;

    return {
        handleNavigateToScreen,
        currentScreen,
    };
}

export default useLogic;
