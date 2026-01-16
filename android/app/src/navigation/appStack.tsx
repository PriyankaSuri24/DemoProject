import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../auth/Home";

const stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <stack.Navigator
            screenOptions = {{ 
                headerStyle: {
                    backgroundColor: '#af45d9',
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                fontWeight: 'bold',
                },
            }}
        >
            <stack.Screen 
                name="Home" 
                component={Home} 
                options={{title: 'Home'}}
            />
        </stack.Navigator>
    );
}