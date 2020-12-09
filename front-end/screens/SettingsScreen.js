import * as React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import TextRegular from "../components/TextRegular";
import TextMedium from "../components/TextMedium";
import TextSemiBold from "../components/TextSemiBold";
import { Colours } from "../constants/colours.js";
import * as Font from "expo-font";

import { AuthContext } from '../AuthContext';

let customFonts = {
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
};

export default class SettingsScreen extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      newEmail: "",
      newPassword: "",
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  currentPasswordInput = () => {
    if (this.state.newEmail || this.state.newPassword) {
      return (
        <View style={{ width: "100%", alignItems: "center" }}>
          <TextRegular style={styles.label} text={"Current Password:"} />
          <TextInput
            style={styles.inputFormat}
            placeholder="********"
            secureTextEntry={true}
            value={this.state.name}
            onChangeText={(text) => this.setState({ newPassword: text })}
          />
        </View>
      );
    }
  };

  confirmChangesButton = () => {
    if (this.state.newEmail || this.state.newPassword) {
      return (
        <TouchableOpacity style={styles.confirmButton}>
          <TextMedium style={styles.confirmText} text={"Confirm Changes"} />
        </TouchableOpacity>
      );
    }
  };

  signOut = () => {
    console.log("signout pressed");
    this.context.signOut();

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "flex-start", flex: 0, marginTop: 5 }}>
          <View style={[styles.rowContainer, { justifyContent: "flex-start" }]}>
            <TextSemiBold style={styles.title} text={"Settings"} />
            <View style={{ justifyContent: "flex-end", flex: 1 }}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={this.props.onCancel}
              >
                <TextRegular style={styles.cancelText} text={"x"} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.divider, { marginBottom: 20 }]}></View>
          <View
            style={{
              justifyContent: "center",
              backgroundColor: Colours.screenBackground,
              alignItems: "center",
              flex: 0,
            }}
          >
            <TextRegular
              style={[styles.label, { marginTop: 0 }]}
              text={"Update Email:"}
            />
            <TextInput
              style={styles.inputFormat}
              placeholder="sample@email.com"
              value={this.state.name}
              onChangeText={(text) => this.setState({ newEmail: text })}
            />
            <TextRegular style={styles.label} text={"Update Password:"} />
            <TextInput
              style={styles.inputFormat}
              placeholder="********"
              secureTextEntry={true}
              value={this.state.name}
              onChangeText={(text) => this.setState({ newPassword: text })}
            />
            {this.currentPasswordInput()}
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          {this.confirmChangesButton()}
          <TouchableOpacity
            style={[
              styles.confirmButton,
              { marginBottom: Dimensions.get("window").height * 0.1 },
            ]}
            onPress={this.signOut}
          >
            <TextMedium style={styles.confirmText} text={"Log Out"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: "95%",
    alignSelf: "center",
    backgroundColor: Colours.divider,
  },
  container: {
    flex: 1,
    padding: 8,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: Colours.screenBackground,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  rowContainer: {
    flexDirection: "row",
    padding: 8,
    marginVertical: 5,
  },
  title: {
    fontSize: 34,
    color: Colours.tint,
    textAlign: "center",
    alignSelf: "center",
  },
  label: {
    width: "80%",
    fontSize: 14,
    color: Colours.tint,
    textAlign: "left",
    margin: 10,
    marginBottom: 5,
  },
  inputFormat: {
    width: "80%",
    height: 45,
    backgroundColor: Colours.borderedComponentFill,
    borderColor: Colours.tint,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    color: Colours.tint,
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    marginTop: 5,
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
  },
  confirmText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    color: Colours.tint,
  },
  confirmButton: {
    width: 148,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: Colours.filledButton,
    marginVertical: 15,
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
  },
  cancelText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    color: Colours.tint,
  },
  cancelButton: {
    width: 37,
    height: 37,
    borderRadius: 37,
    borderWidth: 1,
    borderColor: Colours.tint,
    justifyContent: "center",
    alignSelf: "flex-end",
    backgroundColor: Colours.borderedComponentFill,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0, .5)",
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
