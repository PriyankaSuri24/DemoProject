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
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background, 
            padding: 20,
            gap: 16,
        },
        button: {
            width: "80%",
            backgroundColor: colors.border, 
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            elevation: 4,
        },
        buttonText: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.text,
        },
    });
};
