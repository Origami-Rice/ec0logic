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
import { AppLoading } from "expo";
import * as Font from "expo-font";
import DatePicker from "../components/DatePicker";

let customFonts = {
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
};

export default class EditInventoryItemScreen extends React.Component {
  constructor(props) {
    super(props);
    const item = this.props.route.params.item;
    this.state = {
      name: item.name,
      quantity: item.quantity,
      unitsOfMeasure: item.unitsOfMeasure || "units",
      expiryDate: item.expiryDate,
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

  saveItem = () => {
    // Verify that all fields have been entered correctly
    if (this.state.name === "") {
      alert("Please enter item name.");
      return;
    }

    const newItem = {
      name: this.state.name,
      expiryDate: this.state.expiryDate,
      quantity: this.state.quantity,
      unitsOfMeasure: this.state.unitsOfMeasure,
    };

    this.props.navigation.navigate("List", {
      screen: "Inventory",
      params: { new_item: newItem },
    });
  };

  setExpiryDate = (value) => {
    // ExpiryDropDown component will call this
    this.setState({
      expiryDate: value,
    });
  };

  handleDelete = () => {
    console.log("Deleted Item from Inventory");

    this.props.navigation.navigate("List", {
      screen: "Inventory",
      params: { update: true },
    });
  };

  confirmDeletion = () => {
    Alert.alert(
      "Confirm",
      "You are about to delete this item from your inventory.",
      [
        {
          text: "Continue",
          onPress: () => this.handleDelete(),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
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
              onPress={() => this.props.navigation.goBack(null)}
            >
              <TextRegular style={styles.cancelText} text={"x"} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextMedium style={styles.label} text={"Update Item Name:"} />
            <TextInput
              style={styles.inputFormat}
              placeholder="Enter Item Name"
              value={this.state.name}
              onChangeText={(text) => this.setState({ name: text })}
            />
            <TextMedium style={styles.label} text={"Update Expiry Date:"} />
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
              <TextMedium style={styles.confirmText} text={"Confirm Changes"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => this.confirmDeletion()}
            >
              <TextMedium style={styles.confirmText} text={"Delete Item"} />
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
    fontSize: 14,
    marginVertical: 5,
  },
  confirmText: {
    textAlign: "center",
    alignSelf: "center",
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
