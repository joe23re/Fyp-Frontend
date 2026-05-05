import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Logo from "./assets/logo.png";
import Background from "./assets/getstarted.png";

const screenWidth = Dimensions.get("window").width;

export default function Getstarted({navigation}) {
  return (
    <View style={styles.mainScreen}>
      <StatusBar translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={Background}
          style={styles.background}
          resizeMode="cover"
        >
          <Image source={Logo} style={styles.logo} resizeMode="contain" />

          <View style={styles.boxOne}>
            <View style={[styles.dot, { backgroundColor: "#45ff28" }]} />
            <Text style={styles.boxText}>Connect your car</Text>
          </View>

          <View style={styles.boxTwo}>
            <View style={[styles.dot, { backgroundColor: "#ff3b30" }]} />
            <Text style={styles.boxText}>Detect engine faults</Text>
          </View>

          <View style={styles.boxThree}>
            <View style={[styles.dot, { backgroundColor: "#ffff2e" }]} />
            <Text style={styles.boxText}>View live engine data</Text>
          </View>

          <Text style={styles.title}>
            Understand your Audi{"\n"}
            and Volkswagen like{"\n"}
            never before
          </Text>

          <Text style={styles.description}>
            Engine diagnostics and real-time insights designed{"\n"}
            specifically for Audi and Volkswagen vehicles.
          </Text>

          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={()=>navigation.navigate("Signup")}>
            <View style={styles.leftCircle}>
              <Ionicons name="chevron-forward" size={32} color="#d8d8d8" />
            </View>

            <Text style={styles.buttonText}>Get started</Text>

            <Ionicons
              name="chevron-forward"
              size={30}
              color="white"
              style={styles.rightArrow}
            />
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            By continuing you agree to our Terms & Privacy Policy
          </Text>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: "white",
  },

  background: {
    width: screenWidth,
    height: 960,
  },

  logo: {
    width: 110,
    height: 65,
    marginLeft: 20,
    marginTop: 40,
  },

  boxOne: {
    position: "absolute",
    top: 120,
    left: 28,
    width: 205,
    height: 42,
    borderRadius: 25,
    backgroundColor: "rgba(130, 160, 185, 0.55)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  boxTwo: {
    position: "absolute",
    top: 202,
    right: 55,
    width: 200,
    height: 42,
    borderRadius: 25,
    backgroundColor: "rgba(130, 160, 185, 0.55)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  boxThree: {
    position: "absolute",
    top: 282,
    left: 28,
    width: 205,
    height: 42,
    borderRadius: 25,
    backgroundColor: "rgba(130, 160, 185, 0.55)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  dot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    marginRight: 16,
  },

  boxText: {
    fontSize: 12,
    color: "#6f7782",
  },

  title: {
    position: "absolute",
    top: 585,
    width: "100%",
    fontSize: 30,
    fontWeight: "800",
    color: "black",
    textAlign: "center",
    lineHeight: 42,
  },

  description: {
    position: "absolute",
    top: 730,
    width: "100%",
    fontSize: 13,
    color: "#7d7d7d",
    textAlign: "center",
    lineHeight: 18,
  },

  button: {
    position: "absolute",
    top: 785,
    left: screenWidth * 0.1,
    width: screenWidth * 0.8,
    height: 68,
    borderRadius: 36,
    backgroundColor: "#006fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  leftCircle: {
    position: "absolute",
    left: 4,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },

  rightArrow: {
    position: "absolute",
    right: 20,
  },

  bottomText: {
    position: "absolute",
    top: 870,
    width: "100%",
    fontSize: 11,
    color: "#777777",
    textAlign: "center",
  },
});