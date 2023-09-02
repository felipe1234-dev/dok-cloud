import { StyleSheet } from "react-native";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();

    return StyleSheet.create({
        container: {
            position: "relative",
            backgroundColor: "transparent",
            width: "auto",
            height: "auto",
        },
        image: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
        },
    });
}

export default useStyles;
