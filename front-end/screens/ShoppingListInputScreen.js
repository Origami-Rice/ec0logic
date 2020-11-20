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
import Constants from "expo-constants";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import QuantityDropdown from "../components/QuantityDropdown";
import send from "../requests/request"

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
};

export default class ShoppingListInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryArray: [{ name: "Butter", expiryDate: "Nov 30, 2020", quantity: 2 },
      { name: "Cabbage" },
      { name: "Sweet Potato" },
      { name: "Mango" },
      { name: "Apples" }],
      name: "",
      quantity: 0,
      
    }
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
          style: "cancel"
        },
        { text: "Continue anyways", onPress: () => this.saveItem }
      ],
      { cancelable: false }
    );

  }

  saveItem = () => {
    const new_item = {
      name: this.state.name,
      quantity: this.state.quantity,
      checked_off: false
    }

    // Add item to parent 
    const { addNewItem } = this.props;
    addNewItem(new_item);
  }

  validateItem = () => {
    // Validate name entry
    const {inventoryArray} = this.state;
    // Check if item is already in inventory, if so, alert
    for (var i=0; i < inventoryArray; i++) {
      if (inventoryArray[i].name = this.state.name){
        this.createAlert();
        return;
      } 
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>x</Text>
        </TouchableOpacity>
        <View style={{ justifyContent: "flex-start" }}>
          <TextInput
            style={styles.inputFormat}
            placeholder="Enter New Food Item"
          />
          <Text style={styles.label}>Quantity:</Text>
          <QuantityDropdown></QuantityDropdown>
          <Text style={styles.optional}>Optional</Text>
        </View>
        <View style={{ justifyContent: "flex-end", zIndex: -1 }}>
          <TouchableOpacity style={styles.confirmButton} onPress={this.validateItem}>
            <Text style={styles.confirmText}>Confirm</Text>
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
    // iOS shadow
    shadowColor: "rgba(0,0,0, .5)",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // Android shadow
    elevation: 3,
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
    marginBottom: 5,
    marginTop: 50,
    zIndex: 1,
  },
  optional: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_400Regular",
    fontSize: 11,
    marginVertical: 5,
    color: "#BDBDBD",
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
    marginVertical: Dimensions.get("window").height * 0.2,
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
