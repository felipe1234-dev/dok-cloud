import { WelcomeScreen, LoginScreen, HomeScreen } from "@screens";
import { ScreenConfig } from "@types";

const screenConfigs: ScreenConfig[] = [
    {
        index: false,
        name: "Welcome",
        component: WelcomeScreen,
        protected: false,
    },
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
