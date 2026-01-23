import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { BlueDarkNavTheme, LightNavTheme } from "../theme/appThemes";
import { NotesFilter } from "../types/notesFilter";
import NotesListScreen from "../notes/NotesListScreen";

const Stack = createNativeStackNavigator();

export default function NotesStack(){
    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    const defaultNotesFilter: NotesFilter = {
        dateRange: {
            from: null,
            to: null,
        }
    }

    const [notesFilter, setNotesFilter] = useState<NotesFilter>(defaultNotesFilter);

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
                name="NotesList"
                options={{ 
                    headerShown: false,
                }}
            >
                {(props: any) => (
                    <NotesListScreen
                        {...props}
                        notesFilter={notesFilter}
                        setNotesFilter={setNotesFilter}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}