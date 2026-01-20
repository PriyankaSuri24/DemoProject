import { View, Text, Pressable } from 'react-native';
import { styles } from './Home.styles';
import { useNavigation } from '@react-navigation/native';


export default function Home (){
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => navigation.navigate("TaskTab")}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Task Manager
                </Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate("ExpenseTab")}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Expense Tracker
                </Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate("NotesTab")}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Notes
                </Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate("HabitTab")}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Habit Tracker
                </Text>
            </Pressable>
        </View>
    );
}