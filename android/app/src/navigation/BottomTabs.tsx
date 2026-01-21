import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import { View, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LightNavTheme, BlueDarkNavTheme } from "../theme/appThemes";

const Tab = createBottomTabNavigator();

function Placeholder({ title }: { title: string }) {
    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <Text style={{ color: colors.text, fontSize: 18 }}>{title}</Text>
        </View>
    );
}

export default function BottomTabs() {
    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: colors.card,
                    borderTopColor: colors.border,
                },
                tabBarActiveTintColor: colors.text,
                tabBarInactiveTintColor: theme === "light" ? "#e0c9f2" : "#bbbbbb",
                tabBarLabelStyle: {
                    fontSize: 10,
                    textAlign: "center",
                },
                tabBarItemStyle: {
                    paddingBottom: 15,
                },
                headerTitleAlign: "center",
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{ headerShown: false, title: "Home" }}
            />
            <Tab.Screen
                name="TaskTab"
                children={() => <Placeholder title="Task Manager" />}
                options={{ title: "Task Manager" }}
            />
            <Tab.Screen
                name="ExpenseTab"
                children={() => <Placeholder title="Expense Tracker" />}
                options={{ title: "Expense Tracker" }}
            />
            <Tab.Screen
                name="NotesTab"
                children={() => <Placeholder title="Notes" />}
                options={{ title: "Notes" }}
            />
            <Tab.Screen
                name="HabitTab"
                children={() => <Placeholder title="Habit Tracker" />}
                options={{ title: "Habit Tracker" }}
            />
        </Tab.Navigator>
    );
}
