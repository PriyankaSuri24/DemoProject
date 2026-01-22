import { StyleSheet } from "react-native";
import { LightNavTheme, BlueDarkNavTheme } from "../../theme/appThemes";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export const useStyles = () => {
    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    return StyleSheet.create({
        container: {
            flex: 1,
        },
        dateContainer: {
            padding: 20,
        },
        date: {
            fontWeight: '600',
            marginBottom: 30,
            fontSize: 25,
            color: '#fff'
        },
        description: {
            fontSize: 18,
            marginBottom: 10,
            color: "#fff",
        },
        taskData:{
            flex: 1,
            padding: 7,
        },
        title: {
            fontSize: 20,
            marginBottom: 10,
            color: "#fff", 
        },
        addContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        buttonContainer: {
            flexDirection: 'row',
            gap: 10,
        },
        filterButtonContainer: {
            width: 52,
            height: 52,
            borderRadius: 16,
            backgroundColor: colors.card,
            justifyContent: "center",
            alignItems: "center",
        },
        filterButtonText: {
            color: "#fff",
            fontSize: 30,
            fontWeight: "bold",
        },
        addButtonContainer: {
            width: 52,
            height: 52,
            borderRadius: 16,
            backgroundColor: colors.card,
            justifyContent: "center",
            alignItems: "center",
        },
        addButtonText: {
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
        },
        taskDataRow:{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        checkboxContainer: {
            color: "#fff",
            marginRight: 10,
        },
        checkbox: {
            color: "#fff",
            fontSize: 30,
            verticalAlign: 'middle',
        },
        editButtonContainer:{
            marginLeft: 10,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 10,
        },
        editButtonText: {
            color: "#fff",
            fontWeight: "bold",
        },
        dataTopContainer: {
            flex: 1, 
            flexDirection: 'row',
            borderBottomWidth: 2,
            marginBottom: 8,
            borderBottomColor: "#fff",
            backgroundColor: colors.primary,
            padding: 7,
            borderRadius: 10,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        sectionHeader: {
            fontSize: 18,
            color: "#fff",
            marginBottom: 8,
        }, 
        divider:{
            height: 1,
            backgroundColor: "#fff",
            opacity: 0.4,
            marginBottom: 8,
        },
        taskDataRowView: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
        },
        modalContainer: {
            width: "90%",
            maxHeight: "80%",
            backgroundColor: colors.primary,
            borderRadius: 12,
            overflow: "hidden",
            padding: 10,
        },
        modalTitle: {
            fontSize: 22,
            fontWeight: "600",
            color: "#fff",
        },
        modalButtonRow: {
            flexDirection: "row",
            justifyContent: "flex-end",
        },
        modalDivider: {
            height: 1,
            backgroundColor: "#ccc",
            marginVertical: 10,
        },
        modalDescription: {
            fontSize: 18,
            marginTop: 10,
            color: "#fff",
        },
        modalCloseButton: {
            padding: 12,
            backgroundColor: colors.background,
            alignItems: "center",
        }, 
        statusTitle: {
            color: "#fff",
            fontSize: 18,
            marginBottom:5,
        },
        status: {
            color: "#fff",
            fontSize: 11,
        }
    });
};
