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

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
};

export default class WastedFoodScreen extends React.Component {
  constructor(props) {
    super(props);
    const item = this.props.route.param.item;

    this.state = {
      name: item.name,
      quantity: item.quantity,
      unitsOfMeasure: item.unitsOfMeasure,
      expiryDate: item.expiryDate,
      quantityToRemove: "0",
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
      // TODO: send to server the record of wasted food

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
      }); // TODO: screen name
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
            <Text style={styles.header}>{this.state.name}</Text>
            <Text style={styles.label}>
              Enter the amount that was thrown out:
            </Text>
            <View style={styles.inputWithDetails}>
              <Text
                style={[styles.notice, { color: "#C90000", marginTop: 10 }]}
              >
                Please enter an amount.
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputFormat}
                  placeholder="Amount"
                  keyboardType="decimal-pad"
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
                  <Text style={styles.unitText}>
                    {this.state.unitsOfMeasure}
                  </Text>
                </View>
              </View>
              <Text style={[styles.notice, { color: "#BDBDBD" }]}>
                You had {this.state.quantity} {this.state.unitsOfMeasure}{" "}
                remaining.
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={this.updateQuantity}
            >
              <Text style={styles.confirmText}>Confirm Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                { marginBottom: Dimensions.get("window").height * 0.1 },
              ]}
              onPress={this.handleCancel}
            >
              <Text style={styles.confirmText}>Cancel</Text>
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
    backgroundColor: "#ffffff",
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
    fontFamily: "Montserrat_500Medium",
    fontSize: 24,
    marginTop: 40,
  },
  label: {
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    marginBottom: 5,
    marginTop: 40,
  },
  notice: {
    width: Dimensions.get("window").width * 0.8,
    textAlign: "left",
    fontFamily: "Montserrat_500Medium",
    fontSize: 10,
    marginHorizontal: 10,
  },
  inputFormat: {
    width: Dimensions.get("window").width * 0.4,
    height: 31,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 1,
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    marginHorizontal: 10,
    textAlign: "left",
    fontFamily: "Montserrat_500Medium",
  },
  unitText: {
    textAlign: "left",
    fontFamily: "Montserrat_500Medium",
    fontSize: 12,
  },
  confirmText: {
    textAlign: "center",
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
