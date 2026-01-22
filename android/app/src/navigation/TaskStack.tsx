import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskListScreen from "../screens/tasks/TaskListScreen";
import AddEditTaskScreen from "../screens/tasks/AddEditTaskScreen";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { BlueDarkNavTheme, LightNavTheme } from "../theme/appThemes";
import { TaskFilter } from "../types/taskFilter";

const Stack = createNativeStackNavigator();

export default function TaskStack(){
    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    const defaultTaskFilter: TaskFilter = {
        status: "ALL",
        priority: [],
        dateRange: {
            from: null,
            to: null
        }
    };

    const [taskFilter, setTaskFilter] = useState<TaskFilter>(defaultTaskFilter);

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
                options={{ 
                    headerShown: false,
                }}
            >
                {(props:any) => (
                    <TaskListScreen
                    {...props}
                    taskFilter={taskFilter}
                    setTaskFilter={setTaskFilter}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen
                name="AddEditTask"
                component={AddEditTaskScreen}
                options={{title: "Add Task"}}
            />
        </Stack.Navigator>
    );
}