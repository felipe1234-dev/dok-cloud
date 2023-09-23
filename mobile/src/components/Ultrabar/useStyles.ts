import { StyleSheet } from "react-native";

function useStyles() {
    return StyleSheet.create({
        nav: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 8,
            backgroundColor: "transparent",
            minHeight: 50,
            minWidth: "100%",
            paddingHorizontal: 15,
        },
        langSelector: {
            borderWidth: 0,
        },
    });
}

export default useStyles;
