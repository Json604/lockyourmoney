import { createContext, ReactNode} from "react";

type ThemeType = {
  primary: string;
  background: string;
  text: string;
  subtext: string;
  card: string;
  outline: string;
  placeholderText: string;
};

const theme = {
    primary: "rgb(255, 215, 0)",
    background : "rgb(0, 0, 0)",
    text: "rgb(255, 255, 255)",
    subtext: 'rgb(102, 102, 102)',
    card: "rgb(0, 0, 0)",
    outline: 'rgb(56, 55, 55)',
    placeholderText:'rgb(122, 119, 119)',
}

export const ThemeContext = createContext<ThemeType>(theme);

type ThemeProvider = {
  children: ReactNode;
};


export const ThemeProvider = ({children} : ThemeProvider) => {
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}