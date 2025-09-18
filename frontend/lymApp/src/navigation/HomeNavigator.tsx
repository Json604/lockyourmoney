import Lock from "../screens/Home/Lock";
import Home from "../screens/Home/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParamList } from "../types/navTypes";


const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeNavigator(){
    return(
        <Stack.Navigator
        initialRouteName="HomeMain"
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen
            name="HomeMain"
            component={Home}
            />
            <Stack.Screen
            name="Lock"
            component={Lock}
            />
        </Stack.Navigator>
    )
}