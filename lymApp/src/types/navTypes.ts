import { NavigatorScreenParams } from "@react-navigation/native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type TabParamList = {
    Home: NavigatorScreenParams<HomeStackParamList>,
    Explore:undefined,
    Profile:undefined,
}

export type HomeStackParamList = {
    HomeMain: any;
    Lock: any;
}

export type LockScreenNavProp = CompositeNavigationProp<StackNavigationProp<HomeStackParamList, 'Lock'>,BottomTabNavigationProp<TabParamList>> ;

export type props = BottomTabScreenProps<TabParamList, "Explore" >;
