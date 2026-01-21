import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";

type Theme = 'light' | 'dark';
type ThemeContextType = {
    theme : Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    setTheme: () => {},
});

type Props = {
    children: ReactNode;
};

export const ThemeProvider = ({children}: Props) => {
    const[theme, setThemeState] = useState<Theme>('light');

    const setTheme = async (newTheme: Theme) => {
        setThemeState(newTheme);
        try{
            await AsyncStorage.setItem('appTheme', newTheme);
        }catch(error){
            console.log('Error saving theme', error);
        }
    };

    useEffect(() => {
        const loadTheme = async () => {
            try{
                const savedTheme = await AsyncStorage.getItem('appTheme');
                if(savedTheme === 'light' || savedTheme === 'dark'){
                    setThemeState(savedTheme);
                }
            }catch(error){
                console.log('Error loading theme', error);
            }
        };
        loadTheme();
    }, []);

    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}