import { StyleSheet } from "react-native";
import { LightNavTheme, BlueDarkNavTheme } from "../../theme/appThemes";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export const useStyles = () => {
    const { theme } = useContext(ThemeContext);
    const colors = theme === "light" ? LightNavTheme.colors : BlueDarkNavTheme.colors;

    return StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,
        },
        heading: {
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 24,
          color: "#fff",
        },
        row: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 12,
        },
        label: {
          fontSize: 16,
          color: "#fff",
        },
        logoutButton: {
          marginTop: 480,
          marginLeft: 270,
          width: "30%",
          backgroundColor: colors.border, 
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          elevation: 4
        },
        logoutText: {
          fontSize: 18,
          fontWeight: "600",
          color: colors.text,
        }
    });
};
