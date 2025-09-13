import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "./context/useTheme"
import AppNavigator from "./navigation/AppNavigator"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { LockProvider } from "./context/lockContext"
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '900359259255-d04kge5lrou5ogjf9bqm3s2m5j3bs1qe.apps.googleusercontent.com',
  offlineAccess:true,
});

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