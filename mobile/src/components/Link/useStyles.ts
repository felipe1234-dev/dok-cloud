import { StyleSheet } from "react-native";
import { useTheme } from "@providers";
import { LinkProps } from "./index";

interface LinkStyleParams extends LinkProps {
    touching: boolean;
}

function useStyles(params: LinkStyleParams) {
    const {
        touching,
        variant = "highlight",
        tone = "main",
        style = {},
    } = params;
    const { palette } = useTheme();
    const textColor = palette[variant][tone];

    return StyleSheet.create({
        text: {
            color: textColor,
            textDecorationColor: textColor,
            textDecorationLine: touching ? "underline" : "none",
            textDecorationStyle: "solid",
            ...style,
        },
    });
}

export default useStyles;
