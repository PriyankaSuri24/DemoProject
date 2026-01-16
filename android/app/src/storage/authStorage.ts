import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = 'SESSION';

export const getSession = async () => {
    const data = await AsyncStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
}

export const setSession = async (session: any) => {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export const clearSession = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
}