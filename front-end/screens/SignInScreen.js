import * as React from "react";
import {
  View,
  ScrollView,
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
import { Ionicons } from "@expo/vector-icons";
import { Colours } from "../constants/colours.js";
import * as Font from "expo-font";
import Modal from "react-native-modal";
import VerifyForForgotScreen from "./VerifyForForgotScreen";

import { AuthContext } from "../AuthContext";

let customFonts = {
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
};

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
      return <Ionicons name="md-eye-off" size={24} color="#ffffff" />;
    } else {
      return <Ionicons name="md-eye" size={24} color="#ffffff" />;
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
      <ImageBackground
        source={require("../assets/green-background.png")}
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
          flex: 1,
        }}
      >
        <View
          style={{
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            flex: 1,
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
                source={require("../assets/wasteless-logo-white.png")}
                style={{ height: 83, width: 100, marginTop: 50 }}
              />
              <TextSemiBold style={styles.header} text={"Log In Below"} />
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputFormat}
                  placeholderTextColor="#dadbd4"
                  placeholder="Email"
                  value={this.state.email}
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputFormat}
                  placeholderTextColor="#dadbd4"
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
                  style={[styles.confirmText, { color: "#dadbd4" }]}
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
      </ImageBackground>
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
