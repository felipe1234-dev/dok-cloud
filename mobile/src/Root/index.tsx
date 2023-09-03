import { SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import { useRouter } from "@providers";
import { fonts } from "@constants";
import useStyles from "./useStyles";

function Root() {
    const { CurrentScreen } = useRouter();
    const [loaded] = useFonts(fonts);
    const styles = useStyles();

    if (!loaded) return <></>;

    return (
        <SafeAreaView style={styles.root}>
            <CurrentScreen />
        </SafeAreaView>
    );
}

export default Root;
