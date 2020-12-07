import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import TextRegular from "./TextRegular";
import TextMedium from "./TextMedium";
import { Colours } from "../constants/colours.js";

const RecipeCard = (props) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={props.onPressWhole}>
      <Image
        style={styles.image}
        source={{ uri: props.imageURL }}
        resizeMethod={"scale"}
      />
      <View style={styles.rowContainer}>
        <View style={styles.textGroup}>
          <TextMedium style={styles.textItem} text={props.foodName} />
          <TextRegular style={styles.textInfo} text={props.description} />
          <TextRegular style={styles.textInfo} text={props.description} />
        </View>
        <View style={styles.checkFlex}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={props.onPressButton}
          ></TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: "85%",
    height: 200,
    flex: 0,
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colours.tint,
    alignSelf: "center",
    marginVertical: 8.5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textGroup: {
    flex: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "center",
    justifyContent: "center",
  },
  image: {
    height: 110,
    width: "95%",
    margin: 10,
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colours.tint,
    alignSelf: "center",
  },
  checkFlex: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
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
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: Colours.filledButton,
  },
});

export default RecipeCard;
