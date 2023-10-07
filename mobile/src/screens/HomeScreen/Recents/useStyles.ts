import { StyleSheet } from "react-native";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();

    return StyleSheet.create({
        main: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 8,
            backgroundColor: "transparent",
            width: "100%",
            paddingHorizontal: 25,
        },
        header: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
        },
        title: {
            fontSize: 18,
            textAlign: "center",
        },
        paragraph: {
            fontSize: 14,
            textAlign: "center",
            fontWeight: "400",
        },
        image: {
            width: 120,
            height: 120,
        },
        empty: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginVertical: 25,
        },
        fileExplorerButton: {
            marginTop: 15,
            borderRadius: 8,
        },
        fileExplorerIcon: {
            color: palette.text.light,
        },
    });
}

export default useStyles;
