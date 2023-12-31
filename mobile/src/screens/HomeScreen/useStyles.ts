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
            width: "100%",
            height: "100%",
        },
    });
}

export default useStyles;
