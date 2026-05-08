import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  InputAccessoryView,
} from "react-native";

import {
  useFonts,
  Outfit_700Bold,
  Outfit_400Regular,
} from "@expo-google-fonts/outfit";

import { Inter_700Bold, Inter_500Medium } from "@expo-google-fonts/inter";
import { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { addVehicle } from "./src/api/vehicles";

const screenWidth = Dimensions.get("window").width;
const carInputAccessoryViewID = "carInputAccessoryView";

export default function AddCar({ navigation }) {
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carYear, setCarYear] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [vinNumber, setVinNumber] = useState("");
  const [engineType, setEngineType] = useState("");
  const [currentMileage, setCurrentMileage] = useState("");
  const [loading, setLoading] = useState(false);

  const [loadFont] = useFonts({
    Outfit_700Bold,
    Outfit_400Regular,
    Inter_700Bold,
    Inter_500Medium,
  });

  function cleanText(text) {
    return text.trim();
  }

  async function handleAddCar() {
    Keyboard.dismiss();

    const brand = cleanText(carBrand);
    const model = cleanText(carModel);
    const color = cleanText(carColor);
    const year = cleanText(carYear);
    const plate = cleanText(plateNumber).toUpperCase();
    const vin = cleanText(vinNumber).toUpperCase();
    const engine = cleanText(engineType);
    const mileage = cleanText(currentMileage);

    if (
      !brand ||
      !model ||
      !color ||
      !year ||
      !plate ||
      !vin ||
      !engine ||
      !mileage
    ) {
      Alert.alert("Missing fields", "Please fill all car details.");
      return;
    }

    const currentYear = new Date().getFullYear();
    const numericYear = Number(year);

    if (!/^\d{4}$/.test(year)) {
      Alert.alert("Invalid year", "Please enter a valid 4 digit year.");
      return;
    }

    if (numericYear < 1980 || numericYear > currentYear + 1) {
      Alert.alert(
        "Invalid year",
        `Car year must be between 1980 and ${currentYear + 1}.`
      );
      return;
    }

    if (plate.length < 3) {
      Alert.alert(
        "Invalid plate number",
        "Plate number must be at least 3 characters."
      );
      return;
    }

    if (vin.length !== 17) {
      Alert.alert("Invalid VIN", "VIN number must be exactly 17 characters.");
      return;
    }

    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
      Alert.alert(
        "Invalid VIN",
        "VIN can only contain letters and numbers. It cannot contain I, O, or Q."
      );
      return;
    }

    const numericMileage = Number(mileage);

    if (isNaN(numericMileage) || numericMileage < 0) {
      Alert.alert("Invalid mileage", "Current mileage must be a valid number.");
      return;
    }

    try {
      setLoading(true);

      const vehicleData = {
        brand,
        model,
        color,
        year: numericYear,
        plate_number: plate,
        vin,
        engine_type: engine,
        current_mileage: numericMileage,
      };

      console.log("Sending vehicle data:", vehicleData);

      const data = await addVehicle(vehicleData);

      console.log("Vehicle added:", data.vehicle);

      Alert.alert("Success", "Car added successfully.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("MyCars"),
        },
      ]);
    } catch (error) {
      console.log("Add car error:", error);
      Alert.alert("Add car failed", error.message);
    } finally {
      setLoading(false);
    }
  }

  if (!loadFont) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.mainScreen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.screen}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                inputAccessoryViewID={
                  Platform.OS === "ios" ? carInputAccessoryViewID : undefined
                }
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
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                inputAccessoryViewID={
                  Platform.OS === "ios" ? carInputAccessoryViewID : undefined
                }
              />
            </View>

            <View style={styles.inputBox}>
              <Ionicons
                name="color-palette-outline"
                color="#cfd2db"
                size={23}
                style={styles.icon}
              />

              <TextInput
                style={styles.textinput}
                placeholder="Car Color"
                placeholderTextColor="#cfd2db"
                value={carColor}
                onChangeText={setCarColor}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                inputAccessoryViewID={
                  Platform.OS === "ios" ? carInputAccessoryViewID : undefined
                }
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
                keyboardType="number-pad"
                value={carYear}
                maxLength={4}
                onChangeText={(text) =>
                  setCarYear(text.replace(/[^0-9]/g, "").slice(0, 4))
                }
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                inputAccessoryViewID={
                  Platform.OS === "ios" ? carInputAccessoryViewID : undefined
                }
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
                autoCapitalize="characters"
                onChangeText={(text) => setPlateNumber(text.toUpperCase())}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                inputAccessoryViewID={
                  Platform.OS === "ios" ? carInputAccessoryViewID : undefined
                }
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
                autoCapitalize="characters"
                maxLength={17}
                onChangeText={(text) =>
                  setVinNumber(
                    text
                      .replace(/[^a-zA-Z0-9]/g, "")
                      .toUpperCase()
                      .slice(0, 17)
                  )
                }
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                inputAccessoryViewID={
                  Platform.OS === "ios" ? carInputAccessoryViewID : undefined
                }
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
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                inputAccessoryViewID={
                  Platform.OS === "ios" ? carInputAccessoryViewID : undefined
                }
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
                keyboardType="number-pad"
                value={currentMileage}
                onChangeText={(text) =>
                  setCurrentMileage(text.replace(/[^0-9]/g, ""))
                }
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                inputAccessoryViewID={
                  Platform.OS === "ios" ? carInputAccessoryViewID : undefined
                }
              />
            </View>
          </View>

          {Platform.OS === "ios" && (
            <InputAccessoryView nativeID={carInputAccessoryViewID}>
              <View style={styles.keyboardToolbar}>
                <TouchableOpacity onPress={Keyboard.dismiss}>
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              </View>
            </InputAccessoryView>
          )}

          <TouchableOpacity
            style={[styles.addButton, loading && styles.buttonDisabled]}
            onPress={handleAddCar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text style={styles.addButtonText}>Add Car</Text>
                <Ionicons name="arrow-forward" color="white" size={25} />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              navigation.goBack();
            }}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: "#e9eefc",
  },

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

  buttonDisabled: {
    opacity: 0.7,
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

  keyboardToolbar: {
    height: 44,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 18,
    borderTopWidth: 1,
    borderTopColor: "#dcdcdc",
  },

  doneText: {
    color: "#2D7EEB",
    fontSize: 17,
    fontWeight: "600",
  },
});