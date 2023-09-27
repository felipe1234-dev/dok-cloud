import { View } from "react-native";
import { Ultrabar } from "@components";
import { FileExplorer } from "./FileExplorer";
import useStyles from "./useStyles";

function CloudScreen() {
    const styles = useStyles();

    return (
        <View style={styles.main}>
            <Ultrabar />
            <FileExplorer />
        </View>
    );
}

export { CloudScreen };
