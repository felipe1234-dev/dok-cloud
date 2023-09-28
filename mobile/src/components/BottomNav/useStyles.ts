import { StyleSheet } from "react-native";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();

    return StyleSheet.create({
        nav: {
            position: "absolute",
            bottom: 0,
            left: 0,
            overflowX: "scroll",
            overflowY: "hidden",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: palette.secondary.light,
            minHeight: 50,
            minWidth: "100%",
            paddingHorizontal: 15,
            borderTopColor: palette.secondary.main,
            borderTopWidth: 1,
            borderTopStyle: "solid",
        },
        selected: {
            color: palette.primary.light,
            fontWeight: "700",
        },
    });
}

export default useStyles;
