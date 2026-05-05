import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import resetPassword from "./assets/resetpassword.jpg";
import {
  Inter_600SemiBold,
  Inter_500Medium,
  useFonts,
} from "@expo-google-fonts/inter";

export default function ResetPassword({ navigation }) {
  const [loadFonts] = useFonts({
    Inter_600SemiBold,
    Inter_500Medium,
  });

  if (!loadFonts) {
    return null;
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.resetpassbutton}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.backContent}>
              <Ionicons
                style={styles.arrow}
                name="arrow-back-outline"
                size={25}
              />
              <Text style={styles.resetpasstext}>Reset Password</Text>
            </View>
          </TouchableOpacity>

          <Image source={resetPassword} style={styles.resetpassimg} />

          <Text style={styles.text}>
            Please enter your phone number to receive verification code
          </Text>

          <Text style={styles.labeltext}>Password</Text>
          <TextInput style={styles.textinput} secureTextEntry={true} />

          <Text style={styles.labeltext}>Confirm Password</Text>
          <TextInput style={styles.textinput} secureTextEntry={true} />

          <TouchableOpacity
            style={styles.savepassbutton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttontext}>Save Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingBottom: 80,
    paddingTop: 60,
  },

  resetpassbutton: {
    marginLeft: 20,
    paddingLeft: 20,
    borderColor: "#DCDDE1",
    borderWidth: 2,
    borderRadius: 50,
    height: 50,
    width: 200,
    justifyContent: "center",
  },

  backContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  resetpasstext: {
    textAlign: "center",
  },

  arrow: {},

  resetpassimg: {
    width: 270,
    height: 300,
    marginTop: 25,
    marginLeft: 55,
  },

  text: {
    textAlign: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 25,
    fontFamily: "Inter_600SemiBold",
    fontSize: 20,
    color: "#8A8F93",
  },

  labeltext: {
    marginLeft: 55,
    color: "#8A8F93",
    marginBottom: 8,
  },

  textinput: {
    borderColor: "#DCDDE1",
    borderWidth: 2,
    marginLeft: 45,
    width: 300,
    borderRadius: 10,
    height: 60,
    paddingLeft: 20,
    marginBottom: 18,
  },

  savepassbutton: {
    backgroundColor: "#2D7EEB",
    width: 300,
    height: 60,
    borderRadius: 20,
    marginLeft: 45,
    marginTop: 30,
  },

  buttontext: {
    color: "white",
    textAlign: "center",
    paddingTop: 14,
    fontFamily: "Inter_500Medium",
    fontSize: 23,
  },
});