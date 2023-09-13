import { StyleSheet } from "react-native";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();

    return StyleSheet.create({
        button: {
            padding: 10,
            backgroundColor: palette.secondary.light,
        },
        fullWidth: {
            width: "100%",
        },
        round: {
            borderRadius: 1000,
        },
    });
}

export default useStyles;
