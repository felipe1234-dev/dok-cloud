import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { mergeStyleSheets } from "@functions";
import useStyles from "./useStyles";

interface ButtonProps extends TouchableOpacityProps {
    round?: boolean;
    fullWidth?: boolean;
}

function Button(props: ButtonProps) {
    const { 
        round = false, 
        fullWidth = false, 
        children, 
        ...rest 
    } = props;
    const styles = useStyles();

    return (
        <TouchableOpacity
            style={mergeStyleSheets([
                [styles.fullWidth, fullWidth],
                [styles.round, round],
            ])}
            {...rest}
        >
            {children}
        </TouchableOpacity>
    );
}

export { Button };
