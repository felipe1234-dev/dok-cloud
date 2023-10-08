import { Platform, StyleSheet } from "react-native";
import { BOTTOM_NAV_HEIGHT } from "@components";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();
    const spacing = 10;

    const styles = StyleSheet.create({
        container: {
            // @ts-ignore
            position: Platform.OS === "web" ? "fixed" : "absolute",
            right: spacing,
            bottom: BOTTOM_NAV_HEIGHT + spacing,
            shadowColor: palette.primary.dark,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 2,
            padding: 10,
        },
        icon: {
            color: palette.secondary.light,
        },
        modalOuter: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 8,
        },
        modalInner: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
        },
        modalButton: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 8,
            borderRadius: 8,
            minWidth: "50%",
        },
        modalButtonText: {
            textAlign: "center",
            color: palette.secondary.light,
            width: "100%",
        },
    });

    const iconSize = 30;

    return { styles, iconSize };
}

export default useStyles;
