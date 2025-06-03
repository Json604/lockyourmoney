import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "./context/useTheme"
import AppNavigator from "./navigation/AppNavigator"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function App(){
    return(
        <GestureHandlerRootView>
            <SafeAreaProvider>
                <ThemeProvider>
                    <BottomSheetModalProvider>
                        <AppNavigator/>
                    </BottomSheetModalProvider>    
                </ThemeProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    ) 
}