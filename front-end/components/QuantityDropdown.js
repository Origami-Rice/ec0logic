import React from "react";
import { TextInput, View, StyleSheet, Picker } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
};

export default class AssetExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "0",
      unit: "default",
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

  onValueChange = (itemValue) => {
    this.setState({
      unit: itemValue,
    });
  };

  onChangeText = (text) => {
    this.setState({
      amount: text,
    });
  };

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.viewFormat}>
          <TextInput
            style={styles.inputFormat}
            placeholder="Amount"
            onChangeText={(text) => this.setState(text)}
          />
          <Picker
            onValueChange={(itemValue) => this.setState(itemValue)}
            style={styles.pickerFormat}
          >
            <Picker.Item label="Units" value="default" />
            <Picker.Item label="g" value="g" />
            <Picker.Item label="mg" value="mg" />
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="oz" value="oz" />
            <Picker.Item label="mL" value="mL" />
          </Picker>
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
    color: "#BDBDBD",
  },

  pickerFormat: {
    width: "25%",
    height: "25px",
    borderColor: "black",
    borderWidth: 1,
    fontFamily: "Montserrat_400Regular",
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
