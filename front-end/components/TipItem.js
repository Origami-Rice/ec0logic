import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import TextRegular from "./TextRegular";
import { Colours } from "../constants/colours.js";

const TipItem = (props) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={props.onPressWhole}>
      <TextRegular style={styles.textInfo} text={props.tip} numberOfLines={2} />
      <View style={styles.checkFlex}>
        <TouchableOpacity style={styles.checkbox} onPress={props.onPressCheck}></TouchableOpacity>
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
    alignSelf: "center",
    marginVertical: 8.5,
  },
  checkFlex: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 10,
  },
  textInfo: {
    marginLeft: 10,
    fontSize: 11,
    color: Colours.tint,
    flex: 3,
    flexWrap: "wrap",
    alignSelf: "center",
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    backgroundColor: Colours.filledButton,
  },
});

export default TipItem;
