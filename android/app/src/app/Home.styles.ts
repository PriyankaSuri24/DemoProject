import { StyleSheet } from "react-native";

export const styles = StyleSheet.create ({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor: '#dbaaef',
        padding: 20,
        gap: 16,
    }, 
    button: {
        width: "80%",
        backgroundColor: "#af45d9",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4, 
    },
    buttonText : {
        fontSize : 18,
        fontWeight : '600',
        color: '#fff',
    },
})