import { StyleSheet } from "react-native";

function useStyles() {
    return StyleSheet.create({
        fullWidth: {
            width: "100%",
        },
        round: {
            borderRadius: 50
        }
    });
}

export default useStyles;
