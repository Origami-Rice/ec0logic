import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import TextRegular from "./TextRegular";
import TextMedium from "./TextMedium";
import { Colours } from "../Constants/colours.js";

const InventoryListItem = (props) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={props.onPressWhole}>
      <View style={styles.textGroup}>
        <TextMedium style={styles.textItem} text={props.item} />
        <TextRegular
          style={styles.textInfo}
          text={`Expiry Date: ${props.expiryDate.toDateString()}${" "}`}
        />
        <TextRegular
          style={styles.textInfo}
          text={`Quantity: ${props.quantity} ${props.unitsOfMeasure}${" "}`}
        />
      </View>
      <View style={styles.checkFlex}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={props.onPressButton}
        ></TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: "85%",
    height: 80,
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colours.tint,
    backgroundColor: Colours.borderedComponentFill,
    alignSelf: "center",
    marginVertical: 8.5,
  },

  textGroup: {
    flex: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "center",
    justifyContent: "center",
  },

  checkFlex: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },

  textInfo: {
    marginLeft: 10,
    fontSize: 11,
    color: Colours.tint,
  },

  textItem: {
    marginLeft: 10,
    fontSize: 14,
    color: Colours.tint,
  },

  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colours.tint,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    backgroundColor: Colours.listButton,
  },
});

export default InventoryListItem;
