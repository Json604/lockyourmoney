import { createStackNavigator } from "@react-navigation/stack";
import { ProfileStackParamList } from "../types/navTypes";
import ProfileMain from "../screens/Profile/ProfileMain";
import EditProfile from "../screens/Profile/EditProfile";
import TnC from "../screens/Profile/TnC";
import LogoutOptions from "../screens/Profile/LogoutOptions";
import { useContext } from "react";
import { ThemeContext } from "../context/useTheme";

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator(){
    const {primary,text} = useContext(ThemeContext);
    return(
        <Stack.Navigator
        initialRouteName="ProfileMain"
        screenOptions={{
            headerStyle:{
                backgroundColor:primary
            },
            headerTintColor:'black'
        }}
        >
            <Stack.Screen 
            name="ProfileMain"
            component={ProfileMain}
            options={{
                headerShown:false,
            }}
            />
            <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            />
            <Stack.Screen
            name="TnC"
            component={TnC}
            options={{
                title:'Terms & Privacy Policy',
            }}
            />
            <Stack.Screen
            name="Logout"
            component={LogoutOptions}
            options={{
                title:'Logout options',
                headerShown:false,
            }}
            />
        </Stack.Navigator>
    )
}