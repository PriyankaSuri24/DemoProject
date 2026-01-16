import {  Alert, Text, ScrollView, TextInput, Pressable, View } from 'react-native';
import { AuthContext } from '../context/authContext';
import React, { useContext, useState } from 'react';
import { getUsers, saveUser } from '../storage/userStorage';
import { validateEmail } from '../utils/validation';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './Signup.styles';
import { validatePhoneNumber } from '../utils/phoneAPI';

export default function Signup (){
        const { login } = useContext(AuthContext);
        const navigation = useNavigation<any>();

        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [phone, setPhone] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [showPassword, setShowPassword] = useState(false);

        const handleResgister = async () => {
            if (!firstName){
                return Alert.alert('Error', 'First name required.');
            }
            if (!password || !confirmPassword){
                return Alert.alert('Error', 'Both password and confirm password required.');
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

            let isValidPhone = true;
            if(phone?.length){
                isValidPhone = await validatePhoneNumber(phone);
                if (!isValidPhone) {
                    return Alert.alert('Error', 'Phone number is invalid according to API.');
                }
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
            <TextInput
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
            />
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
                    name={showPassword ? 'eye' : 'eye-slash'}
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
                    name={showPassword ? 'eye' : 'eye-slash'}
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