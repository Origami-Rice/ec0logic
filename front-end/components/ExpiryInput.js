import React from "react";
import { TextInput, View, StyleSheet, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { AppLoading } from "expo";
import * as Font from "expo-font";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
};

let months = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export default class ExpiryInput extends React.Component {
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
        months[text],
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
          <DropDownPicker
            label="Month"
            items={[
              { label: "January", value: "January", selected: true },
              { label: "February", value: "February" },
              { label: "March", value: "March" },
              { label: "April", value: "April" },
              { label: "May", value: "May" },
              { label: "June", value: "June" },
              { label: "July", value: "July" },
              { label: "August", value: "August" },
              { label: "September", value: "September" },
              { label: "October", value: "October" },
              { label: "November", value: "November" },
              { label: "December", value: "December" },
            ]}
            arrowStyle={styles.dropArrow}
            containerStyle={styles.dropContainer}
            itemStyle={{ justifyContent: "flex-start" }}
            selectedLabelStyle={styles.dropItem}
            labelStyle={styles.dropItem}
            onChangeItem={(item) => this.onChangeMonth(item.value)}
            zIndex={2500}
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
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    zIndex: 2500,
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
    zIndex: 2500,
  },

  dropContainer: {
    width: Dimensions.get("window").width * 0.3,
    height: 31,
    borderColor: "black",
    borderWidth: 1,
    zIndex: 2500,
  },

  dropArrow: {
    height: 19,
    flexDirection: "row",
    justifyContent: "flex-start",
    zIndex: 2500,
  },

  dropItem: {
    fontSize: 11,
    fontFamily: "Montserrat_400Regular",
    color: "#000000",
    zIndex: 2500,
  },
});
