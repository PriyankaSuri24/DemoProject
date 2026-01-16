import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'users';

export const getUsers = async () => {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : [];
}

export const saveUser = async (user: object) => {
    const users = await getUsers();
    users.push(user);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(users));
}