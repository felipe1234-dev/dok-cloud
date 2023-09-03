import { View, Text } from "react-native";
import useStyles from "./useStyles";

function Heading() {
    const styles = useStyles();

    return (
        <View style={styles.heading}>
            <Text style={styles.welcome}>Welcome, Felipe Alves</Text>
            <Text style={styles.yourStorage}>Your storage</Text>
        </View>
    );
}

export { Heading };
