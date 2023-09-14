import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useFonts } from "expo-font";

import { ScreenLoader } from "@components";
import { useRouter, useTheme } from "@providers";
import { fonts } from "@constants";

import useStyles from "./useStyles";

function Root() {
    const [showLoader, setShowLoader] = useState(false);
    const { screenConfig, CurrentScreen } = useRouter();
    const { palette } = useTheme();
    const [loaded] = useFonts(fonts);
    const styles = useStyles();

    useEffect(() => {
        setShowLoader(true);
        setTimeout(() => setShowLoader(false), 3000);
    }, [screenConfig]);

    return (
        <SafeAreaView style={styles.root}>
            <CurrentScreen />
            <ScreenLoader 
                animating={showLoader || !loaded}
                color={palette.primary.main}
                size="large"
            />
        </SafeAreaView>
    );
}

export default Root;
