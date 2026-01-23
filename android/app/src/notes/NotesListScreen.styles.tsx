import { StyleSheet } from "react-native";
import { LightNavTheme, BlueDarkNavTheme } from "../../src/theme/appThemes";
import { ThemeContext } from "../../src/context/ThemeContext";
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
        addContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "center",
        },
        date: {
            flex: 1,
            fontWeight: '600',
            marginBottom: 30,
            fontSize: 25,
            color: '#fff'
        },
        buttonContainer: {
            flexDirection: 'row',
            gap: 10,
            flexShrink: 0,
        },
        filterButtonContainer: {
            width: 52,
            height: 52,
            borderRadius: 16,
            backgroundColor: colors.card,
            justifyContent: "center",
            alignItems: "center",
        },
        addButtonContainer: {
            width: 52,
            height: 52,
            borderRadius: 16,
            backgroundColor: colors.card,
            justifyContent: "center",
            alignItems: "center",
        }
    });
};
