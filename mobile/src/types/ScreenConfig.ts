import { ScreenProps } from "./ScreenProps";

interface ScreenConfig {
    index?: boolean;
    name: string;
    component: (props: ScreenProps) => JSX.Element;
    protected: boolean;
}

export type { ScreenConfig };
