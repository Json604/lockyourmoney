import { createContext} from "react";
import { ThemeType } from "../types/themeTypes";
import { ThemeProviderType } from "../types/themeTypes";


const theme = {
    primary: "rgb(255, 215, 0)",
    background : "rgb(0, 0, 0)",
    text: "rgb(255, 255, 255)",
    subtext: '#9E9595',
    card: "rgb(0, 0, 0)",
    outline: 'rgb(56, 55, 55)',
    placeholderText:'rgb(122, 119, 119)',
    scrollCard: '#1E1E1E',
}

export const ThemeContext = createContext<ThemeType>(theme);


export const ThemeProvider = ({children} : ThemeProviderType) => {
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}