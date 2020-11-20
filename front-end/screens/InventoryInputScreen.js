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
import Constants from "expo-constants";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import QuantityDropdown from "../components/QuantityDropdown";
import DatePicker from './components/DatePicker'

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
      inventoryArray: [],
      name: "",
      quantity: 0,
      unitMeasure: "",
      expiryDate: new Date(),
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
    // TODO: Verify that all fields have been entered correctly

    const newItem = {
        name: this.state.name,
        expiryDate: this.state.expiryDate, // TODO: convert into proper value
        quantity: this.state.quantity,
        unitsOfMeasure: this.state.unitMeasure
    };

    // TODO: Navigate back to inventory screen
    this.props.navigation.navigate('List', 
    {screen: "Inventory", params: {new_item: newItem} });

  };

  setQuantity = (value) => {
    // Quality DropDown Child will set this value
    this.setState({ quantity: value });
  };

  setUnit = (value) => {
    // QuantityDropdown component will call this function
    this.setState({ unitMeasure: value });
  };

  setExpiryDate = (value) => {
    // ExpiryDropDown component will call this
    this.setState({ expiryDate: value });
  };

  setSearchedItem = (item) => {
    // Food Search Screen
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + item.shelf_life);
    this.setState({
      name: item.name,
      expiryDate: expiry,
    });
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
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => this.props.navigation.goBack(null)}
          >
            <Text style={styles.cancelText}>x</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.inputFormat}
            placeholder="Enter New Food Item"
            onChangeText={this.handleNameEntered}
          />
          <Text style={styles.label}>Quantity:</Text>
          <QuantityDropdown
            setParentQuantity={this.setQuantity}
            setParentUnit={this.setUnit}
          ></QuantityDropdown>
          <Text style={styles.label}>Select Expiry Date:</Text>
          <DatePicker 
          setParentExpiry={this.setExpiryDate} 
          defaultDate={this.state.expiryDate}/>
          <Text style={styles.label}> {this.state.expiryDate.toString()} </Text>
          <View style={{ zIndex: -1 }}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={this.saveItem}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
