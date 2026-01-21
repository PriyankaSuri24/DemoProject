import { StyleSheet } from "react-native";
import { LightNavTheme, BlueDarkNavTheme } from "../theme/appThemes";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export const useStyles = () => {
    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    return StyleSheet.create({
        container: {    
            flex: 1,
            padding: 20,
            backgroundColor: colors.background,
        },
        input : {
            fontSize: 16,
            marginVertical: 8,
            padding: 12,
            backgroundColor: '#fff',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.card,
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
            borderColor: colors.card,
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
            borderColor: colors.card,
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
            backgroundColor: colors.background,
        },
        countryItem: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            borderBottomWidth: 0.5,
            borderColor: colors.card,
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
            borderColor: colors.card,
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
            backgroundColor: colors.card,
            borderRadius: 10,
            alignItems: 'center',
        },
        buttonText: {
            fontSize: 16,
            color: '#fff',
            fontWeight: '600',
        },
    });
};
