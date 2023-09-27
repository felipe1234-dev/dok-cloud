import {
    WelcomeScreen,
    LoginScreen,
    RegisterScreen,
    HomeScreen,
    CloudScreen,
} from "@screens";
import { ScreenConfig } from "@types";

const screens: ScreenConfig[] = [
    {
        index: false,
        name: "Welcome",
        component: WelcomeScreen,
        protected: false,
    },
    {
        index: false,
        name: "Register",
        component: RegisterScreen,
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
        icon: {
            type: "antdesign",
            name: "home",
        },
    },
    {
        index: false,
        name: "Cloud",
        component: CloudScreen,
        protected: true,
        icon: {
            type: "fontisto",
            name: "cloudy",
        },
    },
];

export { screens };
