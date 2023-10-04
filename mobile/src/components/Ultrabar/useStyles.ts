import { StyleSheet } from "react-native";

function useStyles() {
    return StyleSheet.create({
        nav: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 5,
            backgroundColor: "transparent",
            minHeight: 50,
            minWidth: "100%",
            paddingHorizontal: 15,
            paddingVertical: 20,
        },
        langSelector: {
            borderWidth: 0,
        },
    });
}

export default useStyles;
