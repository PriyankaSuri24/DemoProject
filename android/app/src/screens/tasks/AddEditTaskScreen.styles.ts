import { StyleSheet } from "react-native";
import { LightNavTheme, BlueDarkNavTheme } from "../../theme/appThemes";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export const useStyles = () => {
    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    return StyleSheet.create({
        container: {
            padding: 16 
        },
        descriptionInput: {
            borderWidth: 1,
            marginBottom: 12,
            padding: 8,
            minHeight: 80,
        },
        titleHeading: {
            color: "#fff",
            fontSize: 20,
            padding: 5,
        },
        titleInput: {
            borderBottomWidth: 1,
            borderBottomColor: "#fff",
            marginBottom: 12,
            padding: 8,
            color: "#fff",
            fontSize: 18,
        },
        priority: {
            padding: 6,
            color: "#fff",
            fontSize: 15,
        },
        saveButtonContainer: {
            marginTop: 20,
            backgroundColor: colors.card,
            padding: 12,
            alignItems: "center",
            borderRadius: 15,
        },
        saveButtonText:{
            color: "#fff",
            fontSize: 19, 
        }
    });
};
