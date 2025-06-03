import { useCallback, useContext, useRef } from "react";
import { ScrollView, StyleSheet, Text, View} from "react-native";
import { ThemeContext } from "../../context/useTheme";
import DynCard from "../../components/cards/dynCard";
import { getDeviceName } from "react-native-device-info";
import StatCard from "../../components/cards/StatCard";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CommonBottomSheet from "../../components/modal/CommonBottomSheet";
import LottieView from "lottie-react-native";

export default function LogoutOptions(){
    const {background,text,subtext,scrollCard,choice1,choice2,primary,highAtnshn,lowAtnshn} = useContext(ThemeContext);
    const name = getDeviceName();
    
    const logoutRef = useRef<BottomSheetModal>(null)
    const handleLogoutPress = useCallback(() => {
        logoutRef.current?.present();
    },[])

    const dltRef = useRef<BottomSheetModal>(null)
    const handleDltPress = useCallback(() => {
        dltRef.current?.present();
    },[])

    return(
        <ScrollView style={{backgroundColor:background,top:60}}>
            <StatCard style={styles.mainCard}>
                <View style={styles.content}>
                    <View style={{flexDirection:'column'}}>  
                    <Text style={{color:subtext, fontSize:15}}>Current Device</Text>
                    <Text style={{color:text , fontSize:25}}>{name}</Text>
                    </View>
                    <DynCard style={[styles.logoutCard,{backgroundColor:scrollCard}]} onPress={handleLogoutPress}>
                        <Text style={{color:highAtnshn}}>Logout</Text>
                    </DynCard>
                    <CommonBottomSheet
                    ref={logoutRef}
                    snapPoints={['28%']}
                    backgroundColor={scrollCard}
                    indicatorColor={subtext}
                    >
                        <View>
                            <Text style={[styles.sheetHeader,{color:text}]}>Do you want to log out?</Text>
                            <View style={styles.choices}>
                                <DynCard style={[styles.choiceCard,{backgroundColor:choice1}]}>
                                    <Text style={[styles.choiceText,{color:'black'}]} >Yes</Text>
                                </DynCard>
                                <DynCard style={[styles.choiceCard,{backgroundColor:choice2}]} onPress={() => logoutRef.current?.dismiss()}>
                                    <Text style={[styles.choiceText,{color:primary}]} >No</Text>
                                </DynCard>
                            </View>
                        </View>
                    </CommonBottomSheet>
                </View>
            </StatCard>

            <DynCard style={styles.dltBtn} onPress={handleDltPress}>
                <Text style={{color:lowAtnshn,textAlign:'center'}}>Delete Account</Text>
                <CommonBottomSheet
                    ref={dltRef}
                    snapPoints={['70%']}
                    backgroundColor={scrollCard}
                    indicatorColor={subtext}
                    >
                        <View>
                            <Text style={[styles.sheetHeader,{color:text}]}>Are you leaving us?</Text>
                            <View style={{height:400}}>
                                <LottieView
                                source={require('../../assets/animations/dltBtn/dlt.json')}
                                style={[StyleSheet.absoluteFillObject,{top:20}]}
                                autoPlay
                                loop
                                />
                            </View>
                            <View style={styles.choices}>
                                <DynCard style={[styles.choiceCard,{backgroundColor:choice1}]}>
                                    <Text style={[styles.choiceText,{color:'black'}]} >Yes</Text>
                                </DynCard>
                                <DynCard style={[styles.choiceCard,{backgroundColor:choice2}]} onPress={() => dltRef.current?.dismiss()}>
                                    <Text style={[styles.choiceText,{color:primary}]} >No</Text>
                                </DynCard>
                            </View>
                        </View>
                    </CommonBottomSheet>
            </DynCard>
        </ScrollView>
    )   
}

const styles = StyleSheet.create({
    mainCard:{margin:20,elevation:25,paddingVertical:40},
    content:{flexDirection:'row',justifyContent:'space-between'},
    logoutCard:{shadowColor:'red',elevation:25},
    sheetHeader:{fontSize:25,fontWeight:'600',textAlign:'center'},
    choices:{flexDirection:'row',justifyContent:'center',top:80,},
    choiceCard:{marginHorizontal:30,paddingHorizontal:50},
    choiceText:{fontSize:20,fontWeight:'800'},
    dltBtn:{marginHorizontal:20,marginVertical:20},
})