import { useContext,useCallback,useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../../context/useTheme";
import StatCard from "../../components/cards/StatCard";
import * as Progress from 'react-native-progress';
import DynCard from "../../components/cards/dynCard";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";
import { LockScreenNavProp } from "../../types/navTypes";
import { BottomSheetModal} from "@gorhom/bottom-sheet";
import LottieView from "lottie-react-native";
import CommonBottomSheet from "../../components/modal/CommonBottomSheet";

export default function Home(){
    const {background,text,subtext,primary,scrollCard} = useContext(ThemeContext);
    const money = Math.round(Math.random()*9999);
    const daysDone = Math.floor(Math.random() * 30) + 1;
    const progress = daysDone/30;
    const nav = useNavigation<LockScreenNavProp>();

    // bottomsheetRefs
    const goalModalRef = useRef<BottomSheetModal>(null);
    const streakModalRef = useRef<BottomSheetModal>(null);

    // bottomsheetPressFunc
    const goalModalPress = useCallback(() => {
        goalModalRef.current?.present();
    }, []);
    const streakModalPress = useCallback(() => {
        streakModalRef.current?.present();
    },[])   

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
                    formatText={() => ((30 - daysDone) === 1) ? `1 day   left` : `${30 - daysDone} days left`} 
                    unfilledColor={subtext}
                    borderWidth={0}
                    textStyle={{ fontWeight: "bold" , textAlign:'center'}}
                    />
                </View>
            </StatCard>
            <View style={styles.sec2}>
                <DynCard style={styles.goalCard} onPress={goalModalPress}>
                    <Text style={{color:subtext}}>Recurring expenses</Text>
                </DynCard>
                <CommonBottomSheet
                ref={goalModalRef}
                snapPoints={['50%','65%']}
                backgroundColor={scrollCard}
                indicatorColor={subtext}
                >
                    <Text style={{ color: text }}>Add goal</Text>
                </CommonBottomSheet>

                <DynCard style={styles.streakCard} onPress={streakModalPress}>
                    <Text style={{color:text,margin:0,textAlign:'center',padding:0,fontSize:10}}>
                        <Text style={{fontSize:15}} >{daysDone}</Text> days streak
                    </Text>
                    <LottieView
                    source={
                        daysDone <=7 ? require('../../assets/animations/streak/stage1.json')
                        : (daysDone>7 && daysDone<=14) ? require('../../assets/animations/streak/stage2.json')
                        : (daysDone>14 && daysDone<=21) ? require('../../assets/animations/streak/stage3.json')
                        : require('../../assets/animations/streak/stage4.json')
                    }
                    style={[{position:'absolute',top:0,left:-20,right:-20,bottom:-10}]}
                    autoPlay
                    loop
                    />
                </DynCard>
                <CommonBottomSheet
                ref={streakModalRef}
                snapPoints={['40%']}
                backgroundColor={scrollCard}
                indicatorColor={subtext}
                >
                    <Text style={{color:text}} >Streak</Text>
                </CommonBottomSheet>
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
    sec2: {display:'flex',flexDirection:'row', marginHorizontal:20,height:150,},
    goalCard: {flex:7,marginRight:10,margin:0},
    streakCard: {flex:3,marginLeft:10},
    sec3:{marginHorizontal:10,},
    recentCard: {marginTop:25,height:270},
    lockMore: { flexDirection:'row',alignItems:'center',justifyContent:'center', marginHorizontal:'auto',marginTop:35,padding:10},
    lockMoreText: {fontSize:20,fontWeight:'600'},
    recentHeader:{ marginBottom:10,flexDirection:'row', gap:10,alignItems:'center'},
    recentCardScroll: {borderRadius:10},
    expenseCard:{margin:10,borderRadius:10},
})