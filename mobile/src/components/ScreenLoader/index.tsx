import { View, ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { mergeStyleSheets } from "@functions";
import useStyles from "./useStyles";

interface ScreenLoaderProps extends ActivityIndicatorProps {
    size?: "small" | "large";
}

function ScreenLoader(props: ScreenLoaderProps) {
    const { animating = false } = props;
    const styles = useStyles();

    console.log("animating", animating);

    return (
        <View style={mergeStyleSheets([
            styles.container,
            [styles.hidden, !animating]
        ])}>
            <ActivityIndicator {...props} />
        </View>
    );
}

export { ScreenLoader };
