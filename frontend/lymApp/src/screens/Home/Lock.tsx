import { useContext, useState } from "react";
import { TextInput, Text, ScrollView, StyleSheet, Alert, Platform } from "react-native";
import { ThemeContext } from "../../context/useTheme";
import { Calendar } from "react-native-calendars";
import DynCard from "../../components/cards/dynCard";
import StatCard from "../../components/cards/StatCard";
import Modal from 'react-native-modal'
import { useLockContext } from "../../context/lockContext";
import RazorpayCheckout from 'react-native-razorpay';
import { ANDROID_BASE_URL, IOS_BASE_URL, RAZORPAY_KEY_ID } from "../../../config";

export default function Lock() {
    const { background, primary, text, subtext, highAtnshn } = useContext(ThemeContext);

    const numberRegex = /^\d*$/;

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 180);

    const [disableLeft, setDisableLeft] = useState(true);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    
    // const [lockedAmount, setLockedAmount] = useState(""); // amount entered
    // const [lockedDays, setLockedDays] = useState<number>(0); // how many days
    // const [storedTill, setStoredTill] = useState<string | null>(null); // till what date

    const {
    lockedAmount,
    setLockedAmount,
    lockedDays,
    setLockedDays,
    storedTill,
    setStoredTill,
    } = useLockContext();

    const formatDate = (date: Date) => date.toISOString().split("T")[0];
    const todayStr = formatDate(today);
    const maxDateStr = formatDate(maxDate);

    const getMarkedDates = () => {
        if (!selectedDate) {
            return {
                [todayStr]: {
                    customStyles: {
                        container: { backgroundColor: primary },
                        text: { color: "black", fontWeight: "bold" },
                    },
                },
            };
        }

        const marks: any = {};
        const fromDate = new Date(todayStr);
        const toDate = new Date(selectedDate);

        while (fromDate <= toDate) {
            const str = formatDate(fromDate);
            marks[str] = {
                customStyles: {
                    container: { backgroundColor: primary },
                    text: { color: "black", fontWeight: "bold" },
                },
            };
            fromDate.setDate(fromDate.getDate() + 1);
        }

        return marks;
    };

    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        if (!lockedAmount || !selectedDate) {
            Alert.alert("Incomplete Info", "Please enter amount and select date.");
            return;
        }

        if (lockedDays < 2) {
            Alert.alert("Invalid Duration", "Lock duration must be at least 2 days from now.");
            return;
        }
        if(!numberRegex.test(lockedAmount)){
            Alert.alert("Please enter a valid number")
            return;
        }
        setModalVisible(!isModalVisible);
    };


    return (
        <ScrollView contentContainerStyle={[styles.page, { backgroundColor: background }]}>
            <StatCard style={styles.inp}>
                <TextInput
                    placeholder="Enter the amount (₹)"
                    keyboardType="number-pad"
                    maxLength={3}
                    value={lockedAmount}
                    onChangeText={(text) => setLockedAmount(text)}
                    style={{ width: "100%", height: "100%", color: text }}
                    placeholderTextColor='grey'
                />
            </StatCard>
            <Text style={[styles.calSubtext, { color: subtext }]}>
                (BETA version: Amounts less than ₹1000 allowed only.)
            </Text>

            <Text style={[styles.calText, { color: text }]}>Select date:</Text>
            <Text style={[styles.calSubtext, { color: subtext }]}>
                (max 180 days can be selected)
            </Text>

            <Calendar
                initialDate={todayStr}
                hideExtraDays
                maxDate={maxDateStr}
                minDate={todayStr}
                disableArrowLeft={disableLeft}
                onMonthChange={({ month, year }) => {
                    const isCurrent = month - 1 === currentMonth && year === currentYear;
                    setDisableLeft(isCurrent);
                }}
                onDayPress={(day) => {
                    const selected = new Date(day.dateString);
                    const diffInMs = selected.getTime() - today.getTime();
                    const diffDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

                    setSelectedDate(day.dateString);
                    setStoredTill(day.dateString); //  store date till lock
                    setLockedDays(diffDays); //  total days locked
                }}
                markingType="custom"
                markedDates={getMarkedDates()}
                theme={{
                    arrowColor: primary,
                    calendarBackground: "rgb(80, 80, 80)",
                    todayTextColor: "black",
                    dayTextColor: "white",
                    monthTextColor: "white",
                    textDisabledColor: 'gray',
                }}
                style={{
                    marginHorizontal: 30,
                    marginTop: 20,
                    paddingBottom: 20,
                    borderRadius: 20,
                }}
            />

            <DynCard
            style={{ marginTop: 30, marginHorizontal: 160, backgroundColor: primary }}
            onPress={toggleModal}
            >
                <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
                    Lock
                </Text>
            </DynCard>

            <Modal
                isVisible={isModalVisible}
                coverScreen={false}
                onBackdropPress={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
            >
                <StatCard style={{ alignItems: 'center', marginHorizontal: 50, elevation: 10 }}>
                    <Text style={{ color: text, marginTop: 4, textAlign: 'center' }}>You are going to lock ₹{lockedAmount} till {storedTill}</Text>
                    <Text style={{ color: text, marginTop: 4 }}>That's {lockedDays} days from today.</Text>
                    <DynCard
                    style={{
                        elevation: 10,
                        shadowColor: highAtnshn,
                        marginVertical: 20,
                        marginTop: 40
                    }}
                    onPress={async () => {
                        setModalVisible(false);

                        const res = await fetch((Platform.OS === 'android') ? `${ANDROID_BASE_URL}/payment/order` : `${IOS_BASE_URL}/payment/order`, {
                            method: 'POST',
                            headers: { 
                                "Content-Type": "application/json",
                                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2OGNkMjUzOWM0ZjQ3NTkzNjU2MzUyMTMiLCJpYXQiOjE3NTgyNzQ4NzMsImV4cCI6MTc2NjA1MDg3M30.LkKieu3Okoesf03U-ipHOxmauSaGljWe-RGYSOZediw`
                            },
                            body: JSON.stringify({
                                amount: lockedAmount,
                                currency: 'INR',
                                unlockDate: '2025-10-18T06:28:57.094Z'
                            })
                        })

                        const order = await res.json()

                        if(!order.success) Alert.alert(order.error)

                        console.log(order);

                        var options = {
                            description: 'Lock Your Amount',
                            image: '',
                            currency: 'INR',
                            key: RAZORPAY_KEY_ID,
                            amount: order.data.amount,
                            name: 'LYM - Lock Your Money',
                            order_id: order.data.id,
                            prefill: {
                            email: 'kartikey.com',
                            contact: '+918264196438',
                            name: 'Kartikey'
                            },
                            theme: {color: primary}
                        }
                        RazorpayCheckout.open(options)
                        .then(async (data) => {
                            // handle success
                            const verifyRes = await fetch((Platform.OS === 'android') ? `${ANDROID_BASE_URL}/payment/verify` : `${IOS_BASE_URL}/payment/verify`,{
                                method:"POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    razorpay_order_id: data.razorpay_order_id,
                                    razorpay_payment_id: data.razorpay_payment_id,
                                    razorpay_signature: data.razorpay_signature
                                })
                            })

                            const result = await verifyRes.json();

                            if(result.success) Alert.alert(`Payment Verified Successfully`);
                            else Alert.alert(`Payment Verification Failed`);

                        }).catch((error) => {
                            // handle failure
                            Alert.alert(`Error: ${error.code} | ${error.description}`);
                        })
                        }}
                    >
                        <Text style={{ color: highAtnshn }}>Confirm lock</Text>
                    </DynCard>
                </StatCard>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1, paddingTop: 100 },
    inp: { elevation: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center", },
    calText: { marginHorizontal: 20, marginTop: 50, fontSize: 18 },
    calSubtext: { marginHorizontal: 20, fontSize: 13, marginTop: 5 },
});
