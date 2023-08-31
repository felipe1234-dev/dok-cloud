import { Text, View } from "react-native";
import useStyles from "./useStyles";

function HomeScreen() {
    const styles = useStyles();

    return (
        <View style={styles.heading}>
            <Text style={styles.catchline}>Manage</Text>
            <Text style={styles.catchline}>Your Files</Text>
        </View>
    );
}

export { HomeScreen };
