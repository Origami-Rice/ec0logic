import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import QualityDropdown from "../components/QualityDropdown";
import ExpiryInput from "../components/ExpiryInput";

import send from "../requests/request";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
};

export default class InventoryInputScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inventoryArray: this.props.inventoryArray,
      name: "", 
      quantity: 0,
      unitMeasure: "", 
      expiryDate: new Date(),
    }
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  saveItem = () => {
    // TODO: Verify that all fields have been entered correctly

    // Verify that the item entered is not already in the inventory
    const currInventory = this.state.inventoryArray;

    for (var i = 0; i < currInventory.length; i++) {
      if (currInventory[i].name == this.state.name) {
        alert("Item already exists"); // TODO: instead display a warning message
        return;
      } 
    }


    const data = {
      item: {
        name: this.state.name,
        expiryDate: this.state.expiryDate, // TODO: convert into proper value
        quantity: this.state.quantity,
        unitsOfMeasure: this.state.unitMeasure
      }
    }

    // Otherwise, we can save the item to the server
    send("addToInventory", data, "/test-user")
    .then(response => response.json())
    .then((json) => {
      console.log(json.error)
    })
    .catch(error => {
      console.log("Error adding new item to inventory");
      console.log(error)
    })

    // TODO: Navigate back to inventory screen


  } 

  setQuantity = (value) => {
    // Quality DropDown Child will set this value
    this.setState({ quantity: value });
    
  }
  
  setUnit = (value) => {
    // QualityDropDown component will call this function
    this.setState({unitMeasure: value});
  }

  setExpiryDate = (value) => {
    // ExpiryDropDown component will call this
    this.setState({expiryDate: value});
  }

  setSearchedItem = (item) => {
    // Food Search Screen
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + item.shelf_life);
    this.setState({
      name: item.name,
      expiryDate: expiry
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>x</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.inputFormat}
          placeholder="Enter New Food Item"
          onChangeText={this.handleNameEntered}
        />
        <Text style={styles.label}>Quantity:</Text>
        <QualityDropdown 
          setParentQuantity={this.setQuantity}
          setParentUnit={this.setUnit}></QualityDropdown>
        <Text style={styles.label}>Enter Expiry Date:</Text>
        <ExpiryInput
          setParentExpiry={this.setExpiryDate}
          defaultDate={this.state.expiryDate}>
        </ExpiryInput>
        <View style={{ zIndex: -1 }}>
          <TouchableOpacity style={styles.confirmButton} onPress={this.saveItem}>
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
    // iOS shadow
    shadowColor: "rgba(0,0,0, .5)",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // Android shadow
    elevation: 4,
    zIndex: 1,
  },
});
