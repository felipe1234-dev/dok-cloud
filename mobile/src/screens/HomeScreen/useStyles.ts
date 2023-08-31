import { StyleSheet } from "react-native";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();

    return StyleSheet.create({
        heading: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            textAlign: "center",
            textBreak: "break-word",
            minHeight: "50%"
        },
        catchline: {
            color: palette.secondary.main,
            fontWeight: "300",
            fontSize: 25,
            margin: "auto",
        },
    });
}

export default useStyles;
