import { StyleSheet } from "react-native";
import { useAuth, useTheme } from "@providers";
import { BOTTOM_NAV_HEIGHT } from "@components";

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
            paddingBottom: loggedIn ? BOTTOM_NAV_HEIGHT : 0,
        },
    });
}

export default useStyles;
