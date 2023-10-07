import { StyleSheet } from "react-native";
import { CircularProgressProps } from "./index";

interface CircularProgressStyleParams extends CircularProgressProps {}

function useStyles(params: CircularProgressStyleParams) {
    const { tintColor, size } = params;

    return StyleSheet.create({
        container: {
            position: "relative",
            width: size,
            height: size,
        },
        label: {
            position: "absolute",
            left: 0,
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            color: tintColor,
        },
    });
}

export default useStyles;
