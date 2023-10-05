import { StyleSheet } from "react-native";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();
    return StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
            backgroundColor: "transparent",
            width: "100%",
            padding: 15,
        },
        pizza: {
            tintColor: palette.primary.main,
            thickness: 10,
            backgroundColor: palette.secondary.main,
        },
    });
}

export default useStyles;
