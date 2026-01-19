import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EmailLogin from "./EmailLogin";
import PhoneLogin from "./PhoneLogin";

const Tab = createMaterialTopTabNavigator();

export default function Login() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
                tabBarIndicatorStyle: { backgroundColor: '#af45d9', height: 3 },
            }}
        >
            <Tab.Screen name="Email" component={EmailLogin} />
            <Tab.Screen name="Phone" component={PhoneLogin} />
        </Tab.Navigator>
    );
}
