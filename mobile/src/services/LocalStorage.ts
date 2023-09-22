import AsyncLocalStorage from "@react-native-async-storage/async-storage";

class LocalStorage {
    static async getItem(key: string) {
        const value =
            (await AsyncLocalStorage.getItem(key)) || !!localStorage
                ? localStorage.getItem(key)
                : null;
        return value;
    }

    static async setItem(key: string, value: string) {
        await AsyncLocalStorage.setItem(key, value);
        localStorage.setItem(key, value);
    }

    static async removeItem(key: string) {
        await AsyncLocalStorage.removeItem(key);
        localStorage.removeItem(key);
    }

    static async clear() {
        await AsyncLocalStorage.clear();
        localStorage.clear();
    }
}

export { LocalStorage };
