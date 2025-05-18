import { useContext } from "react";
import { View , TextInput, Text } from "react-native";
import { ThemeContext } from "../../context/useTheme";
import DynCard from "../../components/ui/dynCard";
import { useNavigation } from "@react-navigation/native";
import { LockScreenNavProp } from "../../types/navTypes";


export default function Lock(){
const {background} = useContext(ThemeContext);
const nav = useNavigation<LockScreenNavProp>();


return(
    <View style={{backgroundColor:background, flex:1}}>
        <TextInput
        placeholder="Enter the amount"
        />
        <DynCard 
        onPress={() => {
            nav.popToTop();
        }}
        style={{backgroundColor:background}}
        >
            <Text style={{ color: "white" }}>Back to home</Text>
        </DynCard>
    </View>
)


}
