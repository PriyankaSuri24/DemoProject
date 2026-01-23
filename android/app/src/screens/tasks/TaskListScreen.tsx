import React, { useCallback, useContext, useEffect, useState } from "react";
import { Task } from "../../types/task";
import { getTasks, toggleTaskStatus } from "../../storage/taskStorage";
import { FlatList, Text, View } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useStyles } from "./TaskListScreen.styles";
import { formatDate } from "../../utils/dateFormatter";
import { confirmDeleteTask } from "../../storage/deleteTask";
import { TaskFilter } from "../../types/taskFilter";
import { ThemeContext } from "../../context/ThemeContext";
import { BlueDarkNavTheme, LightNavTheme } from "../../theme/appThemes";
import FilterModal from "../../common/FilterModal";
import ItemViewModal from "../../common/ItemViewModal";
import TaskItem from "./TaskItem";
import DateHeader from "../../common/DateHeader";
import { getTodayRange, toDateKey, getDateRangeLabel } from "../../utils/dateUtils";


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

    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    const getHeaderDateLabel = () => 
        getDateRangeLabel(
            taskFilter.dateRange.from ?? undefined,
            taskFilter.dateRange.to ?? undefined
        );

    useEffect(() => {
        if (!taskFilter.dateRange.from && !taskFilter.dateRange.to) {
            setTaskFilter(prev => ({ ...prev, dateRange: getTodayRange() }));
        }
    }, [setTaskFilter, taskFilter.dateRange.from, taskFilter.dateRange.to]);

    const loadTasks = useCallback(async () => {
        let tasks = await getTasks();

        if (taskFilter.status === "COMPLETE")
        {
            tasks = tasks.filter(t => t.isCompleted);
        }else if (taskFilter.status === "PENDING") {
            tasks = tasks.filter(t => !t.isCompleted);
        }

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

        const grouped: Record<string, Task[]> = {};
        tasks.forEach(t => {
            const taskTime = t.date ? new Date(t.date).getTime() : Date.now();
            const dateKey = toDateKey(taskTime);
            if (!grouped[dateKey]) grouped[dateKey] = [];
            grouped[dateKey].push(t);
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
    
    return (
        <View style={styles.container}>
            <DateHeader
                dateLabel={formatDate(getHeaderDateLabel())}
                styles={styles}
                onAddPress={() => navigation.navigate("AddEditTask")}
                onFilterPress={() => {
                    setFilterModalVisible(true);
                    loadTasks();
                }}
            />
            <FlatList
                data={Object.keys(groupedTasks)}
                keyExtractor={(date) => date}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                    No tasks......
                    </Text>
                }
                renderItem={({ item: date }) => {
                    const tasksForDate = groupedTasks[date];
                    const pending = tasksForDate.filter(t => !t.isCompleted);
                    const completed = tasksForDate.filter(t => t.isCompleted);
                    const high = pending.filter(t => t.priority === "HIGH");
                    const medium = pending.filter(t => t.priority === "MEDIUM");
                    const low = pending.filter(t => t.priority === "LOW");

                    return (
                        <View style={styles.dateContainer}>
                            {high.length > 0 && (
                                <>
                                    <Text style={styles.sectionHeader}>High PriorityTask</Text>
                                    <View style={styles.divider} />
                                    {high.map(task => (
                                        <TaskItem
                                            key={task.id}
                                            task = {task}
                                            checked = {task.isCompleted}
                                            styles={styles}
                                            onPress={() => handleTaskPress(task)}
                                            onToggle={() => handleToggle(task)}
                                            onEdit={() => {
                                                navigation.navigate("AddEditTask", {taskId: task.id})
                                            }}
                                            onDelete={() => confirmDeleteTask(task.id, loadTasks)}
                                        />    
                                    ))}
                                </>
                            )}
                            {medium.length > 0 && (
                                <>
                                    <Text style={styles.sectionHeader}>Medium PriorityTask</Text>
                                    <View style={styles.divider} />
                                    {medium.map(task => (
                                        <TaskItem
                                            key={task.id}
                                            task = {task}
                                            checked = {task.isCompleted}
                                            styles={styles}
                                            onPress={() => handleTaskPress(task)}
                                            onToggle={() => handleToggle(task)}
                                            onEdit={() => {
                                                navigation.navigate("AddEditTask", {taskId: task.id})
                                            }}
                                            onDelete={() => confirmDeleteTask(task.id, loadTasks)}
                                        />   
                                    ))}
                                </>
                            )}
                            {low.length > 0 && (
                                <>
                                    <Text style={styles.sectionHeader}>Low PriorityTask</Text>
                                    <View style={styles.divider} />
                                    {low.map(task => (
                                        <TaskItem
                                            key={task.id}
                                            task = {task}
                                            checked = {task.isCompleted}
                                            styles={styles}
                                            onPress={() => handleTaskPress(task)}
                                            onToggle={() => handleToggle(task)}
                                            onEdit={() => {
                                                navigation.navigate("AddEditTask", {taskId: task.id})
                                            }}
                                            onDelete={() => confirmDeleteTask(task.id, loadTasks)}
                                        />   
                                    ))}
                                </>
                            )}
                            {completed.length > 0 && (
                                <>
                                    <Text style={styles.sectionHeader}>Completed</Text>
                                    <View style={styles.divider} />
                                    {completed.map(task => (
                                        <TaskItem
                                            key={task.id}
                                            task = {task}
                                            checked = {task.isCompleted}
                                            styles={styles}
                                            onPress={() => handleTaskPress(task)}
                                            onToggle={() => handleToggle(task)}
                                            onEdit={() => {
                                                navigation.navigate("AddEditTask", {taskId: task.id})
                                            }}
                                            onDelete={() => confirmDeleteTask(task.id, loadTasks)}
                                        />   
                                    ))}
                                </>
                            )}
                        </View>
                    );
                }}
            />
            <ItemViewModal
                visible = {modalVisible}
                task={selectedTask}
                styles={styles}
                onClose={() => setModalVisible(false)}
                onEdit={() =>{
                    setModalVisible(false);
                    navigation.navigate("AddEditTask", {taskId: selectedTask?.id})
                }}
                onDelete={()=> {
                    selectedTask &&
                        confirmDeleteTask(selectedTask.id, () => {
                            setModalVisible(false);
                            loadTasks();
                        })  
                }}
            />
            <FilterModal
                visible = {filterModalVisible}
                onClose={ () => setFilterModalVisible(false)}
                value={taskFilter}
                onChange={setTaskFilter}
                colors={colors}
                styles={styles}
                getTodayRange={getTodayRange}
                onClear={() => {
                    setTaskFilter({
                        status: "ALL",
                        priority: [],
                        dateRange: getTodayRange(),
                    });
                    loadTasks();
                }}
                onApply={() => {
                    setFilterModalVisible(false);
                    loadTasks();
                }}
                enableStatus
                enablePriority
            />
        </View>
    )
}
