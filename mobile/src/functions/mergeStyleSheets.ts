import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

type Styles = ViewStyle | TextStyle | ImageStyle;

function mergeStyleSheets(stylesheets: [style: Styles, condition: boolean][]) {
    let result: Styles = {};

    for (const [stylesheet, condition] of stylesheets) {
        if (!condition) continue;

        result = { ...result, ...stylesheet };
    }

    return result;
}

export { mergeStyleSheets };
