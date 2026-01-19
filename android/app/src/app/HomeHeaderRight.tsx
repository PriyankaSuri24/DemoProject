import { useNavigation } from "@react-navigation/native"
import { Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
type rootStack = {
    Home: undefined,
    AppSettings: undefined,
}

export const HomeHeaderRight = () => {
    const navigation = useNavigation<NativeStackNavigationProp<rootStack>>();

    return(
        <Pressable
            onPress={() => navigation.navigate('AppSettings')}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ marginRight: 12 }}
        >
            <Icon name="settings-sharp" size={22} color="#dbaaef"/>
        </Pressable>
    );
}