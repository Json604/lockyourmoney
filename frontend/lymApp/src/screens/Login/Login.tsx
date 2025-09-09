import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Image, Text, StyleSheet, Alert} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { ThemeContext } from '../../context/useTheme';
import DynCard from '../../components/cards/dynCard';
import { useNavigation } from '@react-navigation/native';
import FloatingPlaceholderInput from '../../components/inputCard/FloatingPlaceholderInput';

const Login = () => {
    const {primary,text,subtext,placeholderText} = useContext(ThemeContext);
    const [changeSheet, setChangeSheet] = useState(false);
    const [name, setName] = useState('');
    const nameRegex = /^[A-Za-z\s'-]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const nav = useNavigation();

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSnapChanges = useCallback((index: number) => {
      console.log('handleSnapChanges', index);
    }, []);

    const handleSheetChange = useCallback(() => {
      if (nameRegex.test(name.trim()) && emailRegex.test(email.trim())) {
        setChangeSheet(true)
      }
      else{
        Alert.alert('Please fill all the input fields correctly to proceed.')
      }
    },[name,email])

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
          snapPoints = {["70%"]}
          keyboardBehavior='fillParent'
          keyboardBlurBehavior="restore"
          backgroundStyle={{backgroundColor:'#2e2b2bff', opacity:1}}
          handleIndicatorStyle={{backgroundColor:subtext}}
          >
            <BottomSheetView style={styles.contentContainer}>
              <Text style={[styles.heading,{color:text, }]}>Register</Text>
              <Text style={[styles.subHeading,{color:subtext}]}>Create your Account</Text>
              <FloatingPlaceholderInput
              label="NAME"
              value={name}
              onChangeText={setName}
              />
              <FloatingPlaceholderInput
              label="EMAIL"
              value={email}
              onChangeText={setEmail}
              />
              <FloatingPlaceholderInput
              label="PASSWORD"
              value={password}
              onChangeText={setPassword}
              />
              <DynCard
              style={[styles.card , {backgroundColor:primary}]}
              onPress={handleSheetChange}
              >
                  <Text style={{textAlign:'center', fontWeight:'500',fontSize:20}}>Login</Text>
              </DynCard>
            </BottomSheetView>
        </BottomSheet>
        ):(
        <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSnapChanges}
        index={1}
        snapPoints = {["70%"]}
        keyboardBehavior='fillParent'
        keyboardBlurBehavior="restore"
        backgroundStyle={{backgroundColor:'#2e2b2bff', opacity:0.7}}
        handleIndicatorStyle={{backgroundColor:subtext}}
        >
          <BottomSheetView style={styles.contentContainer}>
              <Text style={[styles.heading,{color:text, fontSize:25}]}>Login/SignUp</Text>
              <BottomSheetTextInput
              placeholder="Enter Password"
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
  heading:{paddingHorizontal:15,paddingBottom:5,fontSize:30,fontWeight:'600'},
  subHeading:{paddingHorizontal:15,paddingBottom:10, fontSize:15},
  card:{padding:15,paddingVertical:13, margin:15,borderRadius:10,},
});

export default Login;