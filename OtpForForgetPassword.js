import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
  ActivityIndicator,
  InputAccessoryView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import verificationcode from "./assets/verification code.png";

import { verifyForgotPasswordCode } from "./src/api/forgotPassword";

const otpInputAccessoryViewID = "otpInputAccessoryView";

export default function OtpForForgetPassword({ navigation, route }) {
  const phoneNumber = route?.params?.phoneNumber || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  function handleCodeChange(text) {
    const onlyDigits = text.replace(/[^0-9]/g, "").slice(0, 4);
    setCode(onlyDigits);

    if (onlyDigits.length === 4) {
      Keyboard.dismiss();
    }
  }

  async function handleVerifyCode() {
    Keyboard.dismiss();

    if (code.length !== 4) {
      Alert.alert("Missing code", "Please enter the 4 digit code.");
      return;
    }

    try {
      setLoading(true);

      const data = await verifyForgotPasswordCode(phoneNumber, code);

      console.log("Verified code:", data);

      Alert.alert("Success", "Code verified successfully.");

      navigation.navigate("ResetPassword", {
        phoneNumber,
        code,
      });
    } catch (error) {
      console.log("Verify code error:", error);
      Alert.alert("Verification failed", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.mainScreen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            Keyboard.dismiss();
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-outline" size={22} color="#333" />
          <Text style={styles.backText}>Verification Code</Text>
        </TouchableOpacity>

        <Image source={verificationcode} style={styles.verificationImage} />

        <Text style={styles.infoText}>
          Please enter the 4 digit code{"\n"}for:{" "}
          <Text style={styles.phoneText}>{phoneNumber}</Text>
        </Text>

        <View style={styles.codeContainer}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              value={code[index] || ""}
              editable={index === code.length}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              returnKeyType="done"
              blurOnSubmit={true}
              onChangeText={(text) => {
                const newCode =
                  code.slice(0, index) +
                  text.replace(/[^0-9]/g, "") +
                  code.slice(index + 1);

                handleCodeChange(newCode);
              }}
              onFocus={() => {
                if (index > code.length) {
                  Keyboard.dismiss();
                }
              }}
              onSubmitEditing={Keyboard.dismiss}
              inputAccessoryViewID={
                Platform.OS === "ios" ? otpInputAccessoryViewID : undefined
              }
            />
          ))}
        </View>

        {Platform.OS === "ios" && (
          <InputAccessoryView nativeID={otpInputAccessoryViewID}>
            <View style={styles.keyboardToolbar}>
              <TouchableOpacity onPress={Keyboard.dismiss}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        )}

        <TouchableOpacity
          style={[styles.verifyButton, loading && styles.buttonDisabled]}
          onPress={handleVerifyCode}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify Code</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: "white",
  },

  backButton: {
    marginTop: 50,
    marginLeft: 16,
    width: 170,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#DCDDE1",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },

  backText: {
    marginLeft: 10,
    fontSize: 13,
    color: "#4d4d4d",
  },

  verificationImage: {
    width: 330,
    height: 260,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 70,
  },

  infoText: {
    marginTop: 35,
    textAlign: "center",
    fontSize: 21,
    lineHeight: 28,
    color: "#8A8F93",
    fontWeight: "700",
  },

  phoneText: {
    color: "#2D7EEB",
  },

  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 21,
    marginTop: 58,
  },

  codeInput: {
    width: 62,
    height: 58,
    borderWidth: 1,
    borderColor: "#DCDDE1",
    borderRadius: 8,
    fontSize: 31,
    color: "black",
    backgroundColor: "white",
  },

  verifyButton: {
    backgroundColor: "#2D7EEB",
    width: 310,
    height: 52,
    borderRadius: 16,
    alignSelf: "center",
    marginTop: 96,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  verifyButtonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
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