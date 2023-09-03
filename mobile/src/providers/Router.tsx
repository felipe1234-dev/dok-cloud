import { createContext, useContext, useState, ReactNode } from "react";
import { screenConfigs } from "@constants";
import { ScreenConfig, ScreenParams } from "@types";
import { Protected } from "@components";

const indexScreen = screenConfigs.find((screen) => screen.index);

interface RouterValue {
    screenConfig?: ScreenConfig;
    navigate: (name: string, params?: ScreenParams) => void;
    CurrentScreen: () => JSX.Element;
}

const RouterContext = createContext<RouterValue | undefined>(undefined);

function RouterProvider(props: { children: ReactNode }) {
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
        <RouterContext.Provider
            value={{ navigate, CurrentScreen, screenConfig }}
        >
            {props.children}
        </RouterContext.Provider>
    );
}

function useRouter() {
    const context = useContext(RouterContext);
    if (!context)
        throw new Error("useRouter must be used within a RouterProvider");
    return context;
}

export { RouterContext, RouterProvider, useRouter };
