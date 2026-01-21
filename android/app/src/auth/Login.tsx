import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EmailLogin from "./EmailLogin";
import PhoneLogin from "./PhoneLogin";
import { ThemeContext } from "../context/ThemeContext";
import { BlueDarkNavTheme, LightNavTheme } from "../theme/appThemes";

const Tab = createMaterialTopTabNavigator();

export default function Login() {
    const { theme } = useContext(ThemeContext);
        const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
                tabBarIndicatorStyle: { backgroundColor: colors.background, height: 3 },
            }}
        >
            <Tab.Screen name="Email" component={EmailLogin} />
            <Tab.Screen name="Phone" component={PhoneLogin} />
        </Tab.Navigator>
    );
}
