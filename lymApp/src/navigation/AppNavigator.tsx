import { DarkTheme, NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from 'react-native-vector-icons/Ionicons'
import ProfileNavigator from "./ProfileNavigator";
import HomeNavigator from "./HomeNavigator";
import Explore from "../screens/Explore/Explore";
import { TabParamList } from "../types/navTypes";

const Tab = createBottomTabNavigator<TabParamList>();

export default function AppNavigator(){
    return(
        <NavigationContainer theme={DarkTheme}>
            <Tab.Navigator
            initialRouteName="Profile"
            screenOptions={{
                tabBarActiveTintColor: 'rgb(255, 255, 255)',
                tabBarInactiveTintColor: 'rgba(187, 176, 176, 0.75)',
                tabBarStyle: {
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 70,
                    paddingBottom: 10,
                    backgroundColor: 'black'
                },
                tabBarIconStyle:{
                    marginBottom: 3,
                },
                tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '600', 
                },
                headerShown:false,
            }}
            >
                <Tab.Screen 
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon:({color,focused} : {color:string, focused: boolean}) => (
                        <MaterialCommunityIcons 
                        name={focused ? "home-variant" : "home-variant-outline"} 
                        color={color}
                         size={27}/>
                    ),
                    
                }}
                />
                <Tab.Screen
                name="Explore"
                component={Explore}
                options={{
                    tabBarIcon:({color,focused}: {color:string, focused: boolean}) => (
                        <Icon
                        name={focused ? "compass" : "compass-outline"} 
                        color={color} 
                        size={27}/>
                    ),
                }}
                />
                <Tab.Screen
                name="Profile"
                component={ProfileNavigator}
                options={{
                    tabBarIcon:({color,focused}: {color:string, focused: boolean}) => (
                        <MaterialCommunityIcons 
                        name={focused ? "account" : "account-outline"} 
                        color={color} 
                        size={27}/>
                    ),
                }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}