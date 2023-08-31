import { SafeAreaView, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { useRouter } from "@providers";
import { fonts } from "@constants";
import useStyles from "./useStyles";

function Root() {
    const { CurrentScreen } = useRouter();
    const styles = useStyles();
    const [loaded] = useFonts(fonts);

    if (!loaded) return <></>;

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView>
                <CurrentScreen />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Root;
