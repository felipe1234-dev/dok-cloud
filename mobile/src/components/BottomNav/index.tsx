import { View } from "react-native";

import { screens } from "@constants";
import { mergeStyleSheets } from "@functions";

import { Button } from "../Button";
import { Icon } from "../Icon";

import useStyles from "./useStyles";
import useLogic from "./useLogic";

function BottomNav() {
    const { currentScreen, handleNavigateToScreen } = useLogic();
    const styles = useStyles();

    return (
        <View style={styles.nav}>
            {screens.map((screen) => {
                const iconProps = screen.icon;
                if (!iconProps) return <></>;

                return (
                    <Button
                        key={screen.name}
                        transparent
                        onPress={handleNavigateToScreen(screen.name)}
                    >
                        <Icon
                            {...iconProps}
                            size={22}
                            style={mergeStyleSheets([
                                [
                                    styles.selected,
                                    screen.name === currentScreen,
                                ],
                            ])}
                        />
                    </Button>
                );
            })}
        </View>
    );
}

export { BottomNav };
