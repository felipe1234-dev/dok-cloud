import { StyleSheet } from "react-native";
import { useTheme } from "@providers";
import { TextInputProps } from "./index";

interface TextInputStyleParams extends TextInputProps {
    focused: boolean;
    touching: boolean;
}

function useStyles(params: TextInputStyleParams) {
    const { palette } = useTheme();
    const {
        fullWidth = false,
        placeholderTextColor = palette.text.main,
        controlStyle = {},
        labelStyle = {},
        containerStyle = {},
        inputStyle = {},
        focused,
        touching,
        error,
    } = params;

    let borderColor = palette.secondary.main;

    if (error) {
        borderColor = palette.error.main;
    } else if (focused) {
        borderColor = palette.primary.main;
    } else if (touching) {
        borderColor = palette.text.dark;
    }

    const labelColor =
        error || focused || touching ? borderColor : palette.text.dark;
    const fontSize = 15;

    return StyleSheet.create({
        control: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 8,
            width: fullWidth ? "100%" : "auto",
            ...controlStyle,
        },
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: "transparent",
            width: fullWidth ? "100%" : "auto",
            borderRadius: 5,
            borderStyle: "solid",
            borderColor,
            borderWidth: 1.5,
            ...containerStyle,
        },
        label: {
            color: labelColor,
            fontSize,
            ...labelStyle,
        },
        error: {
            color: palette.error.main,
            fontSize,
        },
        input: {
            backgroundColor: "transparent",
            outline: "none",
            outlineStyle: "none",
            padding: 16,
            color: palette.text.dark,
            placeholderTextColor,
            fontSize,
            flex: 1,
            ...inputStyle,
        },
    });
}

export default useStyles;
