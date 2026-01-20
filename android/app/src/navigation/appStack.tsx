import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabsNavigator from "./BottomTabs";

const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name = "MainTabs"
                component={BottomTabsNavigator}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    );
} 