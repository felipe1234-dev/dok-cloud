import { StyleSheet } from "react-native";
import { lighten } from "@functions";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();
    const bgColor = palette.primary.main;

    return {
        root: StyleSheet.create({
            container: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
                backgroundColor: bgColor,
                height: "100%",
                width: "100%",
                padding: "auto",
            },
        }),
        header: StyleSheet.create({
            container: {
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 0,
                width: "100%",
                height: "35%",
                paddingHorizontal: 25
            },
            title: {
                textAlign: "left",
                fontWeight: "600",
                fontSize: 32,
                width: "100%",
                color: palette.secondary.light,
            },
            circle: {
                position: "absolute",
                borderRadius: 1000,
                backgroundColor: lighten(bgColor, 0.1)
            },
            circle1: {
                top: -100,
                right: -50,
                width: 250,
                height: 250,
            },
            circle2: {
                bottom: -35,
                left: 30,
                width: 60,
                height: 60,
            },
            circle3: {
                bottom: 30,
                left: -5,
                width: 20,
                height: 20,
            },
        }),
        body: StyleSheet.create({
            container: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                width: "100%",
                backgroundColor: palette.secondary.light,
                paddingVertical: 10,
                paddingHorizontal: 45,
                borderRadius: 20,
            },
            title: {
                textAlign: "center",
                fontWeight: "400",
                color: palette.text.dark,
                fontSize: 26,
                width: "100%",
            },
            subtitle: {
                textAlign: "center",
                fontWeight: "400",
                color: palette.text.main,
                fontSize: 14,
                width: "100%",
            },
        }),
    };
}

export default useStyles;
