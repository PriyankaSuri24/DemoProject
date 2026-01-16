import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { getUsers } from "../storage/userStorage";
import { validateEmail } from "../utils/validation";
import { Alert, ScrollView, View, Text, Pressable, TextInput } from "react-native";
import React from "react";
import { styles } from './Login.styles';

export default function Login() {
    const { login } = useContext(AuthContext);
    const [method, setMethod] = useState<'email' | 'phone'>('email');

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [hovered, setHovered] = useState(false);

    const handleLogin = async () => {
        const users = await getUsers();

        let user;
        if (method === 'email') {
            if(!email) return Alert.alert("Error", "Email required.");
            if (email && !validateEmail(email)) return Alert.alert("Error", "Invalid email format.");
            user = users.find((u: { email: string; }) => u.email === email);
        } else {
            if (!phone) return Alert.alert("Error", "Phone required");
            user = users.find(((u: { phone: string; }) => u.phone === phone));
        }

        if (!user) return Alert.alert("Error", "User not found");
        if (user.password !== password) return Alert.alert('Error', 'Incorrect password');

        await login({ userId: user.id, loginTime: new Date().toISOString() });
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Pressable onPress={() => 
                                setMethod('email')} 
                                onHoverIn={() => setHovered(true)}
                                onHoverOut={() => setHovered(false)}
                                style={({pressed}) => [
                                    styles.emailButton,
                                    hovered && styles.hover,
                                    pressed && styles.pressed
                                ]}>
                    <Text style={styles.emailText}>Email</Text>
                </Pressable>
                <Pressable onPress={() => 
                                setMethod('phone')} 
                                onHoverIn={() => setHovered(true)}
                                onHoverOut={() => setHovered(false)}
                                style={({pressed}) => [
                                    styles.emailButton,
                                    hovered && styles.hover,
                                    pressed && styles.pressed
                                ]}>
                    <Text style={styles.phoneText}>Phone</Text>
                </Pressable>
            </View>

            {method === 'email' ? (
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    style={styles.input}
                />
            ) : (
                <TextInput
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    style={styles.input}
                />
            )}
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            <Pressable onPress={handleLogin} style={styles.loginButton}>
                <Text>
                    Login
                </Text>
            </Pressable>
        </ScrollView>
    )
}