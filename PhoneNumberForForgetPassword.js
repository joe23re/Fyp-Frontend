import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import forgetPass from './assets/forgetpassword.avif'
import {Inter_600SemiBold,Inter_500Medium} from '@expo-google-fonts/inter'
import { useState } from "react"


export default function PhoneNumberForForgetPassword({navigation}){


    const [loadFonts]=useState({
        Inter_600SemiBold,
        Inter_500Medium
    })

    if(!loadFonts){
        return null;
    }
    return(

        <>

        <View style={{backgroundColor:"white",paddingBottom:200}}>
            <TouchableOpacity style={styles.verificationcodebutton} onPress={()=>navigation.goBack()}>
              <View style={{flexDirection:'row',marginLeft:-30,gap:20}}>
                <Ionicons style={styles.arrow} name="arrow-back-outline" size={25}></Ionicons>
                <Text style={styles.verificationcodetext}>Forgot Password</Text>
              </View>   
            </TouchableOpacity>

            <Image source={forgetPass} style={styles.verificationcodeimg}></Image>

            <Text style={styles.text}>Please enter your phone number to receive verifivation code</Text>

            <Text style={styles.labeltext}>Phone Number</Text>
            <TextInput style={styles.textinput} textAlignVertical="bottom"></TextInput>

            <TouchableOpacity style={styles.sendcodebutton} onPress={()=>navigation.navigate("OtpForForgetPassword")}>
               <Text style={styles.buttontext}>Send Code</Text>
            </TouchableOpacity>
        </View>

        
        
        
        </>
    )
}


const styles=StyleSheet.create({

    verificationcodebutton:{
        marginTop:80,
        marginLeft:10,
        paddingLeft:40,
        borderColor:"#DCDDE1",
        borderWidth:2,
        borderRadius:50,
        height:50,
        width:200
    },

    verificationcodetext:{
        textAlign:'center',
        marginTop:13
    },

    arrow:{
        paddingTop:8
    },

    verificationcodeimg:{
        width:330,
        height:340,
        paddingTop:20,
        marginLeft:25
    },

    text:{
        textAlign:'center',
        marginLeft:30,
        marginRight:30,
        fontFamily:'Inter_600SemiBold',
        fontSize:20,
        color:"#8A8F93"
    },

    labeltext:{
        marginLeft:50,
        color:"#8A8F93",
        top:68,
        right:-10,
    },

    textinput:{
        borderColor:"#DCDDE1",
        borderWidth:2,
        marginLeft:45,
        marginTop:40,
        width:300,
        borderRadius:10,
        height:75,
        paddingLeft:20,
    },

    sendcodebutton:{
        backgroundColor:"#2D7EEB",
        width:300,
        height:60,
        borderRadius:20,
        marginLeft:45,
        marginTop:60,
    },

    buttontext:{
        color:"white",
        textAlign:'center',
        paddingTop:14,
        fontFamily:'Inter_500Medium',
        fontSize:23,
    },
})