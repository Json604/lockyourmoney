import { useContext } from "react";
import { View , TextInput, Text, ScrollView, StyleSheet } from "react-native";
import { ThemeContext } from "../../context/useTheme";
import StatCard from "../../components/ui/StatCard";
import {Calendar} from "react-native-calendars";
import DynCard from "../../components/ui/dynCard";


export default function Lock(){

const {background,primary,subtext} = useContext(ThemeContext);
const date = new Date();
const maxdate = date.getDate() + 30;

return(
    <ScrollView style={[styles.page,{backgroundColor:background}]}>
        <StatCard style={styles.inp}>
        <TextInput
        placeholder="Enter the amount (₹)"
        keyboardType="number-pad"
        maxLength={4}
        style={{width:'100%', height:'100%'}}
        />
        </StatCard>

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
            marginTop:50,
            paddingBottom:20,
            borderRadius:20,
        }}
        />

        <DynCard style={{marginTop:190, marginHorizontal:160, backgroundColor:primary }}>
            <Text style={{textAlign:'center', fontSize:18, fontWeight:'bold', }}>Lock</Text>
        </DynCard>
    </ScrollView>
)
}

const styles = StyleSheet.create({
    page:{flex:1, paddingTop:100,},
    inp:{elevation:15,},

})
