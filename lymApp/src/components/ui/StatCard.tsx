import { useContext, ReactNode } from "react";
import {StyleSheet, View ,ViewProps, ViewStyle, StyleProp} from "react-native";
import { ThemeContext } from "../../context/useTheme";

type StatCardProps = {
  children: ReactNode,
  style?: StyleProp<ViewStyle>;
}& ViewProps;

export default function StatCard({style,children,...rest} : StatCardProps){
    const{card} = useContext(ThemeContext);

    return(
        <View style={[styles.card , {backgroundColor: card}, style ]} {...rest}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16, // rounded corners
    padding: 16, // padding inside the card
    shadowColor: "white", // shadow color
    shadowOffset: {
      width: 0, // horizontal shadow offset
      height: 4, // vertical shadow offset
    },
    shadowOpacity: 0.1, // shadow opacity
    shadowRadius: 6, // shadow blur radius
    elevation: 1, // for Android shadow
    margin: 10, // some margin for spacing between other elements
  },
})