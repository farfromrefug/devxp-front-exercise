import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useAsyncStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadValue = async () => {
            try {
                const item = await AsyncStorage.getItem(key);
                setStoredValue(item != null ? JSON.parse(item) : initialValue);
            } catch (error) {
                console.error("Error loading from AsyncStorage", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadValue();
    }, [key]);

    const setValue = async (value: T) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Error setting AsyncStorage", error);
        }
    };
    return [storedValue, setValue, isLoading] as [
        T,
        (value: T) => Promise<void>,
        boolean,
    ];
}

export default useAsyncStorage;
