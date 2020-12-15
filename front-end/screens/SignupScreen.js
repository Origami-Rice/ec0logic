import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import TextMedium from "../components/TextMedium";
import TextSemiBold from "../components/TextSemiBold";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colours } from "../constants/colours.js";
import { AuthContext } from "../AuthContext";

export default function SignupScreen(props) {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [hidePassword, setHidePassword] = React.useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = React.useState(true);
  const [securityQuestion, setSecurityQuestion] = React.useState("");
  const [securityAnswer, setSecurityAnswer] = React.useState("");

  const { authContext } = React.useContext(AuthContext);

  const getIcon = (flag) => {
    if (flag) {
      return (
        <Ionicons
          name="md-eye-off"
          size={24}
          color="#ffffff"
          style={{ alignSelf: "center" }}
        />
      );
    } else {
      return (
        <Ionicons
          name="md-eye"
          size={24}
          color="#ffffff"
          style={{ alignSelf: "center" }}
        />
      );
    }
  };

  const verifyInfo = () => {
    if (email.length < 5 || !email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email");
    } else if (firstName.length < 2 || lastName.length < 2) {
      alert("Please enter a valid name");
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else if (securityQuestion.trim().length < 1) {
      alert("Security Question cannot be blank");
    } else if (securityAnswer.trim().length < 6) {
      alert("Security answer must be at least 6 characters.");
    } else {
      authContext.signUp({
        email,
        firstName,
        lastName,
        password,
        securityQuestion,
        securityAnswer,
      });
    }
  };

  return (
    <ImageBackground
      source={require("../assets/green-background.png")}
      style={{
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
          flex: 1,
        }}
        behavior={Platform.OS == "ios" ? "padding" : null}
        enabled={true}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View
            style={{
              justifyContent: "flex-start",
              flex: 1,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/wasteless-logo-white.png")}
              style={{ height: 83, width: 100, marginTop: 50 }}
            />
            <TextSemiBold style={styles.header} text={"Sign Up Below"} />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFormat}
                placeholderTextColor="#dadbd4"
                placeholder="Email"
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.namesInputContainer}>
              <View
                style={[
                  styles.inputContainer,
                  { width: Dimensions.get("window").width * 0.35 },
                ]}
              >
                <TextInput
                  style={[
                    styles.inputFormat,
                    { width: Dimensions.get("window").width * 0.35 },
                  ]}
                  placeholderTextColor="#dadbd4"
                  placeholder="First Name"
                  onChangeText={setFirstName}
                />
              </View>
              <View
                style={[
                  styles.inputContainer,
                  { width: Dimensions.get("window").width * 0.35 },
                ]}
              >
                <TextInput
                  style={[
                    styles.inputFormat,
                    { width: Dimensions.get("window").width * 0.35 },
                  ]}
                  placeholderTextColor="#dadbd4"
                  placeholder="Last Name"
                  onChangeText={setLastName}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFormat}
                placeholderTextColor="#dadbd4"
                placeholder="Password"
                secureTextEntry={hidePassword}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={{ width: 24, height: 35, justifyContent: "center" }}
                onPress={() => setHidePassword(!hidePassword)}
              >
                {getIcon(hidePassword)}
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFormat}
                placeholderTextColor="#dadbd4"
                placeholder="Confirm Password"
                secureTextEntry={hideConfirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={{ width: 24, height: 35, justifyContent: "center" }}
                onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
              >
                {getIcon(hideConfirmPassword)}
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFormat}
                placeholderTextColor="#dadbd4"
                placeholder="Security Question"
                onChangeText={setSecurityQuestion}
              />
              <TouchableOpacity
                style={{ width: 24, height: 35, justifyContent: "center" }}
                onPress={() =>
                  alert(
                    "The security question and answer will be used to reset your password if you ever forget it."
                  )
                }
              >
                <MaterialIcons
                  name="info-outline"
                  size={24}
                  color="#ffffff"
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFormat}
                placeholderTextColor="#dadbd4"
                placeholder="Security Answer"
                onChangeText={setSecurityAnswer}
              />
            </View>
            <TextMedium
              style={styles.terms}
              text={"By signing up, you agree to our terms and conditions."}
            />
          </View>
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => verifyInfo()}
            >
              <TextMedium style={styles.confirmText} text={"Sign Up"} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

SignupScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    padding: 8,
    paddingBottom: 0,
    flex: 1,
    flexDirection: "column",
    zIndex: 1,
  },
  contentContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    fontSize: 28,
    color: "#ffffff",
    margin: 30,
    marginTop: 15,
  },
  namesInputContainer: {
    width: Dimensions.get("window").width * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  inputContainer: {
    width: Dimensions.get("window").width * 0.8,
    height: 35,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#ffffff",
    borderBottomWidth: 1,
    flex: 0,
    marginVertical: 10,
  },
  inputFormat: {
    width: Dimensions.get("window").width * 0.8 - 24,
    height: 31,
    fontSize: 14,
    color: "#ffffff",
    padding: 5,
    paddingLeft: 10,
    marginVertical: 10,
    textAlign: "left",
    fontFamily: "Montserrat_500Medium",
    zIndex: 1,
  },
  terms: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: 25,
  },
  confirmText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    color: Colours.filledButtonText,
    zIndex: 1,
  },
  confirmButton: {
    width: 148,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: Colours.filledButton,
    marginVertical: 30,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0, .5)",
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
    zIndex: 1,
  },
});
