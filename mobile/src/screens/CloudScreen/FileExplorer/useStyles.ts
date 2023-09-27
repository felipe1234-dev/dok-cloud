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
            paddingHorizontal: 15,
            backgroundColor: "transparent",
            width: "100%",
            height: "100%",
        },
        folderInfo: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 6,
            width: "100%",
        },
        listHeader: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 6,
            width: "100%",
            minHeight: 50,
        },
        list: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
            backgroundColor: "transparent",
            width: "100%",
        },
        sort: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
        },
    });
}

export default useStyles;
