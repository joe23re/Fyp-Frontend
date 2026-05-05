import { View, Text, StyleSheet, Button, TouchableOpacity,TextInput, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import resetPassword from './assets/resetpassword.jpg'
import {Inter_600SemiBold,Inter_500Medium} from '@expo-google-fonts/inter'
import { useState } from "react"



export default function ResetPassword({navigation}){

    const [loadFonts]=useState({
        Inter_600SemiBold,
        Inter_500Medium
    })

    if(!loadFonts){
        return null;
    }

    return(

        <>

        <ScrollView>

         <View style={{backgroundColor:"white",paddingBottom:200}}>
            <TouchableOpacity style={styles.resetpassbutton} onPress={()=>navigation.goBack()}>
              <View style={{flexDirection:'row',marginLeft:-30,gap:20}}>
                <Ionicons style={styles.arrow} name="arrow-back-outline" size={25}></Ionicons>
                <Text style={styles.resetpasstext}>Reset Password</Text>
              </View>   
            </TouchableOpacity>

            <Image source={resetPassword} style={styles.resetpassimg}></Image>

            <Text style={styles.text}>Please enter your phone number to receive verifivation code</Text>

            <Text style={styles.labeltext}>Password</Text>
            <TextInput style={styles.textinput} secureTextEntry={true}></TextInput>
            <Text style={styles.labeltext}>Confirm Password</Text>
            <TextInput style={styles.textinput} secureTextEntry={true}></TextInput>

            <TouchableOpacity style={styles.savepassbutton} onPress={()=>navigation.navigate("Home")}>
               <Text style={styles.buttontext}>Save Password</Text>
            </TouchableOpacity>
         </View>



        </ScrollView>

        

        
        
        
        </>
    )
}


const styles=StyleSheet.create({

    resetpassbutton:{
        marginTop:80,
        marginLeft:10,
        paddingLeft:40,
        borderColor:"#DCDDE1",
        borderWidth:2,
        borderRadius:50,
        height:50,
        width:200
    },

    resetpasstext:{
        textAlign:'center',
        marginTop:13
    },

    arrow:{
        paddingTop:8
    },

    resetpassimg:{
        width:270,
        height:340,
        paddingTop:20,
        marginLeft:55
    },

    text:{
        textAlign:'center',
        marginLeft:30,
        marginRight:30,
        marginBottom:20,
        fontFamily:'Inter_600SemiBold',
        fontSize:20,
        color:"#8A8F93"
    },

    labeltext:{
        marginLeft:50,
        color:"#8A8F93",
        top:38,
        right:-10
    },

    textinput:{
        borderColor:"#DCDDE1",
        borderWidth:2,
        marginLeft:45,
        marginTop:10,
        width:300,
        borderRadius:10,
        height:75,
        paddingLeft:20,
        textAlignVertical:'top'
    },

    savepassbutton:{
        backgroundColor:"#2D7EEB",
        width:300,
        height:60,
        borderRadius:20,
        marginLeft:45,
        marginTop:50
    },

    buttontext:{
        color:"white",
        textAlign:'center',
        paddingTop:14,
        fontFamily:'Inter_500Medium',
        fontSize:23,
    },
})