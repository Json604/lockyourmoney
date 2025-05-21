import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../../context/useTheme";
import StatCard from "../../components/ui/StatCard";
import * as Progress from 'react-native-progress';
import DynCard from "../../components/ui/dynCard";

export default function Home(){
    const {background,text,subtext,primary} = useContext(ThemeContext);
    const money = Math.round(Math.random()*9999);
    const daysLeft = Math.floor(Math.random() * 30) + 1; // 1 to 30
    const progress = daysLeft/30;

    return(
        <ScrollView style={{backgroundColor:background , flex:1, }}>
            <View style={styles.header}>
                <Text style={[styles.text, {color:text}]}>Hello, John!</Text>
                <Text style={[{color:subtext}]}>Welcome to LYM</Text>
            </View>
            <StatCard style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={[{color:subtext}]}>Locked money</Text>
                        <Text style={[styles.lockM, {color:text}]}>₹{money}</Text>
                        <DynCard style={styles.early}>
                            <Text style={{color:text}}>Unlock now</Text>
                        </DynCard>
                    </View>
                    <Progress.Circle 
                    size={120} 
                    progress={progress} 
                    color={primary} 
                    showsText={true}
                    thickness={7} 
                    strokeCap='round' 
                    formatText={() => `${30 - daysLeft} days left`} 
                    unfilledColor={subtext}
                    borderWidth={0}
                    textStyle={{ fontWeight: "bold" , textAlign:'center'}}
                    />
                </View>
            </StatCard>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    header:{ marginTop:50, marginHorizontal:20 },
    text:{fontWeight:'bold', fontSize:24,},
    card: {marginVertical:30,marginHorizontal:20, elevation:25, borderWidth:0.2, borderColor:'white'},
    lockM:{fontSize:24, marginTop:5,},
    row: {flexDirection: "row",justifyContent: "space-between", paddingHorizontal: 10, },
    column: {flex:1,},
    early: {backgroundColor: 'red',paddingVertical: 4,paddingHorizontal: 8,width: "auto", alignSelf: 'flex-start', marginTop: 30,marginLeft:0},
})