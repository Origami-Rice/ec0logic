import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

const ShoppingListItem = (props) => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
    Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  });
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
        <Text
          style={
            checked
              ? [styles.textInfo, { color: "#BDBDBD" }]
              : [styles.textInfo, { color: "#000000" }]
          }
        >
          Quantity: {quantity} {units}
        </Text>
      );
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.listItem}>
        <View style={styles.checkFlex}>
          <TouchableOpacity style={styles.checkbox} onPress={handlePress}>
            <MaterialIcons
              name="check"
              size={24}
              color={checked ? "black" : "#DDDDDD"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textGroup}>
          <Text
            style={
              checked
                ? [styles.textItem, { color: "#BDBDBD" }]
                : [styles.textItem, { color: "#000000" }]
            }
          >
            {props.item}
          </Text>
          {displayQuantity()}
        </View>
      </View>
    );
  }
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
    fontFamily: "Montserrat_400Regular",
  },

  textItem: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
  },

  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignSelf: "flex-end",
    backgroundColor: "#DDDDDD",
  },
});

export default ShoppingListItem;
