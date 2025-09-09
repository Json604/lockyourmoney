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

export type FloatingPlaceholderType = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholderTextColor?: string;
  inputStyle?: object;
  containerStyle?: object;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'visible-password';
}