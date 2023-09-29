import { StyleSheet } from "react-native";

function useStyles() {
    return StyleSheet.create({
        list: {
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
    });
}

export default useStyles;
