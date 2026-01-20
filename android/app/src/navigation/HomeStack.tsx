/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../app/Home";
import Greeting from "../app/Greeting";
import { HomeHeaderRight } from "../app/HomeHeaderRight";
import AppSettings from "../app/AppSettings";

const stack = createNativeStackNavigator();

export default function HomeStack() {
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
                options={{
                    headerTitle: () => <Greeting/>,
                    headerRight: () => <HomeHeaderRight/>
                }}
            />
            <stack.Screen 
                name="AppSettings" 
                component={AppSettings} 
            />
        </stack.Navigator>
    );
}