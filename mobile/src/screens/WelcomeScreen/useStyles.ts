import { StyleSheet } from "react-native";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();

    return {
        root: StyleSheet.create({
            container: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                backgroundColor: palette.primary.main,
                height: "100%",
                width: "100%",
                padding: "auto",
            },
        }),
        header: StyleSheet.create({
            container: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 0,
            },
            image: {
                width: 180,
                height: 240,
            },
        }),
        body: StyleSheet.create({
            container: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                paddingVertical: 10,
                paddingHorizontal: 45,
            },
            title: {
                textAlign: "center",
                fontWeight: "400",
                color: palette.secondary.light,
                fontSize: 26,
                width: "100%",
            },
            subtitle: {
                textAlign: "center",
                fontWeight: "400",
                color: palette.secondary.main,
                fontSize: 14,
                width: "100%",
            },
        }),
        footer: StyleSheet.create({
            container: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 0,
                backgroundColor: "transparent",
                height: "auto",
                width: "100%",
            },
        }),
    };
}

export default useStyles;
