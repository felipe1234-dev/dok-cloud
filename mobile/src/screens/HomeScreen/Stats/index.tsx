import { View } from "react-native";
import useStyles from "./useStyles";

function Stats() {
    const styles = useStyles();

    return (
        <View style={styles.stats}>
            <View style={styles.card}></View>
        </View>
    );
}

export { Stats };
