import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

const InventoryListItem = (props) => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
    Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.listItem}>
        <View style={styles.textGroup}>
          <Text style={styles.textItem}>{props.item}</Text>
          <Text
            style={
              (props.expiryDate.getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24) <=
              7
                ? [styles.textInfo, styles.expiringSoon]
                : styles.textInfo
            }
          >
            Expires: {props.expiryDate.toDateString()}{" "}
          </Text>
          <Text style={styles.textInfo}>
            Quantity: {props.quantity} {props.unit}
          </Text>
        </View>
        <View style={styles.checkFlex}>
          <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
        </View>
      </View>
    );
  }
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
    fontFamily: "Montserrat_400Regular",
  },

  expiringSoon: {
    color: "#C90000",
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
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    backgroundColor: "#DDDDDD",
  },
});

export default InventoryListItem;
