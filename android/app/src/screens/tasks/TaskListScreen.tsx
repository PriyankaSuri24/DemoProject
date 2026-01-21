import { useEffect, useState } from "react";
import { Task } from "../../types/task";
import { getTasks, toggleTaskStatus } from "../../storage/taskStorage";
import { FlatList, Pressable, Text, View } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useStyles } from "./TaskListScreen.styles";
import { formatDate } from "../../utils/dateFormatter";
import { confirmDeleteTask } from "../../storage/deleteTask";

type GroupedTasks = {
    [date: string]: Task[];
};

export default function TaskListScreen() {
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();
    const styles = useStyles();

    const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({});

    useEffect(() => {
        loadTasks();
    }, [isFocused]);

    const loadTasks = async () => {
        const tasks = await getTasks();

        tasks.sort((a, b) => {
            if (a.isCompleted === b.isCompleted) return 0;
            return a.isCompleted ? 1 : -1;
        });

        const grouped: GroupedTasks = {};
        tasks.forEach(task => {
            if (!grouped[task.date]) {
                grouped[task.date] = [];
            }
            grouped[task.date].push(task);
        });

        setGroupedTasks(grouped);
    };

    const handleToggle = async (task: Task) => {
        await toggleTaskStatus(task.id);
        loadTasks();
    };

    const renderTaskRow = (task: Task, checked: boolean) => (
        <View key={task.id} style={styles.taskDataRow}>
            <Pressable
                onPress={() => handleToggle(task)}
                style={styles.checkboxContainer}
            >
                <Text style={styles.checkbox}>{checked ? "✔" : "☐"}</Text>
            </Pressable>

            <View style={styles.dataTopContainer}>
                <View style={styles.taskData}>
                    {task.title ? (
                        <Text style={styles.title} numberOfLines={1}>
                            {task.title}:
                        </Text>
                    ) : null}

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
                        onPress={() =>
                            navigation.navigate("AddEditTask", {
                                taskId: task.id,
                            })
                        }
                    >
                        <Text style={styles.editButtonText}>Edit</Text>
                    </Pressable>
                )}

                <Pressable 
                    onPress={() => confirmDeleteTask(task.id, loadTasks)}
                    style={styles.editButtonContainer}
                >
                    <Text style={styles.editButtonText}>Delete</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={Object.keys(groupedTasks)}
                keyExtractor={(date) => date}
                renderItem={({ item: date }) => {
                    const tasksForDate = groupedTasks[date];

                    const pending = tasksForDate.filter(t => !t.isCompleted);
                    const completed = tasksForDate.filter(t => t.isCompleted);

                    const high = pending.filter(t => t.priority === "HIGH");
                    const medium = pending.filter(t => t.priority === "MEDIUM");
                    const low = pending.filter(t => t.priority === "LOW");

                    return (
                        <View style={styles.dateContainer}>
                            <View style={styles.addContainer}>
                                <Text style={styles.date}>
                                    {formatDate(date)}
                                </Text>

                                <Pressable
                                    onPress={() => navigation.navigate("AddEditTask")}
                                    style={styles.addButtonContainer}
                                >
                                    <Text style={styles.addButtonText}>+</Text>
                                </Pressable>
                            </View>
                            {high.length > 0 && (
                                <>
                                    <Text style={styles.sectionHeader}>High PriorityTask</Text>
                                    <View style={styles.divider} />
                                    {high.map(task => renderTaskRow(task, false))}
                                </>
                            )}
                            {medium.length > 0 && (
                                <>
                                    <Text style={styles.sectionHeader}>Medium PriorityTask</Text>
                                    <View style={styles.divider} />
                                    {medium.map(task => renderTaskRow(task, false))}
                                </>
                            )}
                            {low.length > 0 && (
                                <>
                                    <Text style={styles.sectionHeader}>Low PriorityTask</Text>
                                    <View style={styles.divider} />
                                    {low.map(task => renderTaskRow(task, false))}
                                </>
                            )}
                            {completed.length > 0 && (
                                <>
                                    <Text style={styles.sectionHeader}>Completed</Text>
                                    <View style={styles.divider} />
                                    {completed.map(task =>
                                        renderTaskRow(task, true)
                                    )}
                                </>
                            )}
                        </View>
                    );
                }}
            />
        </View>
    );
}
