import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import TextRegular from "./TextRegular";
import TextMedium from "./TextMedium";
import { Colours } from "../constants/colours.js";

const ShoppingListItem = (props) => {
  const [checked, setChecked] = useState(props.checkedOff || false);
  const index = props.index;
  const quantity = props.quantity;
  const units = props.unitsOfMeasure;

  const handlePress = () => {
    setChecked(!checked);
    const { updateCheck } = props;
    updateCheck(index);
  };

  const displayQuantity = () => {
    if (quantity !== 0) {
      return (
        <TextRegular
          style={
            checked
              ? [styles.textInfo, { color: Colours.navInactiveTint }]
              : [styles.textInfo, { color: Colours.tint }]
          }
          text={`Quantity: ${quantity} ${units}`}
        />
      );
    }
  };

  return (
    <TouchableOpacity style={styles.listItem} onPress={props.onPress}>
      <View style={styles.checkFlex}>
        <TouchableOpacity style={styles.checkbox} onPress={handlePress}>
          <MaterialIcons
            name="check"
            size={24}
            color={checked ? Colours.tint : Colours.filledButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textGroup}>
        <TextMedium
          style={
            checked
              ? [styles.textItem, { color: Colours.navInactiveTint }]
              : [styles.textItem, { color: Colours.tint }]
          }
          text={props.item}
        />
        {displayQuantity()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: "85%",
    height: 80,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colours.tint,
    backgroundColor: Colours.borderedComponentFill,
    alignSelf: "center",
    marginVertical: 8.5,
  },
  textGroup: {
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  checkFlex: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
  },
  textInfo: {
    marginLeft: 10,
    fontSize: 11,
  },
  textItem: {
    marginLeft: 10,
    fontSize: 14,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignSelf: "flex-end",
    backgroundColor: Colours.filledButton,
  },
});

export default ShoppingListItem;
