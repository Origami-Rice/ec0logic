import React from "react";
import { TextInput, View, StyleSheet, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { AppLoading } from "expo";
import * as Font from "expo-font";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
};

export default class QualityDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "0",
      unit: "Units",
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

  onChangeItem = (itemValue) => {
    this.setState({ unit: itemValue });
  };

  onChangeText = (text) => {
    this.setState({ amount: text });
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
          <View>
            <DropDownPicker
              label="Units"
              items={[
                { label: "Units", value: "Units", selected: true },
                { label: "g", value: "g" },
                { label: "mg", value: "mg" },
                { label: "kg", value: "kg" },
                { label: "oz", value: "oz" },
                { label: "ml", value: "mL" },
              ]}
              arrowStyle={styles.dropArrow}
              containerStyle={styles.dropContainer}
              itemStyle={{ justifyContent: "flex-start" }}
              selectedLabelStyle={styles.dropItem}
              labelStyle={styles.dropItem}
              onChangeItem={(item) => this.onChangeItem(item.value)}
              zIndex={5000}
            />
          </View>
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  viewFormat: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    zIndex: 5000,
  },

  dropContainer: {
    width: Dimensions.get("window").width * 0.25,
    height: 31,
    borderColor: "black",
    borderWidth: 1,
    zIndex: 5000,
  },

  dropArrow: {
    height: 19,
    flexDirection: "row",
    justifyContent: "flex-start",
    zIndex: 5000,
  },

  inputFormat: {
    width: Dimensions.get("window").width * 0.25,
    height: 31,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 1,
    fontSize: 11,
    padding: 5,
    paddingLeft: 10,
    fontFamily: "Montserrat_400Regular",
    zIndex: 5000,
  },

  dropItem: {
    fontSize: 11,
    fontFamily: "Montserrat_400Regular",
    color: "#000000",
    zIndex: 5000,
  },
});
