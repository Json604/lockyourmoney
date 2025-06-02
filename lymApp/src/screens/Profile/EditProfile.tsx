import { StyleSheet, Text, View } from "react-native";
import CompTextInput from "../../components/inputCard/TextInput";
import { useContext } from "react";
import { ThemeContext } from "../../context/useTheme";
import StatCard from "../../components/cards/StatCard";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DynCard from "../../components/cards/dynCard";
import { useNavigation } from "@react-navigation/native";

export default function EditProfile(){
    const{text,scrollCard,subtext,highAtnshn} = useContext(ThemeContext);
    const nav = useNavigation();

    return(
        <View>
            <Text style={[styles.header,{color:text}]}>Phone</Text>
            <StatCard style={[styles.phoneCard,{backgroundColor:scrollCard}]}>
                <Text style={[{color:subtext}]}>+91 8264196438</Text>
                <Icon name='checkbox-marked-circle-outline' color={'green'} size={24}/>
            </StatCard>

            <Text style={[styles.header,{color:text}]}>Name</Text>
            <CompTextInput
            placeholder='enter your name'
            />
            
            <Text style={[styles.header,{color:text}]}>Email</Text>
            <CompTextInput
            placeholder='enter your e-mail'
            textContentType='emailAddress'
            keyboardType='email-address'
            />

            <DynCard style={styles.saveCard} onPress={() => nav.goBack()}>
                <Text style={[{color:highAtnshn,textAlign:'center'}]}>Save details</Text>
            </DynCard>
        </View>
    )   
}

const styles = StyleSheet.create({
    header:{margin:10},
    phoneCard:{borderRadius:8,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:0},
    saveCard:{marginHorizontal:'35%',elevation:10,marginVertical:50,shadowColor:'red',},
})