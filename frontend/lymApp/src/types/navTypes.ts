import { NavigatorScreenParams } from "@react-navigation/native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type StackParamList = {
    Login:undefined,
    Main: TabParamList,
}

export type TabParamList = {
    Home: NavigatorScreenParams<HomeStackParamList>,
    Explore:undefined,
    Profile:NavigatorScreenParams<ProfileStackParamList>,
}

export type HomeStackParamList = {
    HomeMain: any;
    Lock: any;
    MockPaymentScreen: any;
}

export type LockScreenNavProp = CompositeNavigationProp<StackNavigationProp<HomeStackParamList, 'Lock'>,BottomTabNavigationProp<TabParamList>> ;

export type props = BottomTabScreenProps<TabParamList, "Explore" >;

export type ProfileStackParamList = {
    ProfileMain:undefined,
    EditProfile:undefined,
    TnC:undefined,
    Logout:undefined,
}
export type ProfileMainScreenNavProp = StackNavigationProp<ProfileStackParamList, 'ProfileMain'>;