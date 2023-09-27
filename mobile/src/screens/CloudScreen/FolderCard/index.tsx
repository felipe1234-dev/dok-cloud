import { View, Image, Text } from "react-native";
import { Folder } from "dok-fortress-globals";

import { Button } from "@components";
import { FOLDER_ICON } from "@assets/images";

import useStyles from "./useStyles";

interface FolderCardProps {
    folder: Folder;
}

function FolderCard(props: FolderCardProps) {
    const { folder } = props;
    const styles = useStyles();

    return (
        <View style={styles.container}>
            <View style={styles.figure}>
                <Image
                    source={FOLDER_ICON}
                    style={styles.image}
                />
            </View>
            <View style={styles.info}>
                <Text style={styles.name}>{folder.name}</Text>
                <Text style={styles.description}>{folder.description}</Text>
            </View>
        </View>
    );
}

export { FolderCard };
export type { FolderCardProps };
