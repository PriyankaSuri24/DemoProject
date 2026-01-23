import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Task } from "../types/task"
import FontAwesome from "react-native-vector-icons/FontAwesome";

type props = {
    visible: boolean,
    task: Task | null,
    styles: any,
    onClose: () => void,
    onEdit: () => void,
    onDelete: () => void,
};

export default function ItemViewModal({
    visible,
    task,
    styles,
    onClose,
    onEdit,
    onDelete
}: props){
    return(
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {/* eslint-disable-next-line react-native/no-inline-styles */}
                    <ScrollView contentContainerStyle={{ padding: 20 }}>
                        <Text style={styles.modalTitle}>
                            {task?.title || "No Title"}
                        </Text>
                        <View style={styles.modalButtonRow}>
                            <Pressable 
                                style={styles.editButtonContainer}
                                onPress={onEdit}
                            >
                                <FontAwesome name="pencil" size={25} color="#fff" />
                            </Pressable>
                            <Pressable 
                                style={styles.editButtonContainer}
                                onPress={onDelete}
                            >
                                <FontAwesome name="trash" size={25} color="#fff" />
                            </Pressable>
                        </View>
                        <View style={styles.modalDivider}/>
                            <Text style={styles.modalDescription}>
                                {task?.description}
                            </Text>
                    </ScrollView>
                    <Pressable
                        style={styles.modalCloseButton}
                        onPress={onClose}
                    >
                        <Text style={styles.editButtonText}>
                            Close
                        </Text>
                    </Pressable>
                </View>
            </View>   
        </Modal>
    );
}