import * as React from "react";
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
import TextMedium from "../components/TextMedium";
import TextSemiBold from "../components/TextSemiBold";
import { Ionicons } from "@expo/vector-icons";
import { Colours } from "../constants/colours.js";
import * as Font from "expo-font";
import Modal from "react-native-modal";
import VerifyForForgotScreen from "./VerifyForForgotScreen";

import { AuthContext } from "../AuthContext";

let customFonts = {
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
};

// NOTE: Login button currently justified to top
export default class LoginScreen extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      email: "",
      password: "",
      hidePassword: true,
      visibleModal: 0,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();

    console.log(this.context);
  }

  getIcon = () => {
    if (this.state.hidePassword) {
      return <Ionicons name="md-eye-off" size={24} color={Colours.tint} />;
    } else {
      return <Ionicons name="md-eye" size={24} color={Colours.tint} />;
    }
  };

  signIn = () => {
    // TODO: Remove after testing
    console.log("Signin with" + this.state.email.toLowerCase());
    console.log(this.context);
    this.context.authContext.signIn({
      email: this.state.email,
      password: this.state.password,
    });
  };

  // TODO: add resetPasswordScreen as modal
  onClickForget = () => {
    this.setState({
      visibleModal: 1,
    });
  };

  closeModal = () => {
    this.setState({
      visibleModal: 0,
    });
  };

  render() {
    return (
      <View
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
          flex: 1,
          backgroundColor: Colours.screenBackground,
        }}
      >
        <ScrollView
          styles={styles.container}
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
              source={require("../assets/wasteless-logo.png")}
              style={{ height: 83, width: 100, marginTop: 50 }}
            />
            <TextSemiBold style={styles.header} text={"Log In Below"} />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFormat}
                placeholder="Email"
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFormat}
                placeholder="Password"
                value={this.state.password}
                secureTextEntry={this.state.hidePassword}
                textContentType={"password"}
                onChangeText={(text) => this.setState({ password: text })}
              />
              <TouchableOpacity
                style={{ width: 24, height: 35, justifyContent: "center" }}
                onPress={() =>
                  this.setState({ hidePassword: !this.state.hidePassword })
                }
              >
                {this.getIcon()}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => this.signIn()}
            >
              <TextMedium style={styles.confirmText} text={"Sign In"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onClickForget}>
              <TextMedium
                style={[styles.confirmText, { color: Colours.notice }]}
                text={"Forgot your password?"}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          isVisible={this.state.visibleModal === 1}
          style={styles.bottomModal}
          avoidKeyboard={false}
        >
          {
            <View style={styles.modal}>
              <VerifyForForgotScreen onCancel={this.closeModal} />
            </View>
          }
        </Modal>
      </View>
    );
  }
}

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
  modal: {
    backgroundColor: Colours.screenBackground,
    borderColor: "rgba(0, 0, 0, 0.1)",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  bottomModal: {
    margin: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "absolute",
    top: 0,
  },
});
