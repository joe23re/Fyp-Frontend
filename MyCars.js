import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";

import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import {
  getVehicles,
  deleteVehicle,
  saveSelectedVehicle,
  getSelectedVehicle,
  removeSelectedVehicle,
} from "./src/api/vehicles";

const screenWidth = Dimensions.get("window").width;

export default function MyCars({ navigation }) {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadVehicles();
    }, [])
  );

  async function loadVehicles() {
    try {
      setLoading(true);

      const vehiclesData = await getVehicles();
      const selected = await getSelectedVehicle();

      setVehicles(vehiclesData || []);

      if (selected && vehiclesData) {
        const stillExists = vehiclesData.find((car) => car.id === selected.id);

        if (stillExists) {
          setSelectedVehicleId(selected.id);
        } else {
          await removeSelectedVehicle();
          setSelectedVehicleId(null);
        }
      } else {
        setSelectedVehicleId(null);
      }
    } catch (error) {
      console.log("Load vehicles error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectVehicle(vehicle) {
    try {
      await saveSelectedVehicle(vehicle);
      setSelectedVehicleId(vehicle.id);
      Alert.alert("Selected", `${vehicle.brand} ${vehicle.model} selected.`);
    } catch (error) {
      console.log("Select vehicle error:", error);
      Alert.alert("Error", "Could not select this car.");
    }
  }

  function handleDeleteVehicle(vehicle) {
    Alert.alert(
      "Delete Car",
      `Are you sure you want to delete ${vehicle.brand} ${vehicle.model}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteVehicle(vehicle.id);

              const selected = await getSelectedVehicle();

              if (selected && selected.id === vehicle.id) {
                await removeSelectedVehicle();
                setSelectedVehicleId(null);
              }

              setVehicles((oldVehicles) =>
                oldVehicles.filter((car) => car.id !== vehicle.id)
              );
            } catch (error) {
              console.log("Delete vehicle error:", error);
              Alert.alert("Delete failed", error.message);
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.mainScreen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>My Cars</Text>
          <Text style={styles.subtitle}>Manage and track your vehicles</Text>

          {loading ? (
            <ActivityIndicator
              color="#2D7EEB"
              size="large"
              style={{ marginTop: 50 }}
            />
          ) : (
            <>
              {vehicles.map((vehicle) => {
                const isSelected = selectedVehicleId === vehicle.id;

                return (
                  <TouchableOpacity
                    key={vehicle.id}
                    style={[
                      styles.carCard,
                      isSelected && styles.selectedCarCard,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => handleSelectVehicle(vehicle)}
                  >
                    <View style={styles.carInfo}>
                      <Text style={styles.carName}>
                        {vehicle.brand} {vehicle.model}
                      </Text>

                      <Text style={styles.plateText}>
                        Plate number: {vehicle.plate_number}
                      </Text>

                      <TouchableOpacity
                      style={styles.checkButton}
                      onPress={(event) => {
                        event.stopPropagation();
                        navigation.navigate("CarInformation", {
                        vehicle,
                    });
                    }}>
                        <Text style={styles.checkButtonText}>Check Car Info</Text>
                        </TouchableOpacity>
                        
                    </View>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteVehicle(vehicle)}
                    >
                      <Ionicons name="trash" size={24} color="#ff2d2d" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}

              <View style={styles.addCard}>
                <View>
                  <Text style={styles.addTitle}>Add another car</Text>
                  <Text style={styles.addPlate}>Plate number........</Text>
                </View>

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate("AddCar")}
                >
                  <Text style={styles.addButtonText}>ADD YOUR CAR</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home" size={21} color="black" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Diagnose")}
        >
          <MaterialIcons name="manage-search" size={22} color="black" />
          <Text style={styles.navText}>Diagnose</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="car" size={18} color="#006fff" />
          <Text style={styles.activeNavText}>Cars</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person" size={20} color="black" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: "#f7f8fc",
  },

  content: {
    paddingTop: 45,
    paddingHorizontal: 24,
    paddingBottom: 95,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "black",
  },

  subtitle: {
    marginTop: 15,
    fontSize: 14,
    color: "#a8a8a8",
  },

  carCard: {
    width: screenWidth - 120,
    minHeight: 118,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    marginTop: 30,
    marginLeft: 42,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  selectedCarCard: {
    borderColor: "#2D7EEB",
    borderWidth: 2,
  },

  carInfo: {
    flex: 1,
    paddingRight: 20,
  },

  carName: {
    fontSize: 17,
    fontWeight: "800",
    color: "black",
  },

  plateText: {
    marginTop: 10,
    fontSize: 13,
    color: "#9f9f9f",
    fontWeight: "500",
  },

  checkButton: {
    width: 118,
    height: 34,
    borderRadius: 5,
    backgroundColor: "#2D7EEB",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },

  checkButtonText: {
    color: "white",
    fontSize: 11,
    fontWeight: "800",
  },

  deleteButton: {
    position: "absolute",
    right: -22,
    top: 36,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },

  addCard: {
    width: screenWidth - 120,
    minHeight: 125,
    backgroundColor: "white",
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    marginTop: 42,
    marginLeft: 42,
    padding: 17,
  },

  addTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "black",
  },

  addPlate: {
    marginTop: 20,
    fontSize: 12,
    color: "#b6b6b6",
    fontWeight: "500",
  },

  addButton: {
    position: "absolute",
    right: 15,
    bottom: 17,
    width: 120,
    height: 36,
    borderWidth: 2,
    borderColor: "#b8c7ff",
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "#9aadff",
    fontSize: 12,
    fontWeight: "900",
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 62,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    color: "black",
    fontSize: 10,
    marginTop: 4,
    fontWeight: "600",
  },

  activeNavText: {
    color: "#006fff",
    fontSize: 10,
    marginTop: 4,
    fontWeight: "700",
  },
});