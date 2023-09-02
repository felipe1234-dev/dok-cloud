import { Image, ImageProps } from "react-native";
import { View, ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import useStyles from "./useStyles";

interface ImageBackgroundProps
    extends Omit<ImageProps, "style">,
        Omit<ViewProps, "style"> {
    viewStyle?: ImageProps["style"];
    imageStyle?: ImageProps["style"];
}

function ImageBackground(props: ImageBackgroundProps) {
    const { source, viewStyle, imageStyle, children, ...rest } = props;
    const styles = useStyles();

    return (
        <View
            style={StyleSheet.compose(styles.container, viewStyle)}
            {...rest}
        >
            <Image
                source={source}
                style={StyleSheet.compose(styles.image, imageStyle)}
                {...rest}
            />
            {children}
        </View>
    );
}

export { ImageBackground };
export type { ImageBackgroundProps };
