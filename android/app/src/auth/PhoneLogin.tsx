import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { getUsers } from "../storage/userStorage";
import { Alert, ScrollView, View, Text, Pressable, TextInput, Image, Modal, FlatList } from "react-native";
import React from "react";
import { useStyles } from './PhoneLogin.styles';
import { fetchCountries, Country } from '../api/CallingApi';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PhoneLogin() {
    const { login } = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const styles = useStyles();

    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [phone, setPhone] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
                const loadCountries = async () => {
                try {
                    const data = await fetchCountries();
                    setCountries(data);
                    setSelectedCountry(data.find(c => c.code === 'IN') || data[0]);
                } catch (error) {
                    console.error(error);
                }};
                loadCountries();
    }, []);

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
                <View style={styles.phoneContainer}>
                    <Pressable style={styles.selector} onPress={() => setModalVisible(true)}>
                        {selectedCountry && (
                        <>
                            <Image source={{ uri: selectedCountry.flag }} style={styles.flag} />
                            <Text>{selectedCountry.name} ({selectedCountry.dialCode})</Text>
                        </>
                        )}
                    </Pressable>
                    <TextInput
                        // eslint-disable-next-line no-sparse-arrays, react-native/no-inline-styles
                        style={[styles.phoneInput, , { flex: 0.6, marginLeft: 8 }]}
                        keyboardType="phone-pad"
                        placeholder="Enter phone number"
                        value={phone}
                        onChangeText={setPhone}
                    />
                    <Modal visible={modalVisible} animationType="slide">
                        <FlatList
                            data={countries}
                            keyExtractor={(item) => item.code}
                            style={styles.list}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={styles.countryItem}
                                    onPress={() => {
                                        setSelectedCountry(item);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Image source={{ uri: item.flag }} style={styles.flag} />
                                    <Text>{item.name} ({item.dialCode})</Text>
                                </Pressable>
                            )}
                        />
                    </Modal>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        style={styles.input}
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