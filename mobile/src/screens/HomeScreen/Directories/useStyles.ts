import { StyleSheet } from "react-native";
import { useTheme } from "@providers";

function useStyles() {
    return StyleSheet.create({
        list: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 0
        }
    });
}

export default useStyles;
