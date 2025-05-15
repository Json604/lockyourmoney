import { Children, createContext} from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const theme = {
        primary: "rgb(255, 215, 0)",
        background : "rgb(0, 0, 0)",
        text: "rgb(255, 255, 255)",
        subtext: 'rgb(102, 102, 102)',
        card: "rgb(0, 0, 0)",
        outline: 'rgb(56, 55, 55)',
        placeholderText:'rgb(122, 119, 119)',
    }

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}