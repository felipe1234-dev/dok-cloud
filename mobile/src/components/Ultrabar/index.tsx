import { View } from "react-native";

import { Button } from "../Button";
import { Icon } from "../Icon";
import { Selector } from "../Selector";

import useLogic from "./useLogic";
import useStyles from "./useStyles";

function Ultrabar() {
    const {
        handleToggleTheme,
        isLight,
        handleLanguageChange,
        languageOptions,
        selectedLanguage,
    } = useLogic();
    const styles = useStyles();

    return (
        <View style={styles.nav}>
            <Selector
                containerStyle={styles.langSelector}
                options={languageOptions}
                onChange={handleLanguageChange}
                value={selectedLanguage}
                left={
                    <Icon
                        type="ionicon"
                        name="language-outline"
                    />
                }
            />
            <Button
                transparent
                onPress={handleToggleTheme}
            >
                <Icon
                    type={isLight ? "fontisto" : "feather"}
                    name={isLight ? "day-sunny" : "moon"}
                />
            </Button>
        </View>
    );
}

export { Ultrabar };
