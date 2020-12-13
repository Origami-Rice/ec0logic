import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import TextRegular from "../components/TextRegular";
import TextMedium from "../components/TextMedium";
import TextSemiBold from "../components/TextSemiBold";
import { Ionicons } from "@expo/vector-icons";
import { Colours } from "../constants/colours.js";
import { AuthContext } from '../AuthContext';

export default function SignupScreen(props) {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [securityQuestion, setSecurityQuestion] = React.useState("");
  const [securityAnswer, setSecurityAnswer] = React.useState("");

  const { authContext } = React.useContext(AuthContext);

  const getIcon = (flag) => {
    if (flag) {
      return <Ionicons name="md-eye-off" size={24} color={Colours.tint} />;
    } else {
      return <Ionicons name="md-eye" size={24} color={Colours.tint} />;
    }
  };

  const verifyInfo = () => {
    if (email.length < 5 || !email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid email');
    } else if (firstName.length < 2 || lastName.length < 2) {
      alert('Please enter a valid name');
    } else if (password.length < 6) {
      alert('Password must be at least 6 characters')
    } else if (password !== confirmPassword) {
      alert('Passwords do not match')
    } else if (securityQuestion.trim().length < 1) {
      alert('Security Question cannot be blank');
    } else if (securityAnswer.trim().length < 6) {
      alert('Security answer must be at least 6 characters.')
    } else {
      authContext.signUp({ 
        email, firstName, lastName, password, 
        securityQuestion, securityAnswer });
    }
  }

  return (
    <View
      style={{
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        flex: 1,
      }}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View
          style={{
            justifyContent: "flex-start",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/wasteless-logo.png")}
            style={{ height: 83, width: 100, marginTop: 50 }}
          />
          <TextSemiBold style={styles.header} text={"Sign Up Below"} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputFormat}
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
                placeholder="Last Name"
                onChangeText={setLastName}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputFormat}
              placeholder="Password"
              secureTextEntry={showPassword}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={{ width: 24, height: 35, justifyContent: "center" }}
              onPress={() => setShowPassword(!showPassword)}
            >
              {getIcon(showPassword)}
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputFormat}
              placeholder="Confirm Password"
              secureTextEntry={showConfirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={{ width: 24, height: 35, justifyContent: "center" }}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {getIcon(showConfirmPassword)}
            </TouchableOpacity>
          </View>
          <TextRegular
            style={styles.terms}
            text={"The security question and answer will be used" 
            + "\n to reset your password if you ever forget it."}
          />
          <View style={styles.inputContainer}> 
            <TextInput
              style={styles.inputFormat}
              placeholder="Security Question"
              onChangeText={setSecurityQuestion}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputFormat}
              placeholder="Security Answer"
              onChangeText={setSecurityAnswer}
            />
          </View>
          <TextRegular
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
    </View>
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
    backgroundColor: Colours.screenBackground,
  },
  contentContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    fontSize: 28,
    color: Colours.tint,
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
    backgroundColor: Colours.borderedComponentFill,
    borderColor: Colours.tint,
    borderBottomWidth: 1,
    flex: 0,
    marginVertical: 10,
  },
  inputFormat: {
    width: Dimensions.get("window").width * 0.8 - 24,
    height: 31,
    fontSize: 14,
    color: Colours.tint,
    padding: 5,
    paddingLeft: 10,
    marginVertical: 10,
    textAlign: "left",
    fontFamily: "Montserrat_500Medium",
    zIndex: 1,
  },
  terms: {
    fontSize: 14,
    color: Colours.tint,
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: 25,
  },
  confirmText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    color: Colours.tint,
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
