import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View,Image, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
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
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const [eyeClose, setEyeClose] = useState(true)
    const nav = useNavigation();
    const [loginOrCreate, setLOC] = useState('Create')

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSnapChanges = useCallback((index: number) => {
      console.log('handleSnapChanges', index);
    }, []);

    const handleSheetChange = useCallback(() => {
        setChangeSheet(prev => !prev)
        if(loginOrCreate === 'Create') return setLOC('Login');
        else return setLOC('Create')
    },[])

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const handleCreateAcc = useCallback(() => {
      const errors = [];

      if (!nameRegex.test(trimmedName)) {
        errors.push("• Name must be 2 to 50 characters long.");
      }
      if (!emailRegex.test(trimmedEmail)) {
        errors.push("• Enter a valid Email address.");
      }
      if (!passwordRegex.test(trimmedPassword)) {
        errors.push("• Password must be Atleast 8 characters long \n • Include at least one uppercase letter (A-Z) \n Include at least one lowercase letter (a-z) \n • Include at least one number (0-9) \n • Include at least one special character (@, $, !, %, *, ?, &");
      }

      if (errors.length > 0) {
        Alert.alert("Please fix the following:", errors.join("\n"));
      } else {
        nav.navigate('Main');
      }
    }, [name, email, password]);

    const handleLogin = useCallback(() => {
      const errors = [];
      if (!emailRegex.test(trimmedEmail)) {
        errors.push("• Enter a valid Email address.");
      }
      if (!trimmedPassword) {
        errors.push("• Enter Your Password");
      }

      if (errors.length > 0) {
        Alert.alert("Please fix the following:", errors.join("\n"));
      } else {
        nav.navigate('Main');
      }
  }, [name, email, password]);

    const handleEye = () => {
      setEyeClose(prev => !prev)
    }

    return (
      <GestureHandlerRootView style={styles.container}>
        <Image 
        source={require("../../assets/loginIMG.png")}
        style={{width:'100%', height:'100%'}}
        />
        {!changeSheet
        ? (
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
              <View style={{position:'relative'}}>
                <FloatingPlaceholderInput
                label="PASSWORD"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={eyeClose}
                />
                <TouchableOpacity onPress={handleEye}>
                  <Image
                      source={
                        eyeClose
                        ? require('../../assets/EyeClose.png')
                        : require('../../assets/EyeOpen.png')
                      }
                      style={{position:'absolute',width: 30, height: 30,bottom:20, right:30}}
                  />
                </TouchableOpacity>  
              </View>
              <DynCard
              style={[styles.card , {backgroundColor:primary}]}
              onPress={handleCreateAcc}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </DynCard>
              <View style={{position:'relative'}}>
                <View style={{ height: 1, backgroundColor: 'grey', marginVertical: 30,marginHorizontal:20}} />
                <View style={{position:'absolute', backgroundColor:'#2e2b2bff', alignItems:'center', left:140,right:140, top:20}}>
                  <Text style={{color:'white'}}>Or login with</Text>
                </View>
              </View>
              <DynCard 
                style={[styles.card , {backgroundColor:'white',}]}
                onPress={() => {
                  Alert.alert("I'll implement this just wait for some time")
                }}
                >
                  <Image
                  source={require('../../assets/google.png')}
                  style={{ position:'absolute',width: 40, height: 40, left:75, top:7}}
                  />
                  <Text style={[styles.buttonText, {left:20}]}>Sign-in with Google</Text>
                </DynCard>
                <View style={{marginVertical:15}}>
                  <Text style={{color:'white', fontSize:15, textAlign:'center'}}>Already have an account?{' '}
                    <Text style={{color:primary,textDecorationLine:'none',}} onPress={handleSheetChange}>Login here</Text>
                  </Text>
                 </View> 
            </BottomSheetView>
        </BottomSheet>
        ):(
          <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSnapChanges}
          index={1}
          snapPoints = {["45%"]}
          keyboardBehavior='fillParent'
          keyboardBlurBehavior="restore"
          backgroundStyle={{backgroundColor:'#2e2b2bff', opacity:1}}
          handleIndicatorStyle={{backgroundColor:subtext}}
          >
            <BottomSheetView style={styles.contentContainer}>
                <Text style={[styles.heading,{color:text, }]}>Sign in to Your Account</Text>
                <FloatingPlaceholderInput
                label="EMAIL"
                value={email}
                onChangeText={setEmail}
                />
                <View style={{position:'relative', marginBottom:30}}>
                  <FloatingPlaceholderInput
                  label="PASSWORD"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={eyeClose}
                  />
                  <TouchableOpacity onPress={handleEye}>
                    <Image
                        source={
                          eyeClose
                          ? require('../../assets/EyeClose.png')
                          : require('../../assets/EyeOpen.png')
                        }
                        style={{position:'absolute',width: 30, height: 30,bottom:20, right:30}}
                    />
                  </TouchableOpacity>
                  <Text style={{position:'absolute',color:primary,textDecorationLine:'none',right:20,bottom:-25}}>Forgot Password?</Text>
                </View>
                <DynCard
                style={[styles.card , {backgroundColor:primary}]}
                onPress={handleLogin}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </DynCard>
                <View style={{marginVertical:15}}>
                    <Text style={{color:'white', fontSize:15, textAlign:'center'}}>Don't have an account?{' '}
                      <Text style={{color:primary,textDecorationLine:'none',}} onPress={handleSheetChange}>Register</Text>
                    </Text>
                </View> 
            </BottomSheetView>
          </BottomSheet>
      )}
      </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1,},
  contentContainer: {flex: 1,},
  heading:{paddingHorizontal:15,paddingBottom:5,fontSize:30,fontWeight:'600'},
  subHeading:{paddingHorizontal:15,paddingBottom:10, fontSize:15},
  card:{padding:15,paddingVertical:13, margin:15,borderRadius:10,},
  buttonText:{textAlign:'center', fontWeight:'500',fontSize:20},
});

export default Login;