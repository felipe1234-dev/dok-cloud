import AsyncLocalStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

/** Wrapper for AsyncLocalStorage and localStorage (Web) */
class LocalStorage {
    static async getItem(key: string) {
        const value =
            Platform.OS === "web"
                ? localStorage.getItem(key)
                : await AsyncLocalStorage.getItem(key);
        return value;
    }

    static async setItem(key: string, value: string) {
        await AsyncLocalStorage.setItem(key, value);
        if (Platform.OS === "web") localStorage.setItem(key, value);
    }

    static async removeItem(key: string) {
        await AsyncLocalStorage.removeItem(key);
        if (Platform.OS === "web") localStorage.removeItem(key);
    }

    static async clear() {
        await AsyncLocalStorage.clear();
        if (Platform.OS === "web") localStorage.clear();
    }
}

export { LocalStorage };
