import { ScreenProps } from "./ScreenProps";
import { IconProps } from "@components";

type ScreenName = "Welcome" | "Login" | "Register" | "Home" | "Cloud";

interface ScreenConfig {
    index?: boolean;
    name: ScreenName;
    component: (props: ScreenProps) => JSX.Element;
    icon?: IconProps;
    protected: boolean;
}

export type { ScreenConfig, ScreenName };
