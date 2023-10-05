import { StyleSheet } from "react-native";
import { lighten } from "@functions";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();
    const bgColor = palette.secondary.light;

    const imageWidth = 150;
    const imageRatio = 1;
    const imageHeight = imageWidth / imageRatio;

    const titleColor = palette.text.dark;
    const subtitleColor = lighten(titleColor, 0.1);

    return StyleSheet.create({
        main: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
            height: "100%",
            width: "100%",
            backgroundColor: bgColor,
            padding: "auto",
            paddingVertical: 25,
        },
        image: {
            width: imageWidth,
            height: imageHeight,
        },
        header: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            width: "100%",
            padding: "auto",
        },
        title: {
            fontSize: 20,
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
        form: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            width: "100%",
            paddingHorizontal: 30,
        },
        label: {
            fontWeight: "600",
        },
        footer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            width: "100%",
            paddingHorizontal: 30,
        },
        register: {
            borderRadius: 5,
            fontWeight: "600",
            padding: 10,
        },
        registerText: {
            color: palette.secondary.light,
        },
        login: {
            textAlign: "center",
            color: palette.primary.main,
        },
    });
}

export default useStyles;
