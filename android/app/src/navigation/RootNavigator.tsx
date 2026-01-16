import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { View, ActivityIndicator } from "react-native";
import AuthStack from "./authStack";
import AppStack from "./appStack";
import { styles } from './RootNavigator.styles';

export default function RootNavigator() {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return isAuthenticated ? <AppStack /> : <AuthStack />;
}