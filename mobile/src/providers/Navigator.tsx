import { createContext, useContext, useState, ReactNode } from "react";
import { screenConfigs } from "@constants";
import { ScreenConfig, ScreenParams } from "@types";
import { Protected } from "@components";

const indexScreen = screenConfigs.find((screen) => screen.index);

interface NavigatorValue {
    screenConfig?: ScreenConfig;
    navigate: (name: string, params?: ScreenParams) => void;
    CurrentScreen: () => JSX.Element;
}

const NavigatorContext = createContext<NavigatorValue | undefined>(undefined);

function NavigatorProvider(props: { children: ReactNode }) {
    const [screenName, setScreenName] = useState(indexScreen?.name || "");
    const [screenParams, setScreenParams] = useState<ScreenParams>({});

    const screenConfig = screenConfigs.find(
        (screen) => screen.name === screenName
    );

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

    const navigate = (name: string, params?: ScreenParams) => {
        setScreenName(name);
        setScreenParams(params || {});
    };

    return (
        <NavigatorContext.Provider
            value={{ navigate, CurrentScreen, screenConfig }}
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
