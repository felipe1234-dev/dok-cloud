import { StyleSheet } from "react-native";
import { useTheme } from "@providers";
import { ButtonProps } from "./index";

interface ButtonStyleParams extends ButtonProps {}

function useStyles(params: ButtonStyleParams) {
    const {
        round = false,
        transparent = false,
        fullWidth = false,
        outlined = false,
        variant = "primary",
        tone = "light",
        textVariant = "secondary",
        textTone = "light",
        style = {},
    } = params;
    const { palette } = useTheme();
    const mainColor = palette[variant][tone];
    const textColor = palette[textVariant][textTone];

    return StyleSheet.create({
        button: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
            padding: 10,
            backgroundColor:
                transparent || outlined ? "transparent" : mainColor,
            color: !outlined ? textColor : mainColor,
            width: fullWidth ? "100%" : "auto",
            borderColor: mainColor,
            borderRadius: round ? 1000 : 0,
            borderStyle: "solid",
            borderWidth: outlined ? 1.5 : 0,
            ...style,
        },
    });
}

export default useStyles;
