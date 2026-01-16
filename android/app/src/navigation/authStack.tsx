import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../auth/Signup";
import Login from "../auth/Login";

const stack = createNativeStackNavigator();

export default function AuthStack() {
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
                name="Signup" 
                component={Signup} 
                options={{title: 'SignUp'}}
            />
            <stack.Screen 
                name="Login" 
                component={Login}  
                options={{
                    title: 'Login', 
                    headerBackTitle: 'Back',
                    headerBackTitleStyle: { fontSize: 30 }
                }}
            />
        </stack.Navigator>
    );
}