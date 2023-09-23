import { StyleSheet } from "react-native";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();
    return StyleSheet.create({
        main: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 15,
            backgroundColor: palette.secondary.light,
            height: "100%",
            width: "100%",
            padding: "auto",
        },
    });
}

export default useStyles;
