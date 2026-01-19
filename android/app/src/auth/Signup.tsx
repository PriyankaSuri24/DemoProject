import {  Alert, Text, ScrollView, TextInput, Pressable, View, Image, Modal, FlatList } from 'react-native';
import { AuthContext } from '../context/authContext';
import React, { useContext, useState, useEffect } from 'react';
import { getUsers, saveUser } from '../storage/userStorage';
import { validateEmail } from '../utils/validation';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './Signup.styles';
import { validatePassword } from '../utils/passwordValidation';
import { fetchCountries, Country } from '../api/CallingApi';

export default function Signup (){
        const { login } = useContext(AuthContext);
        const navigation = useNavigation<any>();

        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [showPassword, setShowPassword] = useState(false);
        
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

        const handleResgister = async () => {
            if (!firstName){
                return Alert.alert('Error', 'First name required.');
            }
            if (!password || !confirmPassword){
                return Alert.alert('Error', 'Both password and confirm password required.');
            }

            const {isValid, errors} = validatePassword(password);
            if(!isValid){
                return Alert.alert('Weak Password', errors.join('\n'));
            }

            if(!(phone?.length || email?.length)) {
                return Alert.alert('Validation Error', 'Please provide either an email or a phone number.');
            }
            if(email?.length && !validateEmail(email)){
                return Alert.alert('Error', 'Invalid email format.');
            }
            if(password !== confirmPassword) {
                return Alert.alert('Error', 'Passwords do not match.');
            }

            const users  = await getUsers();  
            const emailExists = email?.length 
                                    ? users.find((u: any) => u.email === email) 
                                    : false;
            const phoneExists = phone?.length
                                    ? users.find((u: any) => u.phone === phone)
                                    : false;

            if(emailExists || phoneExists) {
                return Alert.alert('Error', 'Email or phone number already exists.');
            }

            const newUser =  {
                id: Date.now().toString(),
                firstName,
                lastName,
                email,
                phone,
                password,
                createdAt: new Date().toISOString(),
            };
            await saveUser(newUser);

            await login({userId: newUser.id, loginTime: new Date().toISOString()});
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
            />
            <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
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
                    style={[styles.input, , { flex: 0.6, marginLeft: 8 }]}
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
                    style={styles.passInput}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                    name={showPassword ? 'eye-sharp' : 'eye-off-sharp'}
                    size={22}
                    color="#af45d9"
                />
                </Pressable>
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                    style={styles.passInput}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                    name={showPassword ? 'eye-sharp' : 'eye-off-sharp'}
                    size={22}
                    color="#af45d9"
                />
                </Pressable>
            </View>
            <View style={styles.buttonContainerContainer}>
                <Pressable onPress={handleResgister} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>
                        Register
                    </Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Login')} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>
                        Already have an account? Login
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}