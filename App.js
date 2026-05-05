import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text } from 'react-native';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import PhoneNumberForForgetPassword from './PhoneNumberForForgetPassword';
import OtpForForgetPassword from './OtpForForgetPassword';
import ResetPassword from './ResetPassword';
import Getstarted from './Getstarted';
import { useEffect } from 'react';
import{ useFonts, Outfit_700Bold} from "@expo-google-fonts/outfit";
import { LinearGradient } from 'expo-linear-gradient';



const SplashScreen=({navigation})=>{

  useEffect(() =>{
    const timer=setTimeout(()=>{
      navigation.replace("Getstarted")
    },3000)
    return ()=>clearTimeout(timer); 
  },[navigation])

return(
     <LinearGradient colors={['#e5e8ef','#B0BFF8']} style={styles.background}>
      <Image source={require('./assets/logo.png')} style={styles.img}></Image>
     </LinearGradient>
)
}


const Stack=createNativeStackNavigator();


export default function App() {
  
  const [loadFonts]=useFonts({
      Outfit_700Bold
    })

    if(!loadFonts){
        return null;
    }

  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName='logoscreen'>

        <Stack.Screen name='logoscreen' component={SplashScreen} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Signin' component={Signin} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='PhoneNumberForForgetPassword' component={PhoneNumberForForgetPassword} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='OtpForForgetPassword' component={OtpForForgetPassword} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='ResetPassword' component={ResetPassword} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}} ></Stack.Screen>
        <Stack.Screen name='Getstarted' component={Getstarted} options={{headerShown:false}}></Stack.Screen>
                
      </Stack.Navigator>
      
    </NavigationContainer>

  );
}

const styles=StyleSheet.create({

  background:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  
  img:{
    width:190,
    height:190,
  },

  logotext:{
    textAlign:'center',
    fontFamily:'Outfit_700Bold',
    fontSize:36,
    marginTop:30
  }
})