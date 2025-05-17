import { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../../context/useTheme";

export default function Home(){
    const {background} = useContext(ThemeContext);

    return(
        <View style={{backgroundColor:background , flex:1}}>
        </View>
    )
}

