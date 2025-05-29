import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../../context/useTheme";
import StatCard from "../../components/ui/StatCard";
import * as Progress from 'react-native-progress';
import DynCard from "../../components/ui/dynCard";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";
import { LockScreenNavProp } from "../../types/navTypes";

export default function Home(){
    const {background,text,subtext,primary,scrollCard} = useContext(ThemeContext);
    const money = Math.round(Math.random()*9999);
    const daysLeft = Math.floor(Math.random() * 30) + 1; // 1 to 30
    const progress = daysLeft/30;
    const nav = useNavigation<LockScreenNavProp>();

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
                    size={125} 
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
            <View style={styles.sec2}>
                <DynCard style={styles.goalCard}>
                    <Text style={{color:text}}>Goal</Text>
                </DynCard>
                <DynCard style={styles.streakCard}>
                    <Text style={{color:text}}>Streak</Text>
                </DynCard>
            </View>
            <View style={styles.sec3}>
                <StatCard style={styles.recentCard}>
                    <View style={styles.recentHeader}>
                        <Icon name='history' color={text} size={25}/>
                        <Text style={{color:text}}>Recent Activity</Text>
                    </View>
                    <ScrollView>
                        <StatCard style={[styles.recentCardScroll,{backgroundColor:scrollCard}]}>
                            <Text style={{color:subtext}}>May 10,2025</Text>
                            <Text style={{color:subtext}}>locked: ₹500</Text>
                        </StatCard>
                        <StatCard style={[styles.recentCardScroll,{backgroundColor:scrollCard}]}>
                            <Text style={{color:subtext}}>April 3,2025</Text>
                            <Text style={{color:subtext}}>withdraw: ₹500</Text>
                        </StatCard>
                        <StatCard style={[styles.recentCardScroll,{backgroundColor:scrollCard}]}>
                            <Text style={{color:subtext}}>March 10,2025</Text>
                            <Text style={{color:subtext}}>early withdraw: ₹2000</Text>
                        </StatCard>
                        <StatCard style={[styles.recentCardScroll,{backgroundColor:scrollCard}]}>
                            <Text style={{color:subtext}}>Feb 3,2025</Text>
                            <Text style={{color:subtext}}>locked: ₹147</Text>
                        </StatCard>
                        <StatCard style={[styles.recentCardScroll,{backgroundColor:scrollCard}]}>
                            <Text style={{color:subtext}}>Jan 6,2025</Text>
                            <Text style={{color:subtext}}>locked: ₹69</Text>
                        </StatCard>
                    </ScrollView>
                </StatCard>
            </View>
            <DynCard style={[styles.lockMore, {backgroundColor:primary}]} onPress={() => nav.navigate('Lock')}>
                <Icon name='cash-plus' size={25} />
                <Text style={styles.lockMoreText}>Lock more</Text>
            </DynCard>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    header:{ marginTop:50, marginHorizontal:20 },
    text:{fontWeight:'bold', fontSize:24,},
    card: {marginVertical:30,marginHorizontal:20, elevation:30,},
    lockM:{fontSize:30, marginTop:5,marginBottom:0},
    row: {flexDirection: "row",justifyContent: "space-between", paddingHorizontal: 10, },
    column: {flex:1,},
    early: {backgroundColor: 'red',paddingVertical: 8,paddingHorizontal: 16,width: "auto", alignSelf: 'flex-start', marginTop: 30,marginLeft:0,marginBottom:0},
    sec2: {display:'flex',flexDirection:'row', marginHorizontal:20,},
    goalCard: {flex:6,marginRight:10,minHeight:150,},
    streakCard: {flex:4,marginLeft:10},
    sec3:{marginHorizontal:10,},
    recentCard: {marginTop:25,height:270},
    lockMore: { flexDirection:'row',alignItems:'center',justifyContent:'center', marginHorizontal:'auto',marginTop:35,padding:10},
    lockMoreText: {fontSize:20,fontWeight:'600'},
    recentHeader:{ marginBottom:10,flexDirection:'row', gap:10,alignItems:'center'},
    recentCardScroll: {borderRadius:10},
})