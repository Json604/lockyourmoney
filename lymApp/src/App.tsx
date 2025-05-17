import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "./context/useTheme"
import AppNavigator from "./navigation/AppNavigator"

export default function App(){
    return(
        <SafeAreaProvider>
            <ThemeProvider>
                <AppNavigator/>
            </ThemeProvider>
        </SafeAreaProvider>
    ) 
}