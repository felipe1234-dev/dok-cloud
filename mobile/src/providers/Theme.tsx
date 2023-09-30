import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

import { darkPalette, lightPalette } from "@constants";
import { Palette } from "@types";
import { Api } from "@services";
import { useAsyncEffect } from "@hooks";

import { useAuth } from "./Auth";

const palettes = {
    dark: darkPalette,
    light: lightPalette,
};

type Theme = "light" | "dark";

interface ThemeValue {
    theme: Theme;
    toggleTheme: () => void;
    palette: Palette;
}

const ThemeContext = createContext<ThemeValue | undefined>(undefined);

function ThemeProvider(props: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const { user } = useAuth();
    const palette = palettes[theme];

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        if (!user?.uid) return;

        const isTheme = ["light", "dark"].includes(user.theme);
        const changed = user.theme !== theme;

        if (changed && isTheme) {
            setTheme(user.theme as Theme);
        }
    }, [user?.uid, user?.theme]);

    useAsyncEffect(async () => {
        if (!user?.uid) return;
        if (user.theme !== theme) await Api.users.update(user.uid, { theme });
    }, [theme, user?.uid, user?.theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, palette }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

function useTheme() {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
}

export { ThemeContext, ThemeProvider, useTheme, palettes };
export type { Theme, ThemeValue };
