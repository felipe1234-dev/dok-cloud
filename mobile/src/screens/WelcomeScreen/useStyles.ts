import { StyleSheet } from "react-native";
import { useTheme } from "@providers";
import { darken } from "@functions";

function useStyles() {
    const { palette } = useTheme();

    const imageWidth = 150;
    const imageRatio = 0.6;
    const imageHeight = imageWidth / imageRatio;

    const titleColor = palette.text.light;
    const subtitleColor = darken(titleColor, 0.1);

    const backgroundColor = palette.primary.main;

    return StyleSheet.create({
        main: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            gap: 15,
            backgroundColor,
            paddingVertical: 40,
        },
        header: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        image: {
            width: imageWidth,
            height: imageHeight,
        },
        body: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            paddingHorizontal: 10,
        },
        title: {
            fontSize: 25,
            fontWeight: "600",
            color: titleColor,
            textAlign: "center",
        },
        subtitle: {
            fontSize: 14,
            fontWeight: "400",
            color: subtitleColor,
            textAlign: "center",
        },
        footer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            maxWidth: "65%",
            paddingHorizontal: 10,
        },
        button: {
            borderRadius: 5,
            padding: 10,
        },
        loginText: {
            fontWeight: "600",
            color: backgroundColor,
        },
        registerText: {
            fontWeight: "600",
            color: palette.secondary.light,
        },
    });
}

export default useStyles;
