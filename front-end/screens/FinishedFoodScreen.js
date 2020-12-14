import * as React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import TextMedium from "../components/TextMedium";
import { Colours } from "../constants/colours.js";
import * as Font from "expo-font";

let customFonts = {
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
};

export default class FinishedFoodScreen extends React.Component {
  constructor(props) {
    super(props);
    const item = this.props.route.params.item;

    this.state = {
      name: item.name,
      quantity: item.quantity,
      unitsOfMeasure: item.unitsOfMeasure,
      expiryDate: item.expiryDate,
      quantityToRemove: "0",
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

  updateQuantity = () => {
    var quantityToRemove = parseFloat(this.state.quantityToRemove);
    const newQuantity = this.state.quantity - quantityToRemove;

    if (quantityToRemove < 0 || newQuantity < 0) {
      // Alert that this is invalid
      alert("Quantity Invalid. Please try again");
    } else if (newQuantity === 0) {
      // Navigate back only
      // Note that item was already removed from the inventory
      this.props.navigation.navigate("List", {
        screen: "Inventory",
        params: { update: true },
      });
    } else {
      // Create an updated item with the new quantity
      const newItem = {
        name: this.state.name,
        quantity: newQuantity,
        unitsOfMeasure: this.state.unitsOfMeasure,
        expiryDate: this.state.expiryDate,
      };

      this.props.navigation.navigate("List", {
        screen: "Inventory",
        params: { new_item: newItem },
      });
    }
  };

  handleCancel = () => {
    // Return to page, sending the old item back
    this.props.navigation.navigate("List", {
      screen: "Inventory",
      params: { new_item: this.props.route.params.item },
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
          <View style={{ justifyContent: "flex-start" }}>
            <TextMedium style={styles.header} text={this.state.name} />
            <TextMedium
              style={styles.label}
              text={"Enter the amount that you finished:"}
            />
            <View style={styles.inputWithDetails}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputFormat}
                  placeholder="Amount"
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                  onChangeText={(text) =>
                    this.setState({ quantityToRemove: text })
                  }
                />
                <View
                  style={{
                    width: Dimensions.get("window").width * 0.4,
                    justifyContent: "center",
                  }}
                >
                  <TextMedium
                    style={styles.unitText}
                    text={this.state.unitsOfMeasure}
                  />
                </View>
              </View>
              <TextMedium
                style={[styles.notice, { color: Colours.notice }]}
                text={`You had ${this.state.quantity} ${
                  this.state.unitsOfMeasure
                }${" "}remaining.`}
              />
            </View>
          </View>
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={this.updateQuantity}
            >
              <TextMedium style={styles.confirmText} text={"Confirm Update"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, { marginBottom: 25 }]}
              onPress={this.handleCancel}
            >
              <TextMedium style={styles.confirmText} text={"Cancel"} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: Colours.screenBackground,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  inputContainer: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inputWithDetails: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    color: Colours.tint,
    marginTop: 40,
  },
  label: {
    textAlign: "center",
    fontSize: 14,
    color: Colours.tint,
    marginBottom: 5,
    marginTop: 40,
  },
  notice: {
    width: Dimensions.get("window").width * 0.8,
    textAlign: "left",
    fontSize: 12,
    marginHorizontal: 10,
  },
  inputFormat: {
    width: Dimensions.get("window").width * 0.4,
    height: 31,
    backgroundColor: Colours.borderedComponentFill,
    borderColor: Colours.tint,
    borderWidth: 1,
    fontSize: 14,
    color: Colours.tint,
    padding: 5,
    paddingLeft: 10,
    marginHorizontal: 10,
    textAlign: "left",
    fontFamily: "Montserrat_500Medium",
  },
  unitText: {
    textAlign: "left",
    fontSize: 12,
    color: Colours.tint,
  },
  confirmText: {
    textAlign: "center",
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
  },
});
