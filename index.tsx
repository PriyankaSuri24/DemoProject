import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';
import { LightNavTheme, BlueDarkNavTheme } from './android/app/src/theme/appThemes';
import { enableScreens } from 'react-native-screens';
import { name as appName } from './app.json';
import { ThemeProvider, ThemeContext } from './android/app/src/context/ThemeContext';
import React, { useContext } from 'react';

enableScreens();

function MainNavigation() {
  const { theme } = useContext(ThemeContext); 
  return (
    <NavigationContainer theme={theme === 'light' ? LightNavTheme : BlueDarkNavTheme}>
      <App />
    </NavigationContainer>
  );
}

function Main() {
  return (
    <ThemeProvider>
      <MainNavigation />
    </ThemeProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
