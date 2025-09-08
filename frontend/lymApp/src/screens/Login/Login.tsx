import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Image, Text, StyleSheet, Alert} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { ThemeContext } from '../../context/useTheme';
import DynCard from '../../components/cards/dynCard';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const {primary,text,subtext,placeholderText} = useContext(ThemeContext);
    const [changeSheet, setChangeSheet] = useState(false);
    const [name, setName] = useState('');
    const nameRegex = /^[A-Za-z\s'-]{2,50}$/;
    const phoneRegex = /^\d{10}$/;
    const [phone, setPhone] = useState('');

    const nav = useNavigation();

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSnapChanges = useCallback((index: number) => {
      console.log('handleSnapChanges', index);
    }, []);

    const handleSheetChange = useCallback(() => {
      if (nameRegex.test(name.trim()) && phoneRegex.test(phone.trim())) {
        setChangeSheet(true)
      }
      else{
        Alert.alert('Please fill all the input fields correctly to proceed.')
      }
    },[name,phone])

    return (
      <GestureHandlerRootView style={styles.container}>
        <Image 
        source={require("../../assets/loginIMG.png")}
        style={{width:'100%', height:'100%'}}
        />
        {!changeSheet ? (
          <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSnapChanges}
          index={1}
          snapPoints = {["35%", "70%"]}
          keyboardBehavior='extend'
          keyboardBlurBehavior="restore"
          backgroundStyle={{backgroundColor:'#2e2b2bff'}}
          handleIndicatorStyle={{backgroundColor:subtext}}
          >
            <BottomSheetView style={styles.contentContainer}>
                <Text style={[styles.heading,{color:text, fontSize:20}]}>Login/SignUp</Text>
                <BottomSheetTextInput
                placeholder="Enter Name"
                placeholderTextColor={placeholderText}
                style={[styles.input]}
                value={name}
                onChangeText={setName}
                />
                <BottomSheetTextInput
                placeholder="Enter Phone Number"
                placeholderTextColor={placeholderText}
                style={[styles.input]}
                value={phone}
                onChangeText={setPhone}
                keyboardType='number-pad'
                />
                <DynCard
                style={[styles.card , {backgroundColor:primary}]}
                onPress={handleSheetChange}
                >
                    <Text style={{textAlign:'center', fontWeight:'500'}}>Send OTP</Text>
                </DynCard>
            </BottomSheetView>
        </BottomSheet>
        ):(
        <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSnapChanges}
        index={1}
        snapPoints = {["35%", "70%"]}
        keyboardBehavior='extend'
        keyboardBlurBehavior="restore"
        backgroundStyle={{backgroundColor:'#2e2b2bff'}}
        handleIndicatorStyle={{backgroundColor:subtext}}
        >
          <BottomSheetView style={styles.contentContainer}>
              <Text style={[styles.heading,{color:text, fontSize:20}]}>Login/SignUp</Text>
              <BottomSheetTextInput
              placeholder="Enter OTP"
              placeholderTextColor={placeholderText}
              style={[styles.input]}
              />
              <DynCard
              style={[styles.card , {backgroundColor:primary}]}
              onPress={() => nav.navigate('Main')}
              >
                <Text style={{textAlign:'center', fontWeight:'500'}}>Verify OTP</Text>
              </DynCard>
          </BottomSheetView>
        </BottomSheet>)}
      </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1,},
  contentContainer: {flex: 1,},
  heading:{padding:10, textAlign:'center'},
  input:{borderWidth:1, borderRadius:10, padding:15, margin:15, color:'white'},
  card:{marginHorizontal:'35%', position:'static'},
});

export default Login;