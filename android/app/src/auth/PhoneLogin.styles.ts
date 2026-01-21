import { StyleSheet } from "react-native";
import { LightNavTheme, BlueDarkNavTheme } from "../theme/appThemes";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export const useStyles = () => {
    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    return StyleSheet.create({
        view: {
            backgroundColor: colors.background,
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
        list: {
            backgroundColor: colors.background,
        },
        countryItem: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            borderBottomWidth: 0.5,
            borderColor: colors.card,
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
            backgroundColor: colors.background,
            alignItems: 'center',
        },
        phoneText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
        },
        hover: {
            backgroundColor: colors.card
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
            borderColor: colors.card,
        },
        loginButton: {
            marginTop: 20,
            marginHorizontal: 20,
            paddingVertical: 14,
            backgroundColor: colors.card,
            borderRadius: 10,
            alignItems: 'center',
        },
        loginButtonText: {
            color: "#fff",
            fontSize: 18,
        },
    });
};
