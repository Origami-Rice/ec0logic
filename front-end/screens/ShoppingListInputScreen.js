import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import TextRegular from "../components/TextRegular";
import TextMedium from "../components/TextMedium";
import * as Font from "expo-font";
import QuantityDropdown from "../components/QuantityDropdown";

let customFonts = {
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
};

export default class ShoppingListInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryArray: this.props.inventoryArray,
      name: "",
      quantity: 0,
      unitsOfMeasure: "units",
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  // Alerts user that an item that they are attempting to add is in their inventory
  createAlert = () => {
    Alert.alert(
      "Wait a moment!",
      "You still have this in your inventory",
      [
        {
          text: "Go back",
          onPress: () => console.log("Go Back Pressed"),
          style: "cancel",
        },
        { text: "Continue anyways", onPress: () => this.saveItem() },
      ],
      { cancelable: false }
    );
  };

  saveItem = () => {
    const new_item = {
      name: this.state.name,
      quantity: this.state.quantity,
      unitsOfMeasure: this.state.unitsOfMeasure,
      checked_off: false,
    };

    // Add item to parent
    const { addNewItem } = this.props;
    addNewItem(new_item);
  };

  validateItem = () => {
    if (!this.state.name) {
      alert("Please enter item name.");
      return;
    }

    const { inventoryArray } = this.state;
    // Check if item is already in inventory, if so, alert
    for (var i = 0; i < inventoryArray.length; i++) {
      if (
        inventoryArray[i].name.toLowerCase() === this.state.name.toLowerCase()
      ) {
        this.createAlert();
        return;
      }
    }
    this.saveItem();
  };

  setQuantity = (value) => {
    // Quality DropDown Child will set this value
    const val = parseFloat(value);
    this.setState({ quantity: val });
  };

  setUnit = (value) => {
    // QuantityDropdown component will call this function
    this.setState({ unitsOfMeasure: value });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "flex-start", flex: 1 }}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={this.props.onCancel}
          >
            <TextRegular style={styles.cancelText} text={"x"} />
          </TouchableOpacity>
          <TextInput
            style={styles.inputFormat}
            placeholder="Enter New Food Item"
            onChangeText={(text) => this.setState({ name: text })}
          />
          <TextMedium style={styles.label} text={"Quantity:"} />
          <QuantityDropdown
            setParentQuantity={this.setQuantity}
            setParentUnit={this.setUnit}
          ></QuantityDropdown>
          <TextRegular style={styles.optional} text={"Optional"} />
        </View>
        <View
          style={{ justifyContent: "flex-end", zIndex: -1, marginBottom: 25 }}
        >
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={this.validateItem}
          >
            <TextMedium style={styles.confirmText} text={"Confirm"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    padding: 8,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    zIndex: 1,
    backgroundColor: "#ffffff",
  },
  cancelText: {
    textAlign: "center",
    alignSelf: "center",
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
    marginVertical: 25,
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
    width: Dimensions.get("window").width * 0.8,
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
    fontSize: 14,
    marginBottom: 5,
    marginTop: 50,
    zIndex: 1,
  },
  optional: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 11,
    marginVertical: 5,
    color: "#BDBDBD",
    zIndex: 1,
  },
  confirmText: {
    textAlign: "center",
    alignSelf: "center",
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
    marginVertical: 15,
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
});
