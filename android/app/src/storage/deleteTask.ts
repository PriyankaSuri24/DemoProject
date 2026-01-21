import { Alert } from "react-native";
import { deleteTask } from "./taskStorage";

export const confirmDeleteTask = (
    taskId: string,
    onSuccess: () => void
) => {
    Alert.alert(
        "Delete Task",
        "Are you sure you want to delete this task?",
        [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    await deleteTask(taskId);
                    onSuccess();
                },
            },
        ]
    );
};
