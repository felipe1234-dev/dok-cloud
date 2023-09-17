import {
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
    ActivityIndicator
} from "react-native";
import { Variant, ColorTone } from "@types";
import useStyles from "./useStyles";

interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
    round?: boolean;
    fullWidth?: boolean;
    transparent?: boolean;
    outlined?: boolean;
    loading?: boolean;
    variant?: Variant;
    tone?: ColorTone;
    textVariant?: Variant;
    textTone?: ColorTone;
    style?: ViewStyle;
}

function Button(props: ButtonProps) {
    const { children, loading = false, ...rest } = props;
    const styles = useStyles(props);

    return (
        <TouchableOpacity
            {...rest}
            style={styles.button}
        >
            {loading ? (
                <ActivityIndicator 
                    animating
                    color={styles.indicator.color}
                    size="small"   
                />
            ) :children}
        </TouchableOpacity>
    );
}

export { Button };
export type { ButtonProps };
