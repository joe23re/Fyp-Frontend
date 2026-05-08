import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";

import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { getAuthUser, logout } from "./src/api/auth";

const screenWidth = Dimensions.get("window").width;

export default function Profile({ navigation }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await getAuthUser();

        if (user && user.username) {
          setUsername(user.username);
        }
      } catch (error) {
        console.log("Profile load user error:", error);
      }
    }

    loadUser();
  }, []);

  function handleSignOut() {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            navigation.replace("Signin");
          } catch (error) {
            console.log("Logout error:", error);
            Alert.alert("Error", "Could not sign out. Please try again.");
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.mainScreen}>
      <StatusBar barStyle="dark-content" backgroundColor="#dce4ff" />

      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>
              {username ? username.charAt(0).toUpperCase() : "U"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Ionicons name="pencil" size={15} color="#8fa7ff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.username}>{username || "User"}</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("AccountInformation")}
        >
          <View style={styles.menuLeft}>
            <View style={styles.menuIconBox}>
              <Ionicons name="person" size={23} color="#9aadff" />
            </View>

            <Text style={styles.menuText}>Account Information</Text>
          </View>

          <Ionicons name="chevron-forward" size={24} color="#d2d2d2" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("MyCars")}
        >
          <View style={styles.menuLeft}>
            <View style={styles.menuIconBox}>
              <Ionicons name="car-sport-outline" size={24} color="#9aadff" />
            </View>

            <Text style={styles.menuText}>My Cars</Text>
          </View>

          <Ionicons name="chevron-forward" size={24} color="#d2d2d2" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
          <View style={styles.menuLeft}>
            <View style={styles.menuIconBox}>
              <Ionicons name="log-out-outline" size={25} color="#9aadff" />
            </View>

            <Text style={styles.menuText}>Sign Out</Text>
          </View>

          <Ionicons name="chevron-forward" size={24} color="#d2d2d2" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home" size={22} color="black" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Diagnose")}
        >
          <MaterialIcons name="manage-search" size={23} color="black" />
          <Text style={styles.navText}>Diagnose</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("MyCars")}
        >
          <FontAwesome5 name="car" size={18} color="black" />
          <Text style={styles.navText}>Cars</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={21} color="#006fff" />
          <Text style={styles.activeNavText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    width: screenWidth,
    height: 250,
    backgroundColor: "#dce4ff",
    borderBottomLeftRadius: 175,
    borderBottomRightRadius: 175,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 22,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#7f9cff",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarLetter: {
    color: "white",
    fontSize: 38,
    fontWeight: "800",
  },

  editButton: {
    position: "absolute",
    right: -2,
    bottom: 5,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  username: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: "800",
    color: "black",
  },

  content: {
    marginTop: 62,
    alignItems: "center",
  },

  menuItem: {
    width: screenWidth - 58,
    height: 48,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#dddddd",
    backgroundColor: "#fffdfd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 13,
    marginBottom: 34,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuIconBox: {
    width: 45,
    height: 45,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#d8def5",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -1,
    marginRight: 14,
  },

  menuText: {
    fontSize: 15,
    color: "#222222",
    fontWeight: "400",
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