import { View, Text } from "react-native";

import { useI18n, useAuth } from "@providers";
import { Ultrabar, TextInput, Icon } from "@components";

import useStyles from "./useStyles";
import useLogic from "./useLogic";

function Header() {
    const { t } = useI18n();
    const { user } = useAuth();
    const { greetings } = useLogic();
    const styles = useStyles();

    if (!user) return <></>;
    const { name } = user;

    return (
        <View style={styles.root}>
            <Ultrabar />
            <View style={styles.main}>
                <Text style={styles.greetings}>
                    {t(greetings, { $name: name })}
                </Text>
                <TextInput
                    fullWidth
                    containerStyle={styles.searchBarContainer}
                    inputStyle={styles.searchBarInput}
                    placeholder={t("Search folder and files")}
                    left={
                        <Icon
                            type="feather"
                            name="search"
                        />
                    }
                />
            </View>
        </View>
    );
}

export { Header };
