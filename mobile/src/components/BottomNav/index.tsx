import { View } from "react-native";

import { screenConfigs } from "@constants";
import { ScreenName } from "@types";
import { mergeStyleSheets } from "@functions";

import { Button } from "../Button";
import { Icon, IconProps } from "../Icon";

import useStyles from "./useStyles";
import useLogic from "./useLogic";

const icons: { [K in ScreenName]?: IconProps } = {
    Home: {
        type: "antdesign",
        name: "home",
    },
};

function BottomNav() {
    const { currentScreen, handleNavigateToScreen } = useLogic();
    const styles = useStyles();

    return (
        <View style={styles.nav}>
            {screenConfigs
                .filter((screen) => !!icons[screen.name])
                .map((screen) => {
                    const iconProps = icons[screen.name];
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
