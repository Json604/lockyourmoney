import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View,Image, Text, StyleSheet, Alert, TouchableOpacity, Platform} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { ThemeContext } from '../../context/useTheme';
import DynCard from '../../components/cards/dynCard';
import { useNavigation } from '@react-navigation/native';
import FloatingPlaceholderInput from '../../components/inputCard/FloatingPlaceholderInput';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ANDROID_BASE_URL, IOS_BASE_URL } from "../../../config";


const Login = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '900359259255-3i3gbql56s2m5s3k4kf6tqihfoj51sd5.apps.googleusercontent.com',
      offlineAccess:true,
    });
  },[])

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

  const handleCreateAcc = useCallback(async () => {
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
    }
    else {
      try {
        const response = await fetch((Platform.OS === 'android') ? `${ANDROID_BASE_URL}/auth/sign-up` : `${IOS_BASE_URL}/auth/sign-up`,{
          method: "POST",
          headers:{
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            password: trimmedPassword
          })
        })

        const data = await response.json();

        if(!response.ok){
          throw new Error(data.error || 'Account creation failed.')
        }

        nav.navigate("Main")

      } catch (error) {
        Alert.alert("Account creation failed", error.message)
      }
    }
  }, [name, email, password]);

  const handleLogin = useCallback(async() => {
    const errors = [];
    if (!emailRegex.test(trimmedEmail)) {
      errors.push("• Enter a valid Email address.");
    }
    if (!trimmedPassword) {
      errors.push("• Enter Your Password");
    }

    if (errors.length > 0) {
      Alert.alert("Please fix the following:", errors.join("\n"));
    } 
    else {
      try {
        const response = await fetch((Platform.OS === 'android') ? `${ANDROID_BASE_URL}/auth/sign-in` : `${IOS_BASE_URL}/auth/sign-in`, {
          method: "POST",
          headers:{
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            email: trimmedEmail,
            password: trimmedPassword
          })
        })

        const data = await response.json()

        if(!response.ok){
          throw new Error(data.error  || "Login failed")
        }

        nav.navigate("Main")

      } catch (error) {
        Alert.alert("Login failed", error.message)
      }
    }
  }, [name, email, password]);

  async function handleGoogleLogin() {
    try {
      await GoogleSignin.signOut();
      // 1. Check Google Play Services
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // 2. Sign in and get user info
      const signInResult = await GoogleSignin.signIn();
      
      const idToken = signInResult.data?.idToken
      if (!idToken) throw new Error('No ID token found');

      const user  = signInResult.data?.user // contains name, email, photo
      if (!user) {
        throw new Error('Google user info not found');
      }

      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(getAuth(), googleCredential);
      const firebaseToken = await userCredential.user.getIdToken();

      const { name, email } = user;


      // 3. Send ID token and user info to your backend
      const response = await fetch(
        Platform.OS === 'android'
          ? `${ANDROID_BASE_URL}/auth/google`
          : `${IOS_BASE_URL}/auth/google`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firebaseToken,
            name,
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Google login failed');

      // 4. Navigate to Main if successful
      nav.navigate('Main');
    } catch (error) {
      console.error(error);
      Alert.alert('Google Sign-In failed', error.message);
    }
  }


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
        snapPoints = {["70%","90%"]}
        keyboardBehavior='extend'
        enableBlurKeyboardOnGesture={true}
        keyboardBlurBehavior="restore"
        backgroundStyle={{backgroundColor:'#000000ff', opacity:1}}
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
            <View style={{position:'relative',}}>
              <FloatingPlaceholderInput
              label="PASSWORD"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={eyeClose}
              inputStyle={{zIndex:0}}
              />
              <TouchableOpacity 
              onPress={handleEye}
              style={{position:'absolute',bottom:20, right:30}}
              >
                <Image
                    source={
                      eyeClose
                      ? require('../../assets/EyeClose.png')
                      : require('../../assets/EyeOpen.png')
                    }
                    style={{width: 30, height: 30}}
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
              <View style={{position:'absolute', backgroundColor:'#000000ff', alignItems:'center', left:140,right:140, top:20}}>
                <Text style={{color:'white'}}>Or login with</Text>
              </View>
            </View>
            <DynCard 
            style={[styles.card , {backgroundColor:'white',}]}
            onPress={handleGoogleLogin}
            >
              <Image
              source={require('../../assets/google.png')}
              style={{ position:'absolute',width: 40, height: 40, left:75, top:7}}
              />
              <Text style={[styles.buttonText, {left:20}]}>Sign-in with Google</Text>
            </DynCard>

            <View style={{marginVertical:15, display:'flex', flexDirection:'row',justifyContent:'center'}}>
              <Text style={{color:'white', fontSize:15, }}>Already have an account?{' '}</Text>
              <TouchableOpacity onPress={handleSheetChange}>
                <Text style={{color:primary,fontSize:15,}}>Login here</Text>
              </TouchableOpacity>
            </View> 
          </BottomSheetView>
      </BottomSheet>
      ):(
        <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSnapChanges}
        index={1}
        snapPoints = {["45%","75%"]}
        keyboardBehavior='extend'
        enableBlurKeyboardOnGesture={true}
        keyboardBlurBehavior="restore"
        backgroundStyle={{backgroundColor:'#000000ff', opacity:1}}
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
                <TouchableOpacity 
                style={{position:'absolute',bottom:20, right:30}}
                onPress={handleEye}
                >
                  <Image
                      source={
                        eyeClose
                        ? require('../../assets/EyeClose.png')
                        : require('../../assets/EyeOpen.png')
                      }
                      style={{width: 30, height: 30}}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{position:'absolute',color:primary,textDecorationLine:'none',right:20,bottom:-25}}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <DynCard
              style={[styles.card , {backgroundColor:primary}]}
              onPress={handleLogin}
              >
                <Text style={styles.buttonText}>Login</Text>
              </DynCard>
              <View style={{marginVertical:15, display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <Text style={{color:'white', fontSize:15}}>Don't have an account?{' '}</Text>
                <TouchableOpacity onPress={handleSheetChange}>
                  <Text style={{color:primary,fontSize:15}} >Register</Text>
                </TouchableOpacity>  
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