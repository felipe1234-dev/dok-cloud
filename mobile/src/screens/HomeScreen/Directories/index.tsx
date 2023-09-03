import { useState } from "react";
import { ScrollView } from "react-native";
import { useDocTree } from "@providers";
import { Directory } from "@types";
import useStyles from "./useStyles";

function Directories() {
    const [openDirectory, setOpenDirectory] = useState<Directory>();
    const { tree } = useDocTree();
    const styles = useStyles();

    return (
        <ScrollView style={styles.list}>
            {}
        </ScrollView>
    );
}

export { Directories };