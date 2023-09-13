import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

type Styles = ViewStyle | TextStyle | ImageStyle | null | undefined;

function mergeStyleSheets(
    stylesheets: Array<[style: Styles, condition: boolean] | Styles>
) {
    let result: Styles = {};

    for (const item of stylesheets) {
        if (!Array.isArray(item)) {
            const stylesheet = item;
            result = { ...result, ...stylesheet };
        } else {
            const [stylesheet, condition] = item;
            if (!stylesheet || !condition) continue;

            result = { ...result, ...stylesheet };
        }
    }

    return result;
}

export { mergeStyleSheets };
