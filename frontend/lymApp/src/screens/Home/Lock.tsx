import { useContext } from "react";
import { View , TextInput, Text, ScrollView, StyleSheet } from "react-native";
import { ThemeContext } from "../../context/useTheme";
import {Calendar} from "react-native-calendars";
import DynCard from "../../components/cards/dynCard";
import StatCard from "../../components/cards/StatCard";
import { useNavigation } from "@react-navigation/native";
import { LockScreenNavProp } from "../../types/navTypes";


export default function Lock(){

const {background,primary,subtext,text} = useContext(ThemeContext);
const date = new Date();
const maxdate = date.getDate() + 30;
const nav = useNavigation<LockScreenNavProp>();

return(
    <ScrollView contentContainerStyle={[styles.page,{backgroundColor:background}]}>
        <StatCard style={styles.inp}>
        <TextInput
        placeholder="Enter the amount (₹)"
        keyboardType="number-pad"
        maxLength={4}
        style={{width:'100%', height:'100%'}}
        />
        </StatCard>

        <Text style={[styles.calText,{color:text}]}>Select date:</Text>
        <Calendar
        initialDate={date.toDateString()}
        hideExtraDays
        maxDate={maxdate.toString()}
        theme={{
            arrowColor:primary, 
            calendarBackground:"rgb(80, 80, 80)", 
            todayBackgroundColor:primary,
            todayTextColor:"black",
            dayTextColor:'white', 
            monthTextColor:'white',
        }}
        style={{
            marginHorizontal:30,
            marginTop:20,
            paddingBottom:20,
            borderRadius:20,
        }}
        />

        <DynCard 
        style={{marginTop:190, marginHorizontal:160, backgroundColor:primary }}
        onPress={() =>{
            nav.popToTop();
        }}
        >
            <Text style={{textAlign:'center', fontSize:18, fontWeight:'bold', }}>Lock</Text>
        </DynCard>
    </ScrollView>
)
}

const styles = StyleSheet.create({
    page:{flex:1, paddingTop:100, },
    inp:{elevation:15,flexDirection:'row',justifyContent: "space-between", alignItems: "center",},
    calText:{marginHorizontal:20,marginTop:50,fontSize:18},
})
