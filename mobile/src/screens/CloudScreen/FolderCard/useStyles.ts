import { StyleSheet } from "react-native";
import { lighten } from "@functions";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();

    const imageWidth = 60;
    const imageHeight = imageWidth;

    const textColor = palette.text.dark;
    const textSize = 16;

    return StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 5,
            padding: 0,
            backgroundColor: "transparent",
        },
        figure: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 0,
            backgroundColor: "transparent",
            height: imageHeight,
            width: imageWidth,
        },
        image: {
            width: imageWidth,
            height: imageHeight,
        },
        info: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 5,
        },
        name: {
            color: textColor,
            fontWeight: "600",
            fontSize: textSize,
        },
        description: {
            color: textColor,
            fontWeight: "400",
            fontSize: textSize * 0.8,
        },
    });
}

export default useStyles;
