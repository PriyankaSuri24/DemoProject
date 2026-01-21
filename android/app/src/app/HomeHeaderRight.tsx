import { useNavigation } from "@react-navigation/native"
import { Pressable} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
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
            <FontAwesome
                name = {'gear'}
                size ={25}
            />
        </Pressable>
    );
}