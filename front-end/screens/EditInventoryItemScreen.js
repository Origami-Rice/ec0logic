import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import QuantityDropdown from "../components/QuantityDropdown";
import DatePicker from "../components/DatePicker";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
};

export default class EditInventoryItemScreen extends React.Component {
  constructor(props) {
    super(props);
    const item = this.props.route.params.item;
    this.state = {
      name: item.name,
      quantity: item.quantity,
      unitsOfMeasure: item.unitsOfMeasure,
      expiryDate: item.expiryDate,
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
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
    if (value === '') {
      this.setState({ quantity: 0});
    } else {
      const val = parseFloat(value);
      this.setState({ quantity: val });
    }
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
    });
  };

  handleDelete = () => {
    this.props.navigation.navigate("List", {
        screen: "Inventory",
        params: { update: true },
      });
  }

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
              onPress={() => this.props.navigation.goBack(null)}
            >
              <Text style={styles.cancelText}>x</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputFormat}
              placeholder="Enter New Food Item"
              value={this.state.name}
              onChangeText={(text) => this.setItemName(text)}
            />
            <Text style={styles.label}>Quantity:</Text>
            <QuantityDropdown
              defaultUnit={this.state.unitsOfMeasure}
              setParentQuantity={this.setQuantity}
              setParentUnit={this.setUnit}
            ></QuantityDropdown>
            <Text style={styles.label}>Select Expiry Date:</Text>
            <DatePicker
              setParentExpiry={this.setExpiryDate}
              defaultDate={this.state.expiryDate}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <View
            style={{
              justifyContent: "flex-end",
              zIndex: -1,
              marginBottom: 25,
            }}
          >
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={this.saveItem}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             style={styles.confirmButton}
             onPress={() => this.handleDelete()} >
              <Text style={styles.confirmText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: "#ffffff",
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
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  cancelText: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
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
  },
  label: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    marginVertical: 5,
  },
  note: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_400Regular",
    fontSize: 11,
    marginVertical: 5,
    color: "#828282",
  },
  confirmText: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
  },
  confirmButton: {
    width: 148,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#d8d8d8",
    margin: 15,
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
});
