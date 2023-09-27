import { View, Text } from "react-native";
import { Folder } from "dok-fortress-globals";

import { useI18n } from "@providers";
import { Button, Icon } from "@components";
import { FolderCard } from "../FolderCard";

import useStyles from "./useStyles";
import useLogic from "./useLogic";

function FileExplorer() {
    const { t } = useI18n();
    const styles = useStyles();
    const { parentFolder, children, sortOrder, handleToggleSortOrder } =
        useLogic();

    if (!parentFolder) return <></>;

    return (
        <View style={styles.main}>
            <View style={styles.folderInfo}>
                <Text>{parentFolder.name}</Text>
                <Text>{parentFolder.description}</Text>
            </View>
            <View style={styles.listHeader}>
                <View />
                <View style={styles.sort}>
                    <Button
                        transparent
                        onPress={handleToggleSortOrder}
                    >
                        <Icon
                            type="font-awesome-5"
                            name={`sort-alpha-${
                                sortOrder === "desc" ? "down" : "up"
                            }`}
                        />
                    </Button>
                </View>
            </View>
            <View style={styles.list}>
                {children.map((item) =>
                    Folder.isFolder(item) ? (
                        <FolderCard
                            key={item.uid}
                            folder={item}
                        />
                    ) : (
                        item.filename
                    )
                )}
            </View>
        </View>
    );
}

export { FileExplorer };
