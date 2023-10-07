import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useFonts } from "expo-font";

import { ScreenLoader, CustomToast, BottomNav } from "@components";
import { useNavigator, useTheme, useAuth } from "@providers";
import { fonts } from "@constants";

import useStyles from "./useStyles";

function Root() {
    const [showLoader, setShowLoader] = useState(false);
    const { reload, setReload, screenConfig, CurrentScreen } = useNavigator();
    const { palette } = useTheme();
    const { user } = useAuth();
    const [loaded] = useFonts(fonts);
    const styles = useStyles();

    useEffect(() => {
        if (!reload) return;
        setShowLoader(true);
        setTimeout(() => {
            setShowLoader(false);
            setReload(true);
        }, 3000);
    }, [screenConfig, reload]);

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
            <ScrollView contentContainerStyle={styles.screen}>
                <CurrentScreen />
            </ScrollView>
            <CustomToast />
            {!!user && <BottomNav />}
        </SafeAreaView>
    );
}

export default Root;
