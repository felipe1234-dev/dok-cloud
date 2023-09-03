import { useTheme } from "@providers";
import { StyleSheet } from "react-native";

function useStyles() {
    const { palette } = useTheme();

    return StyleSheet.create({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            height: "100%",
            width: "100%",
            backgroundColor: palette.primary.main,
            fontFamily: "Mulish-Regular",
        },
        nav: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            minHeight: 16,
            padding: 10,
        },
    });
}

export default useStyles;
