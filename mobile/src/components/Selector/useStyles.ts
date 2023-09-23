import { StyleSheet } from "react-native";
import { useTheme } from "@providers";
import { SelectorProps } from "./index";

interface SelectorStyleParams<T> extends SelectorProps<T> {}

function useStyles<T>(params: SelectorStyleParams<T>) {
    const { palette } = useTheme();
    const { fullWidth = false, containerStyle = {}, pickerStyle = {} } = params;

    return StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: "transparent",
            width: fullWidth ? "100%" : "auto",
            padding: 10,
            borderRadius: 8,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: palette.text.dark,
            ...containerStyle,
        },
        picker: {
            outline: "none",
            outlineStyle: "none",
            borderWidth: 0,
            ...pickerStyle,
        },
    });
}

export default useStyles;
