import { StyleSheet } from "react-native";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();

    return StyleSheet.create({
        main: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 15,
            backgroundColor: palette.secondary.light,
        },
        upload: {
            position: "absolute",
            bottom: 80,
            right: 0,
            color: palette.text.light,
        },
    });
}

export default useStyles;
