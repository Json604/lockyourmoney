import { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../../context/useTheme";

export default function Login(){
    const {text,subtext,background} = useContext(ThemeContext);

    return(
        <View>
            <Text style={{color:text}}>Lock Your money</Text>
            <Text style={{color:subtext}}>Take control of your financial future with our innovative savings lock system.</Text>
        </View>
    ) 
}