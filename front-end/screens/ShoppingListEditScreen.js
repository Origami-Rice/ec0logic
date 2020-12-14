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
import { Colours } from "../constants/colours.js";
import * as Font from "expo-font";
import QuantityDropdown from "../components/QuantityDropdown";

let customFonts = {
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
};

export default class ShoppingListEditScreen extends React.Component {
  constructor(props) {
    super(props);
    const item = this.props.item;

    this.state = {
      name: item.name,
      quantity: item.quantity,
      unitsOfMeasure: item.unitsOfMeasure,
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
    const new_item = {
      name: this.state.name,
      quantity: this.state.quantity,
      unitsOfMeasure: this.state.unitsOfMeasure,
      checked_off: this.props.item.checked_off,
    };

    // Add item to parent
    const { addNewItem } = this.props;
    addNewItem(new_item);
  };

  validateItem = () => {
    if (this.state.name) {
      this.saveItem();
    } else {
      alert("Please enter item name.");
    }
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

  onCancel = () => {
    // Add item to parent
    const { addNewItem, onCancel } = this.props;
    addNewItem(this.props.item);
    onCancel();
  };

  onDelete = () => {
    Alert.alert(
      "Confirm",
      "You are about to delete this item from your shopping list.",
      [
        {
          text: "Continue",
          onPress: this.props.onDelete,
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
        <View style={{ justifyContent: "flex-start", flex: 1 }}>
          <TouchableOpacity style={styles.cancelButton} onPress={this.onCancel}>
            <TextRegular style={styles.cancelText} text={"x"} />
          </TouchableOpacity>
          <TextMedium style={styles.label} text={"Update Item Name:"} />
          <TextInput
            style={styles.inputFormat}
            placeholder="Enter Item Name"
            value={this.state.name}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <TextMedium style={styles.label} text={"Update Quantity:"} />
          <QuantityDropdown
            setParentQuantity={this.setQuantity}
            setParentUnit={this.setUnit}
            defaultUnit={this.state.unitsOfMeasure}
          ></QuantityDropdown>
          <TextRegular style={styles.optional} text={"Optional"} />
        </View>

        {
          <View
            style={{
              justifyContent: "flex-end",
              zIndex: -1,
              marginBottom: 25,
            }}
          >
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={this.validateItem}
            >
              <TextMedium style={styles.confirmText} text={"Confirm Changes"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={this.onDelete}
            >
              <TextMedium style={styles.confirmText} text={"Delete Item"} />
            </TouchableOpacity>
          </View>
        }
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
    backgroundColor: Colours.screenBackground,
  },
  cancelText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    color: Colours.tint,
    zIndex: 1,
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
    zIndex: 1,
  },
  label: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    color: Colours.tint,
    marginBottom: 5,
    marginTop: 50,
    zIndex: 1,
  },
  optional: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 12,
    marginVertical: 5,
    color: Colours.notice,
    zIndex: 1,
  },
  confirmText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    color: Colours.filledButtonText,
    zIndex: 1,
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
    zIndex: 1,
  },
});
