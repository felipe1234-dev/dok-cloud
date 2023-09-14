import { LoginScreen, HomeScreen } from "@screens";
import { ScreenConfig } from "@types";

const screenConfigs: ScreenConfig[] = [
    {
        index: false,
        name: "Login",
        component: LoginScreen,
        protected: false,
    },
    {
        index: true,
        name: "Home",
        component: HomeScreen,
        protected: true,
    },
];

export { screenConfigs };
