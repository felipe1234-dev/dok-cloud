import { StyleSheet } from "react-native";

function useStyles() {
    return StyleSheet.create({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 8,
            backgroundColor: "transparent",
            width: "100%",
            padding: 0,
        },
        main: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 15,
            width: "100%",
            paddingHorizontal: 25,
        },
        greetings: {
            textAlign: "left",
            fontWeight: "600",
            fontSize: 16,
            textBreak: "break-word",
        },
        searchBarContainer: {
            paddingLeft: 8,
        },
        searchBarInput: {
            padding: 8,
            paddingLeft: 0,
            fontSize: 16,
            fontWeight: "400",
        },
    });
}

export default useStyles;
