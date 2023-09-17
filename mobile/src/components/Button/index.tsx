import {
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from "react-native";
import { Variant, ColorTone } from "@types";
import useStyles from "./useStyles";

interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
    round?: boolean;
    fullWidth?: boolean;
    transparent?: boolean;
    outlined?: boolean;
    variant?: Variant;
    tone?: ColorTone;
    textVariant?: Variant;
    textTone?: ColorTone;
    style?: ViewStyle;
}

function Button(props: ButtonProps) {
    const { children, ...rest } = props;
    const styles = useStyles(props);

    return (
        <TouchableOpacity
            {...rest}
            style={styles.button}
        >
            {children}
        </TouchableOpacity>
    );
}

export { Button };
export type { ButtonProps };
