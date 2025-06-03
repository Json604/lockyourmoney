import { useCallback, useContext, useRef, useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking,} from "react-native";
import { ThemeContext } from "../../context/useTheme";
import DynCard from "../../components/cards/dynCard";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DeviceInfo from "react-native-device-info";
import { useNavigation } from "@react-navigation/native";
import { ProfileMainScreenNavProp } from "../../types/navTypes";
import Collapsible from "react-native-collapsible";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CommonBottomSheet from "../../components/modal/CommonBottomSheet";
import CompTextInput from "../../components/inputCard/TextInput";
import Modal from 'react-native-modal'
import StarRating from "react-native-star-rating-widget";
import StatCard from "../../components/cards/StatCard";

export default function ProfileMain() {
    const { primary,background, text, subtext, scrollCard ,highAtnshn} = useContext(ThemeContext);
    const version: string = DeviceInfo.getVersion();
    const nav = useNavigation<ProfileMainScreenNavProp>();
    const [isSupportOpen, setIsSupportOpen] = useState(false);

    const upiRef = useRef<BottomSheetModal>(null);
    const handleUpiPress = useCallback(() => {
        upiRef.current?.present();
    },[])

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [rating, setRating] = useState(0);

    return (
        <ScrollView contentContainerStyle={[styles.scrollContent, { backgroundColor: background }]}>
            <View style={styles.page}>
                {/* Profile */}
                <View style={styles.profileRow}>
                    <View style={styles.pfpWrapper}>
                        <Image source={require("../../../src/assets/profile_pic/pfp2.png")} style={styles.pfp} />
                    </View>
                    <DynCard style={styles.card} onPress={() => nav.navigate('EditProfile')}>
                        <Text style={[styles.cardText, { color: text }]}>John Doe</Text>
                        <Text style={[styles.cardSubText, { color: subtext }]}>+91 123456789</Text>
                        <Icon name="square-edit-outline" size={24} color={subtext} style={styles.matIcon} />
                    </DynCard>
                </View>

                {/* Payment Methods */}
                <Text style={[styles.title, { color: text }]}>Payment Methods</Text>
                <DynCard style={styles.itemsCard} onPress={handleUpiPress}>
                    <Text style={[{ color: text }]}>UPI details</Text>
                    <Icon name="chevron-right" size={24} color={text} />
                </DynCard>
                <CommonBottomSheet
                ref={upiRef}
                snapPoints={['60%','70%']}
                keyboardBehavior="extend"
                >
                    <View>
                        <CompTextInput
                        placeholder="enter your upi id"
                        />
                        <DynCard style={{elevation:10,shadowColor:highAtnshn,marginTop:40,marginHorizontal:150}} onPress={() => upiRef.current?.close()}>
                            <Text style={{color:highAtnshn,textAlign:'center'}} >Submit</Text>
                        </DynCard>
                    </View>
                </CommonBottomSheet>

                {/* Others */}
                <Text style={[styles.title, { color: text, marginTop: 16 }]}>Others</Text>
                <DynCard style={styles.itemsCard} onPress={toggleModal}>
                    <Text style={[{ color: text }]}>Rate us</Text>
                    <Icon name="chevron-right" size={24} color={text} />
                </DynCard>
                <Modal 
                isVisible={isModalVisible}
                coverScreen={false}
                onBackdropPress={() => setModalVisible(!isModalVisible)}
                onBackButtonPress={() => setModalVisible(!isModalVisible)}
                >
                    <StatCard style={{alignItems:'center',marginHorizontal:50,elevation:10}}>
                        <StarRating
                        rating={rating}
                        onChange={setRating}
                        enableHalfStar={false}
                        style={{
                            marginTop:10,
                        }}
                        />
                        <DynCard style={{elevation:10,shadowColor:highAtnshn,marginVertical:20,marginTop:40}} onPress={() => setModalVisible(!isModalVisible)}>
                            <Text style={{color:highAtnshn}} >Submit Rating</Text>
                        </DynCard>
                    </StatCard>
                </Modal>
                <DynCard style={styles.itemsCard} onPress={() => nav.navigate("TnC")}>
                    <Text style={[{ color: text }]}>Terms & Conditions</Text>
                    <Icon name="chevron-right" size={24} color={text} />
                </DynCard>

                {/* Collapsible Customer Support Card */}
                <DynCard style={styles.itemsCard} onPress={() => setIsSupportOpen(!isSupportOpen)}>
                    <Text style={[{ color: text }]}>Customer Support</Text>
                    <Icon
                        name={isSupportOpen ? "chevron-up" : "chevron-down"}
                        size={24}
                        color={text}
                    />
                </DynCard>

                <Collapsible collapsed={!isSupportOpen}>
                    <View style={[styles.supportContent, ]}>
                        <TouchableOpacity style={[styles.supportLink,]} onPress={() => Linking.openURL('mailto:support@lockyourmoney.com')}>
                            <Icon name='email' color={primary} size={18} />
                            <Text style={{ color: subtext,textDecorationLine: "underline", fontSize: 15,}}>
                                support@lockyourmoney.com
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.supportLink,{marginBottom:10}]} onPress={() => Linking.openURL('tel:+918264196438')}>
                            <Icon name='phone' color={primary} size={18} />
                            <Text style={{ color: subtext ,textDecorationLine: "underline",fontSize: 15,}}>
                                +91 8264196438
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Collapsible>

                {/* Logout */}
                <DynCard style={styles.itemsCard} onPress={() => nav.navigate('Logout')}>
                    <Text style={[{ color: text }]}>Logout options</Text>
                    <Icon name="chevron-right" size={24} color={text} />
                </DynCard>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={{ color: subtext }}>App version {version}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: { flexGrow: 1 }, page: { flex: 1, padding: 20 },
    profileRow: { flexDirection: "row", alignItems: "center", marginTop: 50, marginBottom: 35 },
    pfpWrapper: { width: 110, height: 110, marginRight: -37, zIndex: 2, elevation: 6, alignItems: "center", justifyContent: "center" },
    pfp: { width: 120, height: 120, resizeMode: "contain" },
    card: { flex: 1, padding: 20, paddingRight: 150, borderRadius: 12, elevation: 3, zIndex: 1, marginRight: 1 },
    cardText: { fontSize: 20, marginLeft: 30 },
    cardSubText: { fontSize: 15, marginLeft: 30 },
    matIcon: { fontSize: 24, position: "absolute", top: 30, right: 10 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
    itemsCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 10 },
    supportContent: { marginHorizontal: 20, marginTop: -5, padding: 15, borderWidth: 1, borderRadius: 12 },
    supportLink: { flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 20 },
    footer: { flexDirection: "row", justifyContent: "center", marginTop: 30 },
});
