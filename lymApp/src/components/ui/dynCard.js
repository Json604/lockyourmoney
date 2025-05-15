import { useContext } from "react";
import {StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../context/useTheme";

export default function DynCard({style,children,props}){
    const{card} = useContext(ThemeContext);

    return(
        <TouchableOpacity>
            <View style={[styles.card , {backgroundColor: card}, style ]} {...props}>
                {children}
            </View>
        </TouchableOpacity>
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
    elevation: 6, // for Android shadow
    margin: 10, // some margin for spacing between other elements
  },
})