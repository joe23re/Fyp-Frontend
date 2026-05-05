import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import {
  useFonts,
  Outfit_700Bold,
  Outfit_400Regular,
} from "@expo-google-fonts/outfit";

import { Inter_700Bold, Inter_500Medium } from "@expo-google-fonts/inter";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function AddCar({ navigation }) {
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [vinNumber, setVinNumber] = useState("");
  const [engineType, setEngineType] = useState("");
  const [currentMileage, setCurrentMileage] = useState("");

  const [loadFont] = useFonts({
    Outfit_700Bold,
    Outfit_400Regular,
    Inter_700Bold,
    Inter_500Medium,
  });

  if (!loadFont) {
    return null;
  }

  return (
    <>
      <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
        <Text style={styles.logo}>VAGDIAG</Text>

        <Text style={styles.title}>Add Your Car</Text>

        <Text style={styles.subtitle}>
          Enter your car details to start diagnosis
        </Text>

        <View style={styles.form}>
          <View style={styles.inputBox}>
            <Ionicons
              name="car"
              color="#cfd2db"
              size={23}
              style={styles.icon}
            />

            <TextInput
              style={styles.textinput}
              placeholder="Car Brand"
              placeholderTextColor="#cfd2db"
              value={carBrand}
              onChangeText={setCarBrand}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons
              name="car"
              color="#cfd2db"
              size={23}
              style={styles.icon}
            />

            <TextInput
              style={styles.textinput}
              placeholder="Car Model"
              placeholderTextColor="#cfd2db"
              value={carModel}
              onChangeText={setCarModel}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons
              name="calendar-outline"
              color="#cfd2db"
              size={23}
              style={styles.icon}
            />

            <TextInput
              style={styles.textinput}
              placeholder="Car Year"
              placeholderTextColor="#cfd2db"
              keyboardType="numeric"
              value={carYear}
              onChangeText={setCarYear}
            />
          </View>

          <View style={styles.inputBox}>
            <MaterialCommunityIcons
              name="dots-grid"
              color="#cfd2db"
              size={25}
              style={styles.icon}
            />

            <TextInput
              style={styles.textinput}
              placeholder="Plate Number"
              placeholderTextColor="#cfd2db"
              value={plateNumber}
              onChangeText={setPlateNumber}
            />
          </View>

          <View style={styles.inputBox}>
            <MaterialCommunityIcons
              name="dots-grid"
              color="#cfd2db"
              size={25}
              style={styles.icon}
            />

            <TextInput
              style={styles.textinput}
              placeholder="VIN Number"
              placeholderTextColor="#cfd2db"
              value={vinNumber}
              onChangeText={setVinNumber}
            />
          </View>

          <View style={styles.inputBox}>
            <MaterialCommunityIcons
              name="dots-grid"
              color="#cfd2db"
              size={25}
              style={styles.icon}
            />

            <TextInput
              style={styles.textinput}
              placeholder="Engine Type"
              placeholderTextColor="#cfd2db"
              value={engineType}
              onChangeText={setEngineType}
            />
          </View>

          <View style={styles.inputBox}>
            <MaterialCommunityIcons
              name="dots-grid"
              color="#cfd2db"
              size={25}
              style={styles.icon}
            />

            <TextInput
              style={styles.textinput}
              placeholder="Current Mileage"
              placeholderTextColor="#cfd2db"
              keyboardType="numeric"
              value={currentMileage}
              onChangeText={setCurrentMileage}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.addButtonText}>Add Car</Text>
          <Ionicons name="arrow-forward" color="white" size={25} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#e9eefc",
  },

  logo: {
    fontFamily: "Outfit_700Bold",
    fontSize: 33,
    textAlign: "center",
    marginTop: 55,
    color: "black",
  },

  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    textAlign: "center",
    marginTop: 35,
    color: "black",
  },

  subtitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
    color: "black",
  },

  form: {
    marginTop: 55,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#d6d6d6",
    borderWidth: 1,
    backgroundColor: "white",
    marginLeft: 36,
    marginTop: 17,
    width: screenWidth - 72,
    borderRadius: 18,
    height: 42,
    paddingLeft: 20,
  },

  icon: {
    marginRight: 15,
  },

  textinput: {
    flex: 1,
    height: "100%",
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: "black",
    paddingVertical: 0,
  },

  addButton: {
    backgroundColor: "#2D7EEB",
    width: screenWidth - 74,
    height: 45,
    borderRadius: 7,
    marginLeft: 37,
    marginTop: 58,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontFamily: "Inter_700Bold",
    fontSize: 23,
    marginRight: 12,
  },

  cancelText: {
    fontFamily: "Inter_500Medium",
    color: "black",
    textAlign: "center",
    fontSize: 19,
    marginTop: 22,
    marginBottom: 50,
  },
});