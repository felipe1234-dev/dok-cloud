import { createContext, useContext, useState, ReactNode } from "react";
import { darkPalette, lightPalette } from "@constants";
import { Palette } from "@types";

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
    const [lightTheme, setLightTheme] = useState(true);

    const theme = lightTheme ? "light" : "dark";
    const palette = palettes[theme];

    const toggleTheme = () => setLightTheme((prev) => !prev);

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
