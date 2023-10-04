import { Text, TextProps, TextStyle } from "react-native";
import { View, ViewProps } from "react-native";

import { Variant, ColorTone, ScreenName } from "@types";

import useLogic from "./useLogic";
import useStyles from "./useStyles";

interface LinkProps extends TextProps, ViewProps {
    variant?: Variant;
    tone?: ColorTone;
    url?: string;
    to?: ScreenName;
    screenProps?: { [key: string]: any };
    reload?: boolean;
    style?: TextStyle;
}

function Link(props: LinkProps) {
    const { children } = props;
    const { touching, handleOnPress, handleOnTouchStart, handleOnTouchEnd } =
        useLogic(props);
    const styles = useStyles({ ...props, touching });

    return (
        <View
            onTouchStart={handleOnTouchStart}
            onTouchEnd={handleOnTouchEnd}
        >
            <Text
                onPress={handleOnPress}
                style={styles.text}
            >
                {children}
            </Text>
        </View>
    );
}

export { Link };
export type { LinkProps };
