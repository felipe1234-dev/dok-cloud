import {
    Button as NativeButton,
    ButtonProps as NativeButtonProps,
} from "react-native";
import { View, ViewProps } from "react-native";
import { mergeStyleSheets } from "@functions";
import useStyles from "./useStyles";

interface ButtonProps extends NativeButtonProps, ViewProps {
    fullWidth?: boolean;
}

function Button(props: ButtonProps) {
    const { fullWidth = false, ...rest } = props;
    const styles = useStyles();

    return (
        <View
            style={mergeStyleSheets(new Map([[styles.fullWidth, fullWidth]]))}
        >
            <NativeButton {...rest} />
        </View>
    );
}

export { Button };
