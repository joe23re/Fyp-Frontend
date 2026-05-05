import {View,TouchableOpacity,Text, StyleSheet, Image, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import verificationcode from './assets/verification code.png'


export default function OtpForForgetPassword({navigation}){


    return(

        <>

        <View style={{backgroundColor:"white",paddingBottom:400}}>
            <TouchableOpacity style={styles.forgetpassbutton} onPress={()=>navigation.goBack()}>
              <View style={{flexDirection:'row',marginLeft:-30,gap:20}}>
                <Ionicons style={styles.arrow} name="arrow-back-outline" size={25}></Ionicons>
                <Text style={styles.forgetpasstext}>Verification Code</Text>
              </View>   
            </TouchableOpacity>

            <Image source={verificationcode} style={styles.forgetpassimg}></Image>

            <Text style={styles.text}>Please enter the 4 digit code sent to: <Text style={[styles.text,styles.phonenumbertext]}></Text></Text>

            <TouchableOpacity style={styles.sendcodebutton} onPress={()=>navigation.navigate("ResetPassword")}>
               <Text style={styles.buttontext}>Send Code</Text>
            </TouchableOpacity>
        </View>

        
        
        
        </>
    )
}

const styles=StyleSheet.create({

     forgetpassbutton:{
        marginTop:80,
        marginLeft:10,
        paddingLeft:40,
        borderColor:"#DCDDE1",
        borderWidth:2,
        borderRadius:50,
        height:50,
        width:200
    },

    forgetpasstext:{
        textAlign:'center',
        marginTop:13
    },

    arrow:{
        paddingTop:8
    },

    forgetpassimg:{
        width:400,
        height:340,
        paddingTop:20,
        marginLeft:-15
    },

    text:{
        textAlign:'center',
        marginLeft:35,
        marginRight:35,
        fontFamily:'Inter_600SemiBold',
        fontSize:20,
        color:"#8A8F93"
    },

    phonenumbertext:{
        color:"#2D7EEB"
    },

    textinput:{
        borderColor:"#DCDDE1",
        borderWidth:2,
        marginLeft:50,
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
        marginLeft:55,
        marginTop:60
    },

    buttontext:{
        color:"white",
        textAlign:'center',
        paddingTop:14,
        fontFamily:'Inter_500Medium',
        fontSize:23,
    },

})