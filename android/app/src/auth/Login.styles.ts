import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        backgroundColor: '#dbaaef',
        gap: 12,
    },
    emailButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#d9a8ed',
        alignItems: 'center',
    },
    emailText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    phoneButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#d9a8ed',
        alignItems: 'center',
    },
    phoneText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    hover: {
        backgroundColor: '#af45d9'
    },
    pressed: {
        opacity: 0.3,
    },
    input: {
        marginHorizontal: 20,
        marginVertical: 8,
        padding: 14,
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#af45d9',
    },
    loginButton: {
        marginTop: 20,
        marginHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: '#af45d9',
        borderRadius: 10,
        alignItems: 'center',
    }
})