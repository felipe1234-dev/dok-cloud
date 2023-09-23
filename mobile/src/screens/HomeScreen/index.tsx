import { View } from "react-native";
import { Header } from "./Header";
import useStyles from "./useStyles";

function HomeScreen() {
    const styles = useStyles();

    return (
        <View style={styles.main}>
            <Header />
        </View>
    );
}

export { HomeScreen };
