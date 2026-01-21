import React, { useContext } from 'react';
import { View, Text, Switch, Pressable } from 'react-native';
import { LightNavTheme, BlueDarkNavTheme } from '../theme/appThemes';
import { ThemeContext } from '../context/ThemeContext';
import { useStyles } from './AppSettings.styles';
import { AuthContext } from '../context/authContext';

export const AppSettings = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const styles = useStyles();
  if (!theme || !setTheme) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? LightNavTheme : BlueDarkNavTheme}]}>
      <Text style={styles.heading}>
        Theme Settings
      </Text>

      {/* Light Toggle */}
      <View style={styles.row}>
        <Text style={styles.label}>
          Purple Theme
        </Text>
        <Switch
          value={theme === 'light'}
          onValueChange={(value) => value && setTheme('light')}
        />
      </View>

      {/* Dark Toggle */}
      <View style={styles.row}>
        <Text style={styles.label}>
          Blue Theme
        </Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={(value) => value && setTheme('dark')}
        />
      </View>

      <Pressable
        style={styles.logoutButton}
        onPress={logout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
};