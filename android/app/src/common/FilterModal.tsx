import { Modal, Pressable, Text, View } from "react-native";
// import { TaskFilter } from "../types/taskFilter"
import React, { useState } from "react"
import DateTimePicker from "@react-native-community/datetimepicker";

type dateRange = {
    from: number | null;
    to: number | null;
}

type FilterModalProps<T> = {
    visible: boolean,
    onClose: () => void,
    onApply: () => void,
    onClear: () => void,
    colors: any,
    styles: any,
    value: T,
    onChange: (value: T) => void,
    enableStatus?: boolean,
    enablePriority?: boolean,
    getTodayRange: ()=>{from:number; to: number},
};

export default function FilterModal<T extends {dateRange: dateRange; status?: any; priority?: any[];}>({
    visible,
    onClose,
    value,
    onChange,
    onApply,
    onClear,
    colors,
    styles,
    enableStatus = true,
    enablePriority = true,
}: FilterModalProps<T>){
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    const { dateRange } = value;

    return(
        <>
            <Modal
                visible={visible}
                animationType="slide"
                transparent
                onRequestClose={onClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* eslint-disable-next-line react-native/no-inline-styles */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.modalTitle}>
                                Filter
                            </Text>
                            <Pressable
                                onPress={onClear}
                                // eslint-disable-next-line react-native/no-inline-styles
                                style={{ padding: 6, backgroundColor: colors.background, borderRadius: 6 }}
                            >
                                {/* eslint-disable-next-line react-native/no-inline-styles */}
                                <Text style={{ color: "#fff", fontSize:10 }}>
                                    Clear
                                </Text>
                            </Pressable> 
                        </View>
                        {enableStatus && value.status && (
                            // eslint-disable-next-line react-native/no-inline-styles
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.statusTitle}>
                                    Status:
                                </Text>
                                {/* eslint-disable-next-line react-native/no-inline-styles */}
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                                    {["ALL", "PENDING", "COMPLETE"].map(status => (
                                        <Pressable
                                            key={status}
                                            onPress={() => onChange({...value, status} as T)}
                                            // eslint-disable-next-line react-native/no-inline-styles
                                            style={{
                                                padding: 10,
                                                backgroundColor: value.status === status ? colors.background : colors.notification,
                                                marginVertical: 4,
                                                borderRadius: 6,
                                            }}
                                        >
                                            <Text style={styles.status}>
                                                {status}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                        )}
                        {enablePriority && value.priority && (
                            // eslint-disable-next-line react-native/no-inline-styles
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.statusTitle}>
                                    Priority:
                                </Text>
                                {/* eslint-disable-next-line react-native/no-inline-styles */}
                                <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                                    {["HIGH", "MEDIUM", "LOW"].map(priority => {
                                        const selected = value.priority!.includes(priority);
                                        return (
                                            <Pressable
                                                key={priority}
                                                onPress={() => onChange({
                                                    ...value,
                                                    priority: selected
                                                    ? value.priority!.filter(p => p !== priority)
                                                    : [...value.priority!, priority],
                                                } as T)}
                                                // eslint-disable-next-line react-native/no-inline-styles
                                                style={{
                                                    padding: 10,
                                                    borderRadius: 6,
                                                    backgroundColor: selected ? colors.background : colors.notification,
                                                }}
                                            >
                                                <Text style={styles.status}>
                                                    {priority}
                                                </Text>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </View>
                        )}
                        {/* eslint-disable-next-line react-native/no-inline-styles */}
                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.statusTitle}>
                                Date Range:
                            </Text>
                            {/* eslint-disable-next-line react-native/no-inline-styles */}
                            <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                                <Pressable
                                    onPress={() => setShowFromPicker(true)}
                                    // eslint-disable-next-line react-native/no-inline-styles
                                    style={{ padding: 10, backgroundColor: colors.notification, borderRadius: 6 }}
                                >
                                    <Text style={styles.status}>
                                        From: {dateRange.from ? new Date(dateRange.from).toDateString() : "Select Date"}
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => setShowToPicker(true)}
                                    // eslint-disable-next-line react-native/no-inline-styles
                                    style={{ padding: 10, backgroundColor: colors.notification, borderRadius: 6 }}
                                >
                                    <Text style={styles.status}>
                                        To: {dateRange.to ? new Date(dateRange.to).toDateString() : "Select Date"}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        <Pressable
                            onPress={onApply}
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{ marginTop: 20, padding: 12, backgroundColor: colors.background, borderRadius: 6, alignItems: "center" }}
                        >
                            {/* eslint-disable-next-line react-native/no-inline-styles */}
                            <Text style={{ color: "#fff" }}>
                                Apply
                            </Text>
                        </Pressable> 
                    </View>
                </View>
            </Modal>
            {showFromPicker && (
                <DateTimePicker
                    value={dateRange.from ? new Date(dateRange.from) : new Date()}
                    mode="date"
                    onChange={(_, date) => {
                        setShowFromPicker(false);
                        if (!date) return;
                        const d = new Date(date);
                        d.setHours(0, 0, 0, 0);
                        onChange({ ...value, dateRange: { ...dateRange, from: d.getTime() } } as T);
                    }}
                /> 
            )} 
            {showToPicker && (
                <DateTimePicker
                    value={dateRange.to ? new Date(dateRange.to) : new Date()}
                    mode="date"
                    onChange={(_, date) => {
                        setShowToPicker(false);
                        if (!date) return;
                        const d = new Date(date);
                        d.setHours(23, 59, 59, 999);
                        onChange({ ...value, dateRange: { ...dateRange, to: d.getTime() } } as T);
                    }}
                />
            )}
        </>
    );
}