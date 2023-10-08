import {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";
import { screens } from "@constants";
import { ScreenConfig, ScreenParams, ScreenName } from "@types";
import { Protected } from "@components";

const indexScreen = screens.find((screen) => screen.index);

interface NavigatorValue {
    screenConfig?: ScreenConfig;
    navigate: (
        name: ScreenName,
        params?: ScreenParams,
        reload?: boolean
    ) => void;
    CurrentScreen: () => JSX.Element;
    reload: boolean;
    setReload: Dispatch<SetStateAction<boolean>>;
}

const NavigatorContext = createContext<NavigatorValue | undefined>(undefined);

function NavigatorProvider(props: { children: ReactNode }) {
    const [screenName, setScreenName] = useState(indexScreen?.name || "");
    const [screenParams, setScreenParams] = useState<ScreenParams>({});
    const [reload, setReload] = useState(true);

    const screenConfig = screens.find((screen) => screen.name === screenName);

    const { component: Screen } = screenConfig || {};

    const Wrapper = (props: { children: ReactNode }) =>
        screenConfig?.protected ? (
            <Protected>{props.children}</Protected>
        ) : (
            <>{props.children}</>
        );

    const CurrentScreen = () => (
        <Wrapper>
            {Screen && screenConfig && (
                <Screen
                    params={screenParams}
                    route={screenConfig}
                />
            )}
        </Wrapper>
    );

    /**
     * @param name The screen identifier
     * @param params Parameters to be passed to the screen component
     * @param reload Whether to show the screen spinner
     */
    const navigate = (
        name: ScreenName,
        params?: ScreenParams,
        reload = true
    ) => {
        setScreenName(name);
        setScreenParams(params || {});
        setReload(reload);
    };

    return (
        <NavigatorContext.Provider
            value={{ navigate, CurrentScreen, screenConfig, reload, setReload }}
        >
            {props.children}
        </NavigatorContext.Provider>
    );
}

function useNavigator() {
    const context = useContext(NavigatorContext);
    if (!context)
        throw new Error("useNavigator must be used within a NavigatorProvider");
    return context;
}

export { NavigatorContext, NavigatorProvider, useNavigator };
export type { NavigatorValue };
