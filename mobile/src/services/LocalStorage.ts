import AsyncLocalStorage from "@react-native-async-storage/async-storage";

class LocalStorage {
    static async getItem(key: string) {
        const value = localStorage
            ? localStorage.getItem(key)
            : await AsyncLocalStorage.getItem(key);
        return value;
    }

    static async setItem(key: string, value: string) {
        await AsyncLocalStorage.setItem(key, value);
        if (localStorage) localStorage.setItem(key, value);
    }

    static async removeItem(key: string) {
        await AsyncLocalStorage.removeItem(key);
        if (localStorage) localStorage.removeItem(key);
    }

    static async clear() {
        await AsyncLocalStorage.clear();
        if (localStorage) localStorage.clear();
    }
}

export { LocalStorage };
