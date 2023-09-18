import { ScreenProps } from "./ScreenProps";

type ScreenName = "Welcome" | "Login" | "Register" | "Home";

interface ScreenConfig {
    index?: boolean;
    name: ScreenName;
    component: (props: ScreenProps) => JSX.Element;
    protected: boolean;
}

export type { ScreenConfig, ScreenName };
