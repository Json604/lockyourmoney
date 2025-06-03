import { ReactNode } from "react";
import { StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";


export type DynCardProps = {
  children: ReactNode,
  style?: StyleProp<ViewStyle>;
}& TouchableOpacityProps;

export type StatCardProps = {
  children: ReactNode,
  style?: StyleProp<ViewStyle>;
}& ViewProps;