import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import TextRegular from "./TextRegular";
import TextMedium from "./TextMedium";
import { Colours } from "../constants/colours.js";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RecipeCard = (props) => {
  const getIcon = () => {
    if (props.isDeletable) {
      return (
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={25}
          color={Colours.filledButton}
        />
      );
    } else {
      return (
        <Ionicons name="md-heart" size={25} color={Colours.filledButton} />
      );
    }
  };
  return (
    <TouchableOpacity style={styles.listItem} onPress={props.onPressWhole}>
      <Image
        style={styles.image}
        source={{ uri: props.imageUri }}
        resizeMethod={"scale"}
      />
      <View style={styles.rowContainer}>
        <View style={styles.textGroup}>
          <TextMedium style={styles.textItem} text={props.foodName} />
          <TextRegular style={styles.textInfo} text={props.description} />
        </View>
        <View style={styles.checkFlex}>
          <TouchableOpacity
            style={styles.iconTouch}
            onPress={props.onPressButton}
          >
            {getIcon()}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: "85%",
    height: "auto",
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
    marginRight: 10,
  },
  textInfo: {
    marginLeft: 10,
    fontSize: 11,
    color: Colours.tint,
  },
  textItem: {
    marginLeft: 10,
    width: "85%",
    fontSize: 14,
    color: Colours.tint,
  },
  iconTouch: {
    width: 25,
    height: 25,
    borderRadius: 25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: Colours.screenBackground,
  },
});

export default RecipeCard;
