/* eslint-disable react/no-unstable-nested-components */
import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { AuthContext } from '../context/authContext';
import { styles } from './Home.styles';
import { useNavigation } from '@react-navigation/native';

export default function Home (){
    const { logout } = useContext(AuthContext);

    const navigation = useNavigation();

    React.useEffect(() => {
        navigation.setOptions({
        headerRight: () => (
            <Pressable onPress={logout}>
                <Text style={styles.logout}>
                    Logout
                </Text>
            </Pressable>
        ),
    });
  }, [logout, navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
        </View>
    );
}