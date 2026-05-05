import { View,Text, StyleSheet, Button, TouchableOpacity } from "react-native"
import{ useFonts, Outfit_700Bold, Outfit_400Regular} from "@expo-google-fonts/outfit";
import {Inter_700Bold,Inter_500Medium} from '@expo-google-fonts/inter'
import {LinearGradient} from 'expo-linear-gradient'
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import CheckBox from "expo-checkbox";
import { useState } from "react";
import {Ionicons} from '@expo/vector-icons'


export default function Signup({navigation}){


    const [isChecked,setChecked]=useState(false);
    const [loadFont]=useFonts({
        Outfit_700Bold,
        Inter_700Bold,
        Outfit_400Regular,
        Inter_500Medium
    })
    if(!loadFont){
        return null;
    }

    


    return(
        <>

        <ScrollView>

          <LinearGradient colors={['#B0BFF8','#e5e8ef']} style={styles.container}>
            <Text style={styles.logo}>CARDIA</Text>
          </LinearGradient>
          
          <Text style={styles.welcometext}>Welcome To Cardia</Text>

          <Text style={{fontFamily:'Outfit_400Regular',fontSize:32,textAlign:'center',padding:60}}>Create An Account</Text>
          
          <TextInput id="username" style={styles.textinput} placeholder="Username">
            <Ionicons name="person" color={"#B0BFF8"} size={25}></Ionicons>
          </TextInput>
          <TextInput id="phone-number" style={styles.textinput} placeholder="Phone Number">
            <Ionicons name="call" color={"#B0BFF8"} size={25}></Ionicons>
          </TextInput>
          <TextInput id="password" style={styles.textinput} placeholder="Password">
            <Ionicons name="lock-closed" color={"#B0BFF8"} size={25}></Ionicons>
          </TextInput>
          <TextInput id="confirm-password" style={styles.textinput} placeholder="Confirm Password">
            <Ionicons name="lock-closed" color={"#B0BFF8"} size={25}></Ionicons>
          </TextInput>
          
          <View style={{flexDirection:"row",marginLeft:25,paddingTop:55}}>
            <CheckBox value={isChecked} onValueChange={setChecked}></CheckBox>
            <Text> I agree to the <Text style={{color:"#0051FF"}}>Terms and Conditions</Text></Text>
          </View>
          
          <TouchableOpacity style={styles.signupbutton} onPress={()=>navigation.navigate("Home")}>
            <Text style={styles.buttontext}>SIGN UP</Text>
          </TouchableOpacity>

          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',paddingTop:20,paddingBottom:70}}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Signin")}>
                <Text style={{color:"#0051FF",marginLeft:5}}>Sign In</Text>
            </TouchableOpacity>
           
          </View>
          
        </ScrollView>
        
        </>
       
    )
}


const styles=StyleSheet.create({

    container:{
        width:510,
        height:200,
        borderBottomLeftRadius:210,
        borderBottomRightRadius:210,
        marginLeft:-55
    },

  

    logo:{
        textAlign:'center',
        fontFamily:'Outfit_700Bold',
        fontSize:36,
        paddingTop:90,
        paddingRight:15
    },

    welcometext:{
        fontFamily:'Inter_700Bold',
        fontSize:36,
        textAlign:'center',
        paddingTop:55
    },

    textinput:{
        borderColor:"#DCDDE1",
        borderWidth:2,
        marginLeft:20,
        marginTop:30,
        width:350,
        borderRadius:20,
        height:50,
        paddingLeft:20,
    },
    
    signupbutton:{
        backgroundColor:"#B0BFF8",
        width:225,
        height:45,
        borderRadius:20,
        marginLeft:85,
        marginTop:60
    },

    buttontext:{
        color:"white",
        textAlign:'center',
        paddingTop:9,
        fontFamily:'Inter_500Medium',
        fontSize:20,
    },
        
})