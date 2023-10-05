import { View } from "react-native";
import { Ultrabar, Button, Icon } from "@components";
import { FileExplorer } from "./FileExplorer";
import useStyles from "./useStyles";

function CloudScreen() {
    const styles = useStyles();

    return (
        <View style={styles.main}>
            <Ultrabar />
            <FileExplorer />
            <Button
                round
                variant="primary"
                tone="light"
                style={styles.upload}
            >
                <Icon
                    type="font-awesome-5"
                    name="plus"
                />
            </Button>
        </View>
    );
}

export { CloudScreen };
