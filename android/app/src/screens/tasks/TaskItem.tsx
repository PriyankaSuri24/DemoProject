import { Pressable, Text, View } from "react-native";
import { Task } from "../../types/task";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from 'react-native-vector-icons/Ionicons';

type props =  {
    task: Task;
    checked: boolean;
    styles: any;
    onPress: () => void;
    onToggle: () => void;
    onEdit: () => void;
    onDelete: () => void; 
};

export default function TaskItem({
    task,
    checked,
    styles,
    onPress,
    onToggle,
    onEdit,
    onDelete
}: props){
    return(
        <Pressable
            key={task.id}
            onPress={onPress}
            style={styles.taskDataRowView}
        >
            <View style={styles.taskDataRow}>
                <Pressable
                    onPress={onToggle}
                    style={styles.checkboxContainer}
                >
                    <Icon
                        name={checked ? 'checkbox' : 'square-outline'}
                        size={22}
                        color="#fff"
                    />
                </Pressable>
                <View style={styles.dataTopContainer}>
                    <View style={styles.taskData}>
                        {task.title && (
                            <Text style={styles.title} numberOfLines={1}>
                                {task.title}:
                            </Text>
                        )}
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.description}
                        >
                            {task.description}
                        </Text>
                    </View>
                    {!checked && (
                        <Pressable
                            style={styles.editButtonContainer}
                            onPress={onEdit}
                        >
                            <FontAwesome name="pencil" size={25} color="#fff" />
                        </Pressable>
                    )}
                    <Pressable 
                        onPress={onDelete}
                        style={styles.editButtonContainer}
                    >
                        <FontAwesome name="trash" size={25} color="#fff" />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
}   