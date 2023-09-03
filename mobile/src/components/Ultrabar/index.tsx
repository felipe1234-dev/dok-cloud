import { View, Switch } from "react-native";

function Ultrabar() {
    return (
        <View style={styles.nav}>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isLight ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
                value={isLight}
            />
        </View>
    );
}

export { Ultrabar };
