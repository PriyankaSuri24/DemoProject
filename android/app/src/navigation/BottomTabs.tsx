import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LightNavTheme, BlueDarkNavTheme } from "../theme/appThemes";
import TaskStack from "./TaskStack";
import ExpenseStack from "./ExpenseStack";
import HabitStack from "./HabitStack";
import NotesStack from "./NotesStack";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    return (
        <Tab.Navigator
            screenOptions={ ({route}) => ( {
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
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ color, size }) => {
                    let iconName: string = "";

                    switch (route.name) {
                        case "HomeTab":
                            iconName = "home"; 
                            break;
                        case "TaskTab":
                            iconName = "tasks"; 
                            break;
                        case "ExpenseTab":
                            iconName = "money";
                            break;
                        case "NotesTab":
                            iconName = "file-text"; 
                            break;
                        case "HabitTab":
                            iconName = "check"; 
                            break;
                    }

                    return <FontAwesome name={iconName} size={size} color={color} />;
                },
            })}
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
