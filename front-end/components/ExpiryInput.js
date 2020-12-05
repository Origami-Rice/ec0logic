import React from "react";
import { TextInput, View, StyleSheet, Dimensions } from "react-native";
import { Colours } from "../constants/colours.js";
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

const monthNames = Object.keys(months);

export default class ExpiryInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expiryDate: this.props.defaultDate,
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
    const newDate = new Date(
      this.state.expiryDate.getFullYear(),
      months[text],
      this.state.expiryDate.getDate()
    );

    this.setState({
      expiryDate: newDate,
    });
    // Send info back to parent
    const { setParentExpiry } = this.props;
    setParentExpiry(newDate);
  };

  onChangeDay = (text) => {
    const newDate = new Date(
      this.state.expiryDate.getFullYear(),
      this.state.expiryDate.getMonth(),
      parseInt(text)
    );

    this.setState({
      expiryDate: newDate,
    });
    // Send info back to parent
    const { setParentExpiry } = this.props;
    setParentExpiry(newDate);
  };

  onChangeYear = (text) => {
    const newDate = new Date(
      parseInt(text),
      this.state.expiryDate.getMonth(),
      this.state.expiryDate.getDate()
    );

    this.setState({
      expiryDate: newDate,
    });

    // Send info back to parent
    const { setParentExpiry } = this.props;
    setParentExpiry(newDate);
  };

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.viewFormat}>
          <DropDownPicker
            label="Month"
            items={[
              { label: "January", value: "January" },
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
            defaultValue={monthNames[this.state.expiryDate.getMonth()]}
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
            keyboardType="number-pad"
            value={this.state.expiryDate.getDate().toString()}
            onChangeText={(text) => this.onChangeDay(text)}
          />
          <TextInput
            style={styles.inputFormat}
            placeholder="Year"
            keyboardType="number-pad"
            onChangeText={(text) => this.onChangeYear(text)}
            value={this.state.expiryDate.getFullYear().toString()}
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
    backgroundColor: Colours.screenBackground,
    borderColor: Colours.tint,
    borderWidth: 1,
    fontSize: 11,
    padding: 5,
    paddingLeft: 10,
    fontFamily: "Montserrat_400Regular",
    color: Colours.tint,
    zIndex: 2500,
  },

  dropContainer: {
    width: Dimensions.get("window").width * 0.3,
    height: 31,
    borderColor: Colours.tint,
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
    color: Colours.tint,
    zIndex: 2500,
  },
});
