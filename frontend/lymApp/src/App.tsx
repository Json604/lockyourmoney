import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "./context/useTheme"
import AppNavigator from "./navigation/AppNavigator"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { LockProvider } from "./context/lockContext"
// import { GoogleSignin } from "@react-native-google-signin/google-signin"

// GoogleSignin.configure({
//     webClientId: '330861469730-gqhvl43bihn6cng30cch8rlgg6mu0avc.apps.googleusercontent.com',
//     offlineAccess: true,
// })

export default function App(){
    return(
        <LockProvider>
            <GestureHandlerRootView>
                <SafeAreaProvider>
                    <ThemeProvider>
                        <BottomSheetModalProvider>
                            <AppNavigator/>
                        </BottomSheetModalProvider>    
                    </ThemeProvider>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </LockProvider>    
    ) 
}