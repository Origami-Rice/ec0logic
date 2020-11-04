import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
};

export default class AssetExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expiryDate: new Date(),
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

  // TODO: Add checks for valid input
  onChangeMonth = (text) => {
    this.setState({
      expiryDate: this.state.expiryDate.setMonth(parseInt(text) - 1),
    });
  };

  onChangeDay = (text) => {
    this.setState({
      expiryDate: this.state.expiryDate.setDate(parseInt(text)),
    });
  };

  onChangeYear = (text) => {
    this.setState({
      expiryDate: this.state.expiryDate.setFullYear(parseInt(text)),
    });
  };

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.viewFormat}>
          <TextInput
            style={styles.inputFormat}
            placeholder="Month"
            keyboardType="numeric"
            onChangeText={(text) => this.onChangeMonth(text)}
          />
          <TextInput
            style={styles.inputFormat}
            placeholder="Day"
            keyboardType="numeric"
            onChangeText={(text) => this.onChangeDay(text)}
          />
          <TextInput
            style={styles.inputFormat}
            placeholder="Year"
            keyboardType="numeric"
            onChangeText={(text) => this.setState(text)}
          />
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  viewFormat: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 11,
  },

  inputFormat: {
    width: "25%",
    height: "25px",
    borderColor: "black",
    borderWidth: 1,
    fontSize: 11,
    padding: 5,
    fontFamily: "Montserrat_400Regular",
  },
});
