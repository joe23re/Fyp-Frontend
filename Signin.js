import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import { useFonts, Outfit_700Bold, Outfit_400Regular } from "@expo-google-fonts/outfit";
import { Inter_700Bold, Inter_500Medium } from "@expo-google-fonts/inter";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import CheckBox from "expo-checkbox";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import Logo from "./assets/logo1.png";

const screenWidth = Dimensions.get("window").width;

export default function Signin({ navigation }) {
  const [isChecked, setChecked] = useState(false);

  const [loadFont] = useFonts({
    Outfit_700Bold,
    Inter_700Bold,
    Outfit_400Regular,
    Inter_500Medium,
  });

  if (!loadFont) {
    return null;
  }

  return (
    <>
      <ScrollView>
        <View style={styles.topBox}>
          <Image source={Logo} style={styles.logoImage} resizeMode="stretch" />
        </View>

        <Text
          style={{
            fontFamily: "Outfit_400Regular",
            fontSize: 32,
            textAlign: "center",
            padding: 60,
          }}
        >
          Sign In Now
        </Text>

        <TextInput id="username" style={styles.textinput} placeholder="Username">
          <Ionicons name="person" color={"#B0BFF8"} size={25}></Ionicons>
        </TextInput>

        <TextInput id="password" style={styles.textinput} placeholder="Password">
          <Ionicons name="lock-closed" color={"#B0BFF8"} size={25}></Ionicons>
        </TextInput>

        <View style={{ flexDirection: "row", marginLeft: 25, paddingTop: 15 }}>
          <CheckBox value={isChecked} onValueChange={setChecked}></CheckBox>

          <Text style={{ marginLeft: 10 }}>Remember Me</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("PhoneNumberForForgetPassword")}
          >
            <Text style={{ color: "#0051FF", marginLeft: 100 }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signupbutton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttontext}>SIGN IN</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <Text>Don't you have an account?</Text>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: "#0051FF", marginLeft: 5 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  topBox: {
    width: screenWidth,
    height: 185,
    backgroundColor: "#eceaff",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
    overflow: "hidden",
  },

  logoImage: {
    width: "100%",
    height: "100%",
  },

  textinput: {
    borderColor: "#DCDDE1",
    borderWidth: 2,
    marginLeft: 20,
    marginTop: 30,
    width: 350,
    borderRadius: 20,
    height: 45,
    paddingLeft: 20,
  },

  signupbutton: {
    backgroundColor: "#B0BFF8",
    width: 225,
    height: 50,
    borderRadius: 20,
    marginLeft: 80,
    marginTop: 60,
  },

  buttontext: {
    color: "white",
    textAlign: "center",
    paddingTop: 12,
    fontFamily: "Inter_500Medium",
    fontSize: 20,
  },
});