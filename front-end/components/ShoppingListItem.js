import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

const ShoppingListItem = (props) => {
  // Note: if test = "" the empty string, "Bananas" will be centered
  let test = "Quantity: 5";
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
    Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  });
  const [checked, setChecked] = useState(false);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.listItem}>
        <View style={styles.checkFlex}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setChecked(!checked)}
          ></TouchableOpacity>
        </View>
        <View style={styles.textGroup}>
          <Text
            style={
              checked
                ? [styles.textItem, { color: "#BDBDBD" }]
                : styles.textItem
            }
          >
            {props.item}
          </Text>
          {/* TODO: check if props.quantity is a certain value, change to "" if no quantity */}
          <Text
            style={
              checked
                ? [styles.textInfo, { color: "#BDBDBD" }]
                : styles.textInfo
            }
          >
            {test}
          </Text>
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
