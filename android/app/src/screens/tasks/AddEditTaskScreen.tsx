import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect, useLayoutEffect } from "react";
import { TaskPriority } from "../../types/task";
import { createTask } from "../../storage/createTask";
import { addTask, getTasks, updateTask } from "../../storage/taskStorage";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useStyles } from "./AddEditTaskScreen.styles";

export default function AddEditTaskScreen(){
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const styles = useStyles();

    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<TaskPriority>("MEDIUM");

    const taskId = route.params?.taskId;
    const isEditMode = Boolean(taskId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditMode ? "Edit Task" : "Add Task",
        });
    }, [navigation, isEditMode]);

    useEffect(() => {
        if (!isEditMode) return;

        const loadTask = async () => {
            const tasks = await getTasks();
            const task = tasks.find(t => t.id === taskId);
            if (!task) return;

            setTitle(task.title ?? "");
            setDescription(task.description);
            setPriority(task.priority);
        };

        loadTask();
    }, [taskId, isEditMode]);

    const onSave = async () => {
        if (!description.trim()) return;

        if (isEditMode) {
            const tasks = await getTasks();
            const existingTask = tasks.find(t => t.id === taskId);
            if (!existingTask) return;
            await updateTask({
                ...existingTask,
                title,
                description,
                priority,
            });
        } else {
            const task = createTask(description, priority, title);
            await addTask(task);
        }

        navigation.goBack();
    };

    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titleHeading}>Title (optional):</Text>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.titleInput}
                />

                <Text style={styles.titleHeading}>Description:</Text>
                <TextInput
                    multiline
                    value={description}
                    onChangeText={setDescription}
                    style={styles.titleInput}
                />

                <Text style={styles.titleHeading}>Set Priority:</Text>
                {(["HIGH", "MEDIUM", "LOW"] as TaskPriority[]).map(p => (
                    <Pressable key={p} onPress={() => setPriority(p)}>
                        <Text style={styles.priority}>
                            {priority === p ? "●" : "○"} {p}
                        </Text>
                    </Pressable>
                ))}

                <Pressable
                    onPress={onSave}
                    style={styles.saveButtonContainer}
                >
                    <Text style={styles.saveButtonText}>{isEditMode ? "Update Task" : "Save Task"}</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}