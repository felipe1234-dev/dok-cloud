import { StyleSheet } from "react-native";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();
    return StyleSheet.create({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 8,
            backgroundColor: "transparent",
            width: "100%",
            padding: 0,
        },
        main: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            paddingHorizontal: 25,
        },
        greetings: {
            textAlign: "left",
            fontWeight: "600",
            fontSize: 18,
            textBreak: "break-word",
        },
    });
}

export default useStyles;
