import { View } from "react-native";

import { Header } from "./Header";
import { Stats } from "./Stats";
import { Pinned } from "./Pinned";
import { Recents } from "./Recents";

import useStyles from "./useStyles";

function HomeScreen() {
    const styles = useStyles();

    return (
        <View style={styles.main}>
            <Header />
            <Stats />
            <Recents />
            <Pinned />
        </View>
    );
}

export { HomeScreen };
