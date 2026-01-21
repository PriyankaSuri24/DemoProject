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
