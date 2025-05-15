import { ThemeProvider } from "./context/useTheme"
import AppNavigator from "./navigation/AppNavigator"

export default function App(){
    return(
        <ThemeProvider>
            <AppNavigator/>
        </ThemeProvider>
    ) 
}