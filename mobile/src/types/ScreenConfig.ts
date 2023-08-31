import { ScreenProps } from "./ScreenProps";

interface ScreenConfig {
    index?: boolean;
    name: string;
    component: (props: ScreenProps) => JSX.Element;
}

export type { ScreenConfig };
