import React, { useCallback, useContext, useEffect, useState } from "react";
import { Task } from "../../types/task";
import { getTasks, toggleTaskStatus } from "../../storage/taskStorage";
import { FlatList, Modal, Pressable, Text, View, ScrollView } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useStyles } from "./TaskListScreen.styles";
import { formatDate } from "../../utils/dateFormatter";
import { confirmDeleteTask } from "../../storage/deleteTask";
import { TaskFilter } from "../../types/taskFilter";
import { ThemeContext } from "../../context/ThemeContext";
import { BlueDarkNavTheme, LightNavTheme } from "../../theme/appThemes";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type GroupedTasks = {
    [date: string]: Task[];
};

type Props = {
    taskFilter: TaskFilter,
    setTaskFilter: React.Dispatch<React.SetStateAction<TaskFilter>>
}

export default function TaskListScreen({ taskFilter, setTaskFilter }: Props) {
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();
    const styles = useStyles();

    const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({});
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    const getTodayRange = () => {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        return { from: start.getTime(), to: end.getTime() };
    };

    useEffect(() => {
        if (!taskFilter.dateRange.from && !taskFilter.dateRange.to) {
            setTaskFilter(prev => ({ ...prev, dateRange: getTodayRange() }));
        }
    }, [setTaskFilter, taskFilter.dateRange.from, taskFilter.dateRange.to]);

    const loadTasks = useCallback(async () => {
        let tasks = await getTasks();
        if (taskFilter.status === "COMPLETE") tasks = tasks.filter(t => t.isCompleted);
        else if (taskFilter.status === "PENDING") tasks = tasks.filter(t => !t.isCompleted);

        if (taskFilter.priority.length > 0) {
            tasks = tasks.filter(t => taskFilter.priority.includes(t.priority));
        }

        tasks = tasks.filter(t => {
            const taskTime = new Date(t.date).getTime();
            if (taskFilter.dateRange.from && taskTime < taskFilter.dateRange.from) return false;
            if (taskFilter.dateRange.to && taskTime > taskFilter.dateRange.to) return false;
            return true;
        });
        tasks.sort((a, b) => (a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1));

        const grouped: GroupedTasks = {};
        tasks.forEach(task => {
            if (!grouped[task.date]) grouped[task.date] = [];
            grouped[task.date].push(task);
        });
        setGroupedTasks(grouped);
    }, [taskFilter]);

    useEffect(() => {
        loadTasks();
    }, [isFocused, taskFilter, loadTasks]);

    const handleToggle = async (task: Task) => {
        await toggleTaskStatus(task.id);
        loadTasks();
    };

    const handleTaskPress = (task: Task) => {
        setSelectedTask(task);
        setModalVisible(true);
    };

    const renderTaskRow = (task: Task, checked: boolean) => (
        <Pressable
            key={task.id}
            onPress={() => handleTaskPress(task)}
            style={styles.taskDataRowView}
        >
            <View style={styles.taskDataRow}>
                <Pressable
                    onPress={() => handleToggle(task)}
                    style={styles.checkboxContainer}
                >
                    <Text style={styles.checkbox}>{checked ? "✔" : "☐"}</Text>
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
                            onPress={() =>
                                navigation.navigate("AddEditTask", { taskId: task.id })
                            }
                        >
                            <FontAwesome name="pencil" size={25} color="#fff" />
                        </Pressable>
                    )}

                    <Pressable 
                        onPress={() => confirmDeleteTask(task.id, loadTasks)}
                        style={styles.editButtonContainer}
                    >
                        <FontAwesome name="trash" size={25} color="#fff" />
                    </Pressable>
                </View>
            </View>
        </Pressable>
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
                                <Text style={styles.date}>{formatDate(date)}</Text>
                                <View style={styles.buttonContainer}>
                                    <Pressable
                                        onPress={() => navigation.navigate("AddEditTask")}
                                        style={styles.filterButtonContainer}
                                    >
                                        <FontAwesome name="plus" size={25} color="#fff" /> 
                                    </Pressable>

                                    <Pressable
                                        onPress={() => {
                                            setFilterModalVisible(true);
                                            loadTasks();
                                        }}
                                        style={styles.addButtonContainer}
                                    >
                                        <FontAwesome name="filter" size={25} color="#fff" />
                                    </Pressable>
                                </View>
                            </View>

                            {high.length > 0 && (
                                <>
                                    <Text style={styles.sectionHeader}>High PriorityTask</Text>
                                    <View style={styles.divider} />
                                    {high.map(task => renderTaskRow(task, task.isCompleted))}
                                </>
                            )}
                            {medium.length > 0 && (
                                <>
                                    <Text style={styles.sectionHeader}>Medium PriorityTask</Text>
                                    <View style={styles.divider} />
                                    {medium.map(task => renderTaskRow(task, task.isCompleted))}
                                </>
                            )}
                            {low.length > 0 && (
                                <>
                                    <Text style={styles.sectionHeader}>Low PriorityTask</Text>
                                    <View style={styles.divider} />
                                    {low.map(task => renderTaskRow(task, task.isCompleted))}
                                </>
                            )}
                            {completed.length > 0 && (
                                <>
                                    <Text style={styles.sectionHeader}>Completed</Text>
                                    <View style={styles.divider} />
                                    {completed.map(task => renderTaskRow(task, true))}
                                </>
                            )}
                        </View>
                    );
                }}
            />
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* eslint-disable-next-line react-native/no-inline-styles */}
                        <ScrollView contentContainerStyle={{ padding: 20 }}>
                            <Text style={styles.modalTitle}>
                                {selectedTask?.title || "No Title"}
                            </Text>
                            <View style={styles.modalButtonRow}>
                                <Pressable 
                                    style={styles.editButtonContainer}
                                    onPress={() => {
                                        setModalVisible(false);
                                        navigation.navigate("AddEditTask", { taskId: selectedTask?.id });
                                    }}
                                >
                                    <FontAwesome name="pencil" size={25} color="#fff" />
                                </Pressable>
                                <Pressable 
                                    style={styles.editButtonContainer}
                                    onPress={() => {
                                        selectedTask &&
                                        confirmDeleteTask(selectedTask.id, () => {
                                            setModalVisible(false);
                                            loadTasks();
                                        });
                                    }}
                                >
                                    <FontAwesome name="trash" size={25} color="#fff" />
                                </Pressable>
                            </View>
                            <View style={styles.modalDivider}/>
                            <Text style={styles.modalDescription}>
                                {selectedTask?.description}
                            </Text>
                        </ScrollView>
                        <Pressable
                            style={styles.modalCloseButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.editButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>   
            </Modal>
            <Modal
                visible={filterModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* eslint-disable-next-line react-native/no-inline-styles */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.modalTitle}>Filter Tasks</Text>
                            <Pressable
                                onPress={() => {
                                    setTaskFilter({
                                        status: "ALL",
                                        priority: [],
                                        dateRange: getTodayRange(),
                                    });
                                    loadTasks();
                                }}
                                // eslint-disable-next-line react-native/no-inline-styles
                                style={{ padding: 6, backgroundColor: colors.background, borderRadius: 6 }}
                            >
                                {/* eslint-disable-next-line react-native/no-inline-styles */}
                                <Text style={{ color: "#fff", fontSize:10 }}>Clear</Text>
                            </Pressable>
                        </View>
                        {/* eslint-disable-next-line react-native/no-inline-styles */}
                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.statusTitle}>Status:</Text>
                            {/* eslint-disable-next-line react-native/no-inline-styles */}
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                                {["ALL", "PENDING", "COMPLETED"].map(status => (
                                    <Pressable
                                        key={status}
                                        onPress={() => setTaskFilter(prev => ({ ...prev, status: status as any }))}
                                        // eslint-disable-next-line react-native/no-inline-styles
                                        style={{
                                            padding: 10,
                                            backgroundColor: taskFilter.status === status ? colors.background : colors.notification,
                                            marginVertical: 4,
                                            borderRadius: 6,
                                        }}
                                    >
                                        <Text style={styles.status}>{status}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>
                        {/* eslint-disable-next-line react-native/no-inline-styles */}
                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.statusTitle}>Priority:</Text>
                            {/* eslint-disable-next-line react-native/no-inline-styles */}
                            <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                                {["HIGH", "MEDIUM", "LOW"].map(priority => {
                                    const isSelected = taskFilter.priority.includes(priority as any);
                                    return (
                                        <Pressable
                                            key={priority}
                                            onPress={() => setTaskFilter(prev => ({
                                                ...prev,
                                                priority: isSelected ? prev.priority.filter(p => p !== priority) : [...prev.priority, priority as any],
                                            }))}
                                            // eslint-disable-next-line react-native/no-inline-styles
                                            style={{
                                                padding: 10,
                                                borderRadius: 6,
                                                backgroundColor: isSelected ? colors.background : colors.notification,
                                            }}
                                        >
                                            <Text style={styles.status}>{priority}</Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>
                        {/* eslint-disable-next-line react-native/no-inline-styles */}
                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.statusTitle}>Date Range:</Text>
                            {/* eslint-disable-next-line react-native/no-inline-styles */}
                            <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                                <Pressable
                                    onPress={() => setShowFromPicker(true)}
                                    // eslint-disable-next-line react-native/no-inline-styles
                                    style={{ padding: 10, backgroundColor: colors.notification, borderRadius: 6 }}
                                >
                                    <Text style={styles.status}>
                                        From: {taskFilter.dateRange.from ? new Date(taskFilter.dateRange.from).toDateString() : "Select Date"}
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => setShowToPicker(true)}
                                    // eslint-disable-next-line react-native/no-inline-styles
                                    style={{ padding: 10, backgroundColor: colors.notification, borderRadius: 6 }}
                                >
                                    <Text style={styles.status}>
                                        To: {taskFilter.dateRange.to ? new Date(taskFilter.dateRange.to).toDateString() : "Select Date"}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        <Pressable
                            onPress={() => { setFilterModalVisible(false); loadTasks(); }}
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{ marginTop: 20, padding: 12, backgroundColor: colors.background, borderRadius: 6, alignItems: "center" }}
                        >
                            {/* eslint-disable-next-line react-native/no-inline-styles */}
                            <Text style={{ color: "#fff" }}>Apply</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {showFromPicker && (
                <DateTimePicker
                    value={taskFilter.dateRange.from ? new Date(taskFilter.dateRange.from) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                        setShowFromPicker(false);
                        if (!date) return;
                        const startOfDay = new Date(date);
                        startOfDay.setHours(0,0,0,0);
                        setTaskFilter(prev => ({ ...prev, dateRange: { ...prev.dateRange, from: startOfDay.getTime() } }));
                    }}
                />
            )}

            {showToPicker && (
                <DateTimePicker
                    value={taskFilter.dateRange.to ? new Date(taskFilter.dateRange.to) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                        setShowToPicker(false);
                        if (!date) return;
                        const endOfDay = new Date(date);
                        endOfDay.setHours(23,59,59,999);
                        setTaskFilter(prev => ({ ...prev, dateRange: { ...prev.dateRange, to: endOfDay.getTime() } }));
                    }}
                />
            )}
        </View>
    );
}
