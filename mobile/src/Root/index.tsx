import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useFonts } from "expo-font";

import { ScreenLoader, CustomToast, BottomNav } from "@components";
import { useNavigator, useTheme, useAuth } from "@providers";
import { fonts } from "@constants";

import useStyles from "./useStyles";

function Root() {
    const [showLoader, setShowLoader] = useState(false);
    const { screenConfig, CurrentScreen } = useNavigator();
    const { palette } = useTheme();
    const { user } = useAuth();
    const [loaded] = useFonts(fonts);
    const styles = useStyles();

    useEffect(() => {
        setShowLoader(true);
        setTimeout(() => setShowLoader(false), 3000);
    }, [screenConfig]);

    if (showLoader || !loaded) {
        return (
            <ScreenLoader
                animating
                color={palette.primary.main}
                size="large"
            />
        );
    }

    return (
        <SafeAreaView style={styles.root}>
            <CurrentScreen />
            <CustomToast />
            {!!user && <BottomNav />}
        </SafeAreaView>
    );
}

export default Root;
