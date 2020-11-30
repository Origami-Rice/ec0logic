import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
};

export default class QualityDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  onSelectUnit = (unit) => {
    const { setParentUnit } = this.props;
    setParentUnit(unit);
  };

  onChangeQuantity = (amount) => {
    const { setParentQuantity } = this.props;
    setParentQuantity(amount);
  };

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.viewFormat}>
          <TextInput
            style={styles.inputFormat}
            placeholder="Amount"
            keyboardType="decimal-pad"
            returnKeyType="done"
            onChangeText={(text) => this.onChangeQuantity(text)}
          />
          <View>
            <DropDownPicker
              label="Units"
              items={[
                { label: "units", value: "units"},
                { label: "g", value: "g" },
                { label: "mg", value: "mg" },
                { label: "kg", value: "kg" },
                { label: "oz", value: "oz" },
                { label: "ml", value: "mL" },
              ]}
              defaultValue={this.props.defaultUnit || 'units'}
              arrowStyle={styles.dropArrow}
              containerStyle={styles.dropContainer}
              dropDownStyle={{ elevation: 5000 }}
              style={{ borderColor: "black", borderWidth: 1 }}
              itemStyle={{ justifyContent: "flex-start" }}
              selectedLabelStyle={styles.dropItem}
              labelStyle={styles.dropItem}
              customArrowDown={() => (
                <MaterialIcons name="expand-less" size={24} color="black" />
              )}
              customArrowUp={() => (
                <MaterialIcons name="expand-more" size={24} color="black" />
              )}
              onChangeItem={(item) => this.onSelectUnit(item.value)}
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
    ...(Platform.OS !== "android" && {
      zIndex: 5000,
    }),
  },

  dropContainer: {
    width: Dimensions.get("window").width * 0.25,
    height: 31,
  },

  dropArrow: {
    height: 24,
    flexDirection: "row",
    justifyContent: "flex-start",
    ...Platform.select({
      ios: {
        zIndex: 5000,
      },
      android: {
        elevation: 5000,
      },
    }),
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
    ...Platform.select({
      ios: {
        zIndex: 5000,
      },
      android: {
        elevation: 5000,
      },
    }),
  },

  dropItem: {
    fontSize: 11,
    fontFamily: "Montserrat_400Regular",
    color: "#000000",
    ...Platform.select({
      ios: {
        zIndex: 5000,
      },
      android: {
        elevation: 5000,
      },
    }),
  },
});
