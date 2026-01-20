import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

function Placeholder({title} : {title:string}){
    return(
        <View>
            <Text>
                {title}
            </Text>
        </View>
    );
}

export default function BottomTabs(){
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle:{
                    backgroundColor: "#af45d9",
                },
                tabBarActiveTintColor: "#ffffff",
                tabBarInactiveTintColor: "#e0c9f2",
                tabBarLabelStyle: {
                    fontSize: 12,
                    textAlign: "center",
                },
            }}    
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    headerShown: false,   
                    title: "Home",
                }}
            />
            <Tab.Screen
                name="TaskTab"
                children={() => <Placeholder title="Task Manager"/>}
                options={{title: "Task Manager"}}
            />
            <Tab.Screen
                name="ExpenseTab"
                children={() => <Placeholder title="Expense Tracker"/>}
                options={{title: "Expense Tracker", tabBarLabel: "Expense Tracker",}}
            />
            <Tab.Screen
                name="NotesTab"
                children={() => <Placeholder title="Notes"/>}
                options={{title: "Notes"}}
            />
            <Tab.Screen
                name="HabitTab"
                children={() => <Placeholder title="Habit Tracker"/>}
                options={{title: "Habit Tracker"}}
            />
        </Tab.Navigator>
    );
}