import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";

import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import Logo from "./assets/logo1.png";

const screenWidth = Dimensions.get("window").width;

export default function Signup({ navigation }) {
  const [checked, setChecked] = useState(false);
  const [logoReady, setLogoReady] = useState(false);

  useEffect(() => {
    async function loadLogo() {
      await Asset.loadAsync(Logo);
      setLogoReady(true);
    }

    loadLogo();
  }, []);

  if (!logoReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.mainScreen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.page}>
          <View style={styles.topBox}>
            <Image source={Logo} style={styles.logo} resizeMode="stretch" />
          </View>

          <Text style={styles.bigText}>Welcome To VAGDIAG</Text>

          <Text style={styles.smallTitle}>Create Account</Text>

          <View style={styles.formBox}>
            <View style={styles.inputBox}>
              <Ionicons
                name="person"
                size={18}
                color="#b8c7ff"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#c5c8d3"
              />
            </View>

            <View style={styles.inputBox}>
              <Ionicons
                name="call"
                size={18}
                color="#b8c7ff"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#c5c8d3"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputBox}>
              <Ionicons
                name="lock-closed"
                size={18}
                color="#b8c7ff"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#c5c8d3"
                secureTextEntry={true}
              />
            </View>

            <View style={styles.inputBox}>
              <Ionicons
                name="lock-closed"
                size={18}
                color="#b8c7ff"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#c5c8d3"
                secureTextEntry={true}
              />
            </View>

            <View style={styles.termsBox}>
              <TouchableOpacity
                style={[styles.checkBox, checked && styles.checkBoxActive]}
                onPress={() => setChecked(!checked)}
                activeOpacity={0.8}
              >
                {checked && (
                  <Ionicons name="checkmark" size={13} color="white" />
                )}
              </TouchableOpacity>

              <Text style={styles.termsText}>
                I agree to the{" "}
                <Text style={styles.blueText}>Terms and Conditions.</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

            <View style={styles.loginBox}>
              <Text style={styles.loginText}>Already have an account? </Text>

              <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                <Text style={styles.blueText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: "white",
  },

  scrollContent: {
    flexGrow: 1,
    backgroundColor: "white",
  },

  page: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

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

  logo: {
    width: "100%",
    height: "100%",
  },

  bigText: {
    marginTop: 39,
    fontSize: 23,
    fontWeight: "800",
    color: "black",
    textAlign: "center",
  },

  smallTitle: {
    marginTop: 24,
    fontSize: 21,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
  },

  formBox: {
    width: "100%",
    alignItems: "center",
    marginTop: 31,
  },

  inputBox: {
    width: "80%",
    height: 39,
    borderWidth: 1,
    borderColor: "#dcdfe8",
    borderRadius: 22,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 13,
  },

  inputIcon: {
    marginRight: 14,
  },

  input: {
    flex: 1,
    height: "100%",
    fontSize: 12,
    color: "#222222",
    paddingVertical: 0,
  },

  termsBox: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  checkBox: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: "#dcdfe8",
    backgroundColor: "white",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  checkBoxActive: {
    backgroundColor: "#006bff",
    borderColor: "#006bff",
  },

  termsText: {
    fontSize: 14,
    color: "black",
  },

  blueText: {
    color: "#006bff",
    fontWeight: "600",
    fontSize: 14,
  },

  button: {
    width: "58%",
    height: 45,
    borderRadius: 23,
    backgroundColor: "#aebfff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },

  loginBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    marginBottom: 40,
  },

  loginText: {
    fontSize: 15,
    color: "#c6c8d1",
  },
});