import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    view: {
        backgroundColor: '#dbaaef',
    },
    container: {
        justifyContent: 'center',
        marginVertical: 20,
        gap: 12,
    },
    phoneContainer: {
        flexDirection: 'row', 
        marginLeft: 20,
        marginRight: 20
    },
    selector: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#af45d9',
        borderRadius: 8,
        backgroundColor: '#fff',
        flex: 0.4
    },
    phoneInput: {
        flex: 0.4,
        paddingHorizontal: 12,
        paddingVertical: 8, 
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#af45d9',
        fontSize: 16,
    },
    list: {
        backgroundColor: '#dbaaef',
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 0.5,
        borderColor: '#af45d9',
    },
    flag: {
        width: 22, 
        height: 16, 
        marginRight: 8 
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