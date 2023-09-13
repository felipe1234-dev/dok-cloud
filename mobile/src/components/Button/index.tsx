import {
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from "react-native";
import { mergeStyleSheets } from "@functions";
import useStyles from "./useStyles";

interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
    round?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
}

function Button(props: ButtonProps) {
    const {
        round = false,
        fullWidth = false,
        style,
        children,
        ...rest
    } = props;
    const styles = useStyles();

    return (
        <TouchableOpacity
            style={mergeStyleSheets([
                styles.button,
                [styles.fullWidth, fullWidth],
                [styles.round, round],
                [style, !!style],
            ])}
            {...rest}
        >
            {children}
        </TouchableOpacity>
    );
}

export { Button };
