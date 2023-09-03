import { StyleSheet } from "react-native";
import { useTheme } from "@providers";

function useStyles() {
    const { palette } = useTheme();

    return StyleSheet.create({
        stats: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 8,
            padding: 22,
        },
        card: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            padding: 15,
            backgroundColor: palette.info.main,
            borderRadius: 20,
            width: "100%",
        },
        number: {
            
        }
    });
}

export default useStyles;
