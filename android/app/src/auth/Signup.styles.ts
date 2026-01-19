import { StyleSheet } from "react-native";

export const styles = StyleSheet.create ({
    container: {    
        flex: 1,
        padding: 20,
        backgroundColor: '#dbaaef',
    },
    input : {
        fontSize: 16,
        marginVertical: 8,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#af45d9',
        paddingVertical: 12,
    },
    buttonContainerContainer: {
        marginTop: 20,
        gap: 12,
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
    phoneContainer: { 
        flexDirection: 'row', 
    },
    flag: {
        width: 22, 
        height: 16, 
        marginRight: 8 
    },
    list:{
        backgroundColor: '#dbaaef',
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 0.5,
        borderColor: '#af45d9',
    },
    countrySelect:{
        maxHeight: 150
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#af45d9',
        paddingHorizontal: 12,
    },
    passInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
    },
    buttonContainer: {
        marginTop: 12,
        paddingVertical: 14,
        backgroundColor: '#af45d9',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    }
})