import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For check mark
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'; // For QR code

import { useNavigation } from '@react-navigation/native';
import { useLockContext } from '../../context/lockContext';

const MockPaymentScreen = () => {
  const navigation = useNavigation();
  const { lockedAmount } = useLockContext();

  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');

  const orderDetails = {
    merchantName: 'Razorpay Demo',
    orderId: 'ORDER_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    amount: lockedAmount,
    description: 'Premium Wireless Headphones'
  };

  const popularBanks = ['SBI', 'HDFC', 'ICICI', 'Axis'];
  const walletOptions = ['Paytm', 'Amazon Pay', 'Freecharge', 'MobiKwik'];

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(res => setTimeout(res, 2000));
    setIsProcessing(false);
    setPaymentComplete(true);
  };

  useEffect(() => {
    if (paymentComplete) {
      setTimeout(() => {
        navigation.popToTop();
      }, 2000);
    }
  }, [paymentComplete]);

  const formatCardNumber = val => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = val => val.replace(/\D/g, '').replace(/^(.{2})(.*)/, '$1/$2').substring(0, 5);

  const isPaymentEnabled = () => {
    switch (selectedMethod) {
      case 'upi': return upiId.includes('@');
      case 'card': return cardDetails.number.length === 19 && cardDetails.expiry.length === 5 && cardDetails.cvv.length >= 3 && cardDetails.name;
      case 'netbanking': return !!selectedBank;
      case 'wallet': return !!selectedWallet;
      default: return false;
    }
  };

  const renderForm = () => {
    switch (selectedMethod) {
      case 'upi':
        return (
          <View>
            <MaterialIcon name="qrcode" size={80} color="gray" style={styles.qr} />
            <TextInput
              placeholder="example@upi"
              placeholderTextColor="gray"
              value={upiId}
              onChangeText={setUpiId}
              style={styles.input}
            />
          </View>
        );
      case 'card':
        return (
          <View>
            <TextInput
              placeholder="1234 5678 9012 3456"
              placeholderTextColor="gray"
              value={cardDetails.number}
              onChangeText={val => setCardDetails({ ...cardDetails, number: formatCardNumber(val) })}
              maxLength={19}
              style={styles.input}
            />
            <TextInput
              placeholder="Cardholder Name"
              placeholderTextColor="gray"
              value={cardDetails.name}
              onChangeText={val => setCardDetails({ ...cardDetails, name: val })}
              style={styles.input}
            />
            <View style={styles.row}>
              <TextInput
                placeholder="MM/YY"
                placeholderTextColor="gray"
                value={cardDetails.expiry}
                onChangeText={val => setCardDetails({ ...cardDetails, expiry: formatExpiry(val) })}
                maxLength={5}
                style={[styles.input, styles.half]}
              />
              <TextInput
                placeholder="CVV"
                placeholderTextColor="gray"
                value={cardDetails.cvv}
                onChangeText={val => setCardDetails({ ...cardDetails, cvv: val.replace(/\D/g, '') })}
                maxLength={4}
                style={[styles.input, styles.half]}
              />
            </View>
          </View>
        );
      case 'netbanking':
        return (
          <View>
            {popularBanks.map(bank => (
              <TouchableOpacity key={bank} onPress={() => setSelectedBank(bank)} style={styles.radioContainer}>
                <Text style={styles.radioText}>{bank}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'wallet':
        return (
          <View>
            {walletOptions.map(wallet => (
              <TouchableOpacity key={wallet} onPress={() => setSelectedWallet(wallet)} style={styles.radioContainer}>
                <Text style={styles.radioText}>{wallet}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  if (paymentComplete) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successBox}>
          <Icon name="check" color="green" size={40} />
          <Text style={styles.successTitle}>Payment Successful</Text>
          <Text style={styles.successSub}>Thanks for using Razorpay</Text>
          <Text style={styles.successId}>Order ID: {orderDetails.orderId}</Text>
          <Text style={styles.successAmount}>₹{orderDetails.amount}</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Pay with Razorpay</Text>

      <View style={styles.methodContainer}>
        {['upi', 'card', 'netbanking', 'wallet'].map(method => (
          <TouchableOpacity key={method} onPress={() => setSelectedMethod(method)}>
            <Text style={[styles.methodText, selectedMethod === method && styles.selectedMethod]}>{method.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderForm()}

      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <Text>Order ID: {orderDetails.orderId}</Text>
        <Text>Merchant: {orderDetails.merchantName}</Text>
        <Text>{orderDetails.description}</Text>
        <Text style={styles.amount}>₹{orderDetails.amount}</Text>
        <TouchableOpacity
          onPress={handlePayment}
          disabled={!isPaymentEnabled() || isProcessing}
          style={[styles.payButton, (!isPaymentEnabled() || isProcessing) && styles.disabled]}
        >
          <Text style={styles.payText}>{isProcessing ? 'Processing...' : `Pay ₹${orderDetails.amount}`}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 40, backgroundColor: 'white', flex: 1, marginTop: 50 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  methodContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  methodText: { fontSize: 14, padding: 8 },
  selectedMethod: { color: 'blue', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12, color: 'black' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  half: { width: '48%' },
  radioContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 8 },
  radioText: { marginLeft: 10 },
  summaryBox: { marginTop: 30, padding: 20, backgroundColor: '#f2f2f2', borderRadius: 10 },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  amount: { fontSize: 24, fontWeight: 'bold', color: 'blue', marginTop: 10 },
  payButton: { marginTop: 20, backgroundColor: 'blue', padding: 12, borderRadius: 10, alignItems: 'center' },
  disabled: { backgroundColor: 'gray' },
  payText: { color: '#fff', fontWeight: 'bold' },
  qr: { alignSelf: 'center', marginBottom: 10 },
  successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' },
  successBox: { backgroundColor: '#fff', padding: 30, borderRadius: 15, alignItems: 'center' },
  successTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  successSub: { fontSize: 14, color: 'gray', marginBottom: 10 },
  successId: { fontSize: 12, color: 'gray' },
  successAmount: { fontSize: 20, fontWeight: 'bold', color: 'green', marginTop: 10 }
});

export default MockPaymentScreen;
