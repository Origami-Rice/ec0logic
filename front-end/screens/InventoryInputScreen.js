import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import Constants from "expo-constants";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import QuantityDropdown from "../components/QuantityDropdown";
import DatePicker from "../components/DatePicker";
import FoodSearchScreen from "./FoodSearchScreen";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
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
      estimateGiven: false,
    });
  };

  setExpiryDate = (value) => {
    // ExpiryDropDown component will call this
    this.setState({ expiryDate: value });
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
          <Text style={styles.label}>
            {" "}
            Estimated Expiry Date: {this.state.expiryDate.toDateString()}
          </Text>
          <Text style={styles.note}>
            This is only an estimate, select a different expiry date by clicking
            above.
          </Text>
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      <ScrollView
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              justifyContent: "flex-start",
              width: Dimensions.get("window").width,
            }}
          >
            <View style={styles.topButtonsContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.setState({ visibleModal: 1 })}
              >
                <Text style={styles.cancelText}>s</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.props.navigation.goBack(null)}
              >
                <Text style={styles.cancelText}>x</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFormat}
                placeholder="Enter New Food Item"
                onChangeText={(text) => this.setItemName(text)}
              />
              <Text style={styles.label}>Quantity:</Text>
              <QuantityDropdown
                setParentQuantity={this.setQuantity}
                setParentUnit={this.setUnit}
              ></QuantityDropdown>
              <Text style={styles.label}>Select Expiry Date:</Text>
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
              zIndex: -1,
            }}
          >
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={this.saveItem}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={this.state.visibleModal === 1}
            style={styles.bottomModal}
            avoidKeyboard={false}
          >
            {
              <ScrollView
                style={{
                  height: Dimensions.get("window").height,
                  width: Dimensions.get("window").width,
                }}
              >
                <View style={styles.modal}>
                  <FoodSearchScreen
                    setSearchItem={this.setSearchedItem}
                    onCancel={() => this.setState({ visibleModal: 0 })}
                  ></FoodSearchScreen>
                </View>
              </ScrollView>
            }
          </Modal>
        </View>
      </ScrollView>
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
    backgroundColor: "#ffffff",
    zIndex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelText: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    zIndex: 1,
  },
  cancelButton: {
    width: 37,
    height: 37,
    borderRadius: 37,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "flex-end",
    backgroundColor: "#ffffff",
    margin: 25,
    zIndex: 1,
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
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderBottomWidth: 1,
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
    zIndex: 1,
  },
  label: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    marginVertical: 5,
    zIndex: 1,
  },
  note: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_400Regular",
    fontSize: 11,
    marginVertical: 5,
    color: "#828282",
    zIndex: 1,
  },
  confirmText: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    zIndex: 1,
  },
  confirmButton: {
    width: 148,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#d8d8d8",
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
    zIndex: 1,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
    height: Dimensions.get("window").height,
  },
  modal: {
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.1)",
    height: Dimensions.get("window").height,
  },
});
