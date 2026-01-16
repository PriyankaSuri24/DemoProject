import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { getUsers } from "../storage/userStorage";
import { Alert, ScrollView, View, Text, Pressable, TextInput } from "react-native";
import React from "react";
import { styles } from './PhoneLogin.styles';

export default function PhoneLogin() {
    const { login } = useContext(AuthContext);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const users = await getUsers();
        if (!phone) return Alert.alert("Error", "Phone required");
        const user = users.find(((u: { phone: string; }) => u.phone === phone));
        if (!user) return Alert.alert("Error", "User not found");
        if (user.password !== password) return Alert.alert('Error', 'Incorrect password');
        await login({ userId: user.id, loginTime: new Date().toISOString() });
    }

    return (
        <ScrollView style={styles.view}>
            <View style={styles.container}>
                <TextInput
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
                <Pressable onPress={handleLogin} style={styles.loginButton}>
                    <Text>Login</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}