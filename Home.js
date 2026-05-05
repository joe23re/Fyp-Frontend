import { View,Text, StyleSheet, Button } from "react-native"


export default function Home({navigation}){
    return(
        <View>
            <Text style={styles.text}>Hello this is the Homepage</Text>
            <Button title="Go To Signin" onPress={()=>navigation.navigate('Signin')}></Button>
            <Button title="Go To Signin" onPress={()=>navigation.navigate('logoscreen')}></Button>
        </View>
    )
}


const styles=StyleSheet.create({
    text:{
        textAlign:'center',
         margin:70
    }
    
})