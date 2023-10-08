import { ScreenProps } from "./ScreenProps";
import { IconProps } from "@components";

type ScreenName = "Welcome" | "Login" | "Register" | "Home" | "Cloud";

interface ScreenConfig {
    /** Whether this screen will appear first */
    index?: boolean;
    /** Unique identifier */
    name: ScreenName;
    component: (props: ScreenProps) => JSX.Element;
    /** Icon props of the icon that will appear in the BottomNav component */
    icon?: IconProps;
    /** Whether this screen requires user authentication to be viewed */
    protected: boolean;
}

export type { ScreenConfig, ScreenName };
