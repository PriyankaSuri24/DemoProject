import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { getUsers } from "../storage/userStorage";
import { validateEmail } from "../utils/validation";
import { Alert, ScrollView, View, Text, Pressable, TextInput } from "react-native";
import React from "react";
import { useStyles } from './EmailLogin.styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default function EmailLogin() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const styles = useStyles();

    const handleLogin = async () => {
        const users = await getUsers();
        if(!email) return Alert.alert("Error", "Email required.");
        if (email && !validateEmail(email)) return Alert.alert("Error", "Invalid email format.");
        const user = users.find((u: { email: string; }) => u.email === email);
        if (!user) return Alert.alert("Error", "User not found");
        if (user.password !== password) return Alert.alert('Error', 'Incorrect password');
        await login({ userId: user.id, loginTime: new Date().toISOString() });
    }

    return (
        <ScrollView style={styles.view}>
            <View style={styles.container}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    style={styles.input}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        style={styles.passwrodInput}
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                            name={showPassword ? 'eye-sharp' : 'eye-off-sharp'}
                            size={22}
                            color="#af45d9"
                        />
                    </Pressable>
                </View>
                <Pressable onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}