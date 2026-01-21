import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { BlueDarkNavTheme, LightNavTheme } from "../theme/appThemes";

const stack = createNativeStackNavigator();

export default function AuthStack() {
    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    return (
        <stack.Navigator 
            screenOptions = {{ 
                headerStyle: {
                    backgroundColor: colors.card,
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