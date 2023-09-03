import { StyleSheet } from "react-native";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();

    const paddingY = 10;
    const paddingX = 22;

    return StyleSheet.create({
        heading: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 3,
            textAlign: "left",
            textBreak: "break-word",
            minHeight: "50%",
            paddingTop: paddingY,
            paddingBottom: paddingY,
            paddingLeft: paddingX,
            paddingRight: paddingX,
        },
        welcome: {
            color: palette.secondary.light,
            fontWeight: "400",
            fontSize: 13,
        },
        yourStorage: {
            color: palette.secondary.main,
            fontWeight: "600",
            fontSize: 25,
        },
    });
}

export default useStyles;
