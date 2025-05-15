import { useContext } from "react";
import { Image, StyleSheet, Text, View ,TextInput} from "react-native";
import { ThemeContext } from "../../context/useTheme";
import DynCard from "../../components/ui/dynCard";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StatCard from "../../components/ui/StatCard";
import DeviceInfo from "react-native-device-info";

export default function Profile() {
    const { background,text,subtext,outline,placeholderText } = useContext(ThemeContext);
    const version = DeviceInfo.getVersion();

    return (
        <View style={[styles.page, { backgroundColor: background }]}>
            <View style={styles.profileRow}>
                {/* Profile Picture */}
                <View style={styles.pfpWrapper}>
                    <Image
                        source={require("../../../src/assets/pfp.png")}
                        style={styles.pfp}
                    />
                </View>

                {/* Info Card */}
                <DynCard style={styles.card}>
                    <Text style={[styles.cardText , {color: text}]}>John Doe</Text>
                    <Text style={[styles.cardSubText , {color: subtext}]}>+91 123456789</Text>
                    <Icon name="square-edit-outline" size={24} color={subtext} style={styles.matIcon}/>
                </DynCard>
            </View>

            <View>
                <Text style={[styles.title , {color: text}]}>Payment Methods</Text>
                <StatCard style={styles.itemsCard}>
                    <Text style={[styles.titleItems , {color: text}]}>UPI details</Text>
                    <Icon name="chevron-right" size={24} color={text} />
                </StatCard>
                <StatCard>
                    <Text style={[styles.titleItems , {color: text}]}>Bank details</Text>
                    <Icon name="chevron-right" size={24} color={text} />
                </StatCard>
            </View>
            <View style={{marginTop:16}}>
                <Text style={[styles.title , {color: text}]}>Others</Text>
                <StatCard style={styles.itemsCard}>
                    <Text style={[styles.titleItems , {color: text}]}>Rate us</Text>
                    <Icon name="chevron-right" size={24} color={text} />
                </StatCard>
                <StatCard>
                    <Text style={[styles.titleItems , {color: text}]}>Terms & Conditions</Text>
                    <Icon name="chevron-right" size={24} color={text} />
                </StatCard>
                <StatCard>
                    <Text style={[styles.titleItems , {color: text}]}>Logout options</Text>
                    <Icon name="chevron-right" size={24} color={text} />
                </StatCard>
            </View>
            <View style={styles.footer}>
                <Text style={{color: subtext}}>App version {version}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {flex: 1,padding: 20,},
    profileRow: {flexDirection: 'row',alignItems: 'center',marginTop: 50,marginBottom:35,},
    pfpWrapper: {width: 110,height: 110,marginRight: -37,zIndex: 2,elevation: 6,alignItems: 'center',justifyContent: 'center',},
    pfp: {width: 120,height: 120,resizeMode: 'contain', },
    card: {flex: 1,padding: 20,paddingRight:150,borderRadius: 12,elevation: 3,zIndex: 1,marginRight: 1,},
    cardText: {fontSize: 20,marginLeft: 30,},
    cardSubText: {fontSize: 15,marginLeft: 30,},
    matIcon:{fontSize: 24, color: '#666',position: 'absolute',top: 30,right: 10,},
    title: {fontSize:20,fontWeight:'bold',marginBottom:16},
    itemsCard:{flexDirection:'row',justifyContent: "space-between",alignItems: "center",},
    footer:{flexDirection:'row',justifyContent:'center',marginTop:30},
});
