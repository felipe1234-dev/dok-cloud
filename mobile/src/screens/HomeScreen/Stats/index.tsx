import { View } from "react-native";
import { CircularProgress } from "@components";
import useStyles from "./useStyles";

function Stats() {
    const styles = useStyles();

    return (
        <View style={styles.container}>
            <CircularProgress
                size={120}
                progress={60}
                thickness={styles.pizza.thickness}
                tintColor={styles.pizza.tintColor}
                backgroundColor={styles.pizza.backgroundColor}
            />
        </View>
    );
}

export { Stats };
