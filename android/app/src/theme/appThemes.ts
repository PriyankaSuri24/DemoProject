import { DefaultTheme, DarkTheme, Theme as NavigationTheme } from '@react-navigation/native';

export const LightNavTheme: NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#dbaaef',
    card: '#af45d9',
    text: '#fff',
    border: '#af45d9',
    primary: '#c26ce4',
  },
};

export const BlueDarkNavTheme: NavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#8e9ef8',
    card: '#0420be',
    text: '#fff',
    border: '#0420be',
    primary: '#542de2',
  },
};
