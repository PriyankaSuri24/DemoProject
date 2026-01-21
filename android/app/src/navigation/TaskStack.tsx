import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskListScreen from "../screens/tasks/TaskListScreen";
import AddEditTaskScreen from "../screens/tasks/AddEditTaskScreen";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { BlueDarkNavTheme, LightNavTheme } from "../theme/appThemes";

const Stack = createNativeStackNavigator();

export default function TaskStack(){
    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTintColor: colors.text, 
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen
                name="TaskList"
                component={TaskListScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddEditTask"
                component={AddEditTaskScreen}
                options={{title: "Add Task"}}
            />
        </Stack.Navigator>
    );
}