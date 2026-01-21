import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LightNavTheme, BlueDarkNavTheme } from "../theme/appThemes";
import TaskStack from "./TaskStack";
import ExpenseStack from "./ExpenseStack";
import HabitStack from "./HabitStack";
import NotesStack from "./NotesStack";

const Tab = createBottomTabNavigator();

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
                component={TaskStack}
                options={{ title: "Task Manager" }}
            />
            <Tab.Screen
                name="ExpenseTab"
                component={ExpenseStack}
                options={{ title: "Expense Tracker" }}
            />
            <Tab.Screen
                name="NotesTab"
                component={NotesStack}
                options={{ title: "Notes" }}
            />
            <Tab.Screen
                name="HabitTab"
                component={HabitStack}
                options={{ title: "Habit Tracker" }}
            />
        </Tab.Navigator>
    );
}
