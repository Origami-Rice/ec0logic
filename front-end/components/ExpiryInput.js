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

  onChangeMonth = (text) => {
    this.setState((state) => ({
      expiryDate: new Date(
        state.expiryDate.getFullYear(),
        parseInt(text) - 1,
        state.expiryDate.getDate()
      ),
    }));
  };

  onChangeDay = (text) => {
    this.setState((state) => ({
      expiryDate: new Date(
        state.expiryDate.getFullYear(),
        state.expiryDate.getMonth(),
        parseInt(text)
      ),
    }));
  };

  onChangeYear = (text) => {
    this.setState((state) => ({
      expiryDate: new Date(
        parseInt(text),
        state.expiryDate.getMonth(),
        state.expiryDate.getDate()
      ),
    }));
  };

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.viewFormat}>
          <TextInput
            style={styles.inputFormat}
            placeholder="Month"
            onChangeText={(text) => this.onChangeMonth(text)}
          />
          <TextInput
            style={styles.inputFormat}
            placeholder="Day"
            onChangeText={(text) => this.onChangeDay(text)}
          />
          <TextInput
            style={styles.inputFormat}
            placeholder="Year"
            onChangeText={(text) => this.onChangeYear(text)}
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
    width: "100%",
    height: 25,
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  inputFormat: {
    width: "25%",
    height: 25,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 11,
    padding: 5,
    fontFamily: "Montserrat_400Regular",
  },
});
