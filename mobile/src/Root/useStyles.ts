import { useAuth, useTheme } from "@providers";
import { StyleSheet } from "react-native";

function useStyles() {
    const { palette } = useTheme();
    const { user } = useAuth();
    const loggedIn = !!user;

    return StyleSheet.create({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            height: "100%",
            backgroundColor: palette.primary.main,
            fontFamily: "Mulish-Regular",
        },
        screen: {
            width: "100%",
            height: "100%",
            paddingBottom: loggedIn ? 40 : 0,
        },
    });
}

export default useStyles;
