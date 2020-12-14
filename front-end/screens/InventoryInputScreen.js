import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import TextRegular from "../components/TextRegular";
import TextMedium from "../components/TextMedium";
import { Colours } from "../constants/colours.js";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import QuantityDropdown from "../components/QuantityDropdown";
import DatePicker from "../components/DatePicker";
import FoodSearchScreen from "./FoodSearchScreen";

let customFonts = {
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
};

export default class InventoryInputScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryArray: [],
      name: "",
      quantity: 0,
      unitMeasure: "units",
      expiryDate: new Date(),
      visibleModal: 0,
      estimateGiven: false,
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  saveItem = () => {
    // Verify that all fields have been entered correctly
    if (this.state.name === "") {
      alert("Please enter item name.");
      return;
    }

    if (this.state.quantity === 0 || this.state.unitMeasure === "") {
      alert("Some fields have not been filled correctly. Please review.");
      return;
    }

    const newItem = {
      name: this.state.name,
      expiryDate: this.state.expiryDate,
      quantity: this.state.quantity,
      unitsOfMeasure: this.state.unitMeasure,
    };

    this.props.navigation.navigate("List", {
      screen: "Inventory",
      params: { new_item: newItem },
    });
  };

  setItemName = (value) => {
    this.setState({
      name: value,
      estimateGiven: false,
    });
  };

  setQuantity = (value) => {
    // Quality DropDown Child will set this value
    const val = parseFloat(value);
    this.setState({ quantity: val });
  };

  setUnit = (value) => {
    // QuantityDropdown component will call this function
    this.setState({
      unitMeasure: value,
    });
  };

  setExpiryDate = (value) => {
    // ExpiryDropDown component will call this
    this.setState({
      expiryDate: value,
      estimateGiven: false,
    });
  };

  setSearchedItem = (item) => {
    // Called by Food Search Screen
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + item.days);
    this.setState({
      name: item.name,
      expiryDate: expiry,
      estimateGiven: true,
    });

    this.setState({
      visibleModal: 0,
    });
  };

  displayEstimate = () => {
    if (this.state.estimateGiven) {
      return (
        <View>
          <TextMedium
            style={[styles.label, { marginTop: 25 }]}
            text={`${" "}Estimated Expiry Date: \n\n ${this.state.expiryDate.toDateString()}`}
          />
          <TextRegular
            style={styles.note}
            text={
              "This is only an estimate, select a different \n expiry date by clicking above."
            }
          />
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "flex-start",
            width: Dimensions.get("window").width,
            ...(Platform.OS !== "android" && {
              zIndex: 1,
            }),
          }}
        >
          <View style={styles.topButtonsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => this.setState({ visibleModal: 1 })}
            >
              <MaterialIcons
                name="search"
                size={18}
                color={Colours.tint}
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => this.props.navigation.goBack(null)}
            >
              <TextRegular style={styles.cancelText} text={"x"} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputFormat}
              placeholder="Enter New Food Item"
              value={this.state.name}
              onChangeText={(text) => this.setItemName(text)}
            />
            <TextMedium style={styles.label} text={"Quantity:"} />
            <QuantityDropdown
              setParentQuantity={this.setQuantity}
              setParentUnit={this.setUnit}
            ></QuantityDropdown>
            <TextMedium style={styles.label} text={"Select Expiry Date:"} />
            <DatePicker
              setParentExpiry={this.setExpiryDate}
              defaultDate={this.state.expiryDate}
            />
            {this.displayEstimate()}
          </View>
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={this.saveItem}
          >
            <TextMedium style={styles.confirmText} text={"Confirm"} />
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={this.state.visibleModal === 1}
          style={styles.bottomModal}
          avoidKeyboard={false}
        >
          {
            <View style={styles.modal}>
              <FoodSearchScreen
                setSearchItem={this.setSearchedItem}
                onCancel={() => this.setState({ visibleModal: 0 })}
              ></FoodSearchScreen>
            </View>
          }
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: Colours.screenBackground,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "absolute",
    top: 0,
    ...Platform.select({
      ios: {
        zIndex: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ...(Platform.OS !== "android" && {
      zIndex: 1,
    }),
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    margin: 25,
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
  inputFormat: {
    width: "80%",
    height: 31,
    backgroundColor: Colours.borderedComponentFill,
    borderColor: Colours.tint,
    borderBottomWidth: 1,
    fontSize: 14,
    color: Colours.tint,
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
  },
  label: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    color: Colours.tint,
    marginVertical: 5,
  },
  note: {
    width: "80%",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 12,
    marginVertical: 5,
    color: Colours.notice,
  },
  confirmText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    color: Colours.filledButtonText,
  },
  confirmButton: {
    width: 148,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: Colours.filledButton,
    margin: 40,
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
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "absolute",
    top: 0,
  },
  modal: {
    backgroundColor: Colours.screenBackground,
    borderColor: "rgba(0, 0, 0, 0.1)",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
});
