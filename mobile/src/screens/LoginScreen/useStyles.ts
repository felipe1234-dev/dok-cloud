import { StyleSheet } from "react-native";
import { lighten } from "@functions";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();
    const bgColor = palette.primary.main;

    const circle = {
        position: "absolute" as "absolute",
        borderRadius: 1000,
        backgroundColor: lighten(bgColor, 0.1),
    };

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
                flex: 1,
                gap: 0,
                width: "100%",
                height: "35%",
                paddingHorizontal: 25,
            },
            title: {
                textAlign: "left",
                fontWeight: "600",
                fontSize: 32,
                width: "100%",
                color: palette.secondary.light,
            },
            circle1: {
                ...circle,
                top: -100,
                right: -50,
                width: 250,
                height: 250,
            },
            circle2: {
                ...circle,
                bottom: -35,
                left: 30,
                width: 60,
                height: 60,
            },
            circle3: {
                ...circle,
                bottom: 30,
                left: -5,
                width: 20,
                height: 20,
            },
        }),
        form: StyleSheet.create({
            container: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flex: 2,
                gap: 8,
                width: "100%",
                backgroundColor: palette.secondary.light,
                padding: 30,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            },
            formFields: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 8,
                width: "100%",
            },
            title: {},
            subtitle: {},
            label: {
                fontWeight: "600",
            },
            button: {},
            buttonText: {
                color: palette.text.light,
            },
        }),
    };
}

export default useStyles;
