/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../app/Home";
import Greeting from "../app/Greeting";
import { HomeHeaderRight } from "../app/HomeHeaderRight";
import { AppSettings } from "../app/AppSettings";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LightNavTheme, BlueDarkNavTheme } from "../theme/appThemes";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.card,
                },
                headerTintColor: colors.text, 
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerTitle: () => <Greeting />,
                    headerRight: () => <HomeHeaderRight />,
                }}
            />
            <Stack.Screen
                name="AppSettings"
                component={AppSettings}
                options={{
                    headerStyle: {
                        backgroundColor: colors.card,
                    },
                    headerTintColor: colors.text,
                }}
            />
        </Stack.Navigator>
    );
}
