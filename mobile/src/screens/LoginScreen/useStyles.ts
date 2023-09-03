import { StyleSheet } from "react-native";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();

    return {
        root: StyleSheet.create({
            container: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 0,
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
                gap: 8,
            },
            title: {
                textAlign: "center",
                fontWeight: "400",
                color: palette.secondary.light,
                fontSize: 18,
                width: "100%",
            },
            subtitle: {
                textAlign: "center",
                fontWeight: "400",
                color: palette.secondary.dark,
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
                gap: 8,
                backgroundColor: "transparent",
                height: "30%",
                width: "100%",
            },
            image: {
                transform: "rotate(180deg)",
            },
            noAccount: {
                textAlign: "center",
                fontWeight: "600",
                color: palette.primary.dark,
                fontSize: 14,
                width: "100%",
            },
        }),
    };
}

export default useStyles;
