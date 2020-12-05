import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import TextRegular from "./TextRegular";
import TextMedium from "./TextMedium";
import { Colours } from "../constants/colours.js";

const LibraryListItem = (props) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={props.onPress}>
      <View style={styles.textGroup}>
        <TextMedium style={styles.textItem} text={props.item} />
        <TextRegular
          style={styles.textInfo}
          text={`Expires in ${props.shelfLife} days`}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: "85%",
    height: 65,
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    alignSelf: "center",
    backgroundColor: Colours.screenBackground,
    marginVertical: 5,
  },

  textGroup: {
    flex: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "center",
    justifyContent: "center",
  },

  textInfo: {
    marginLeft: 10,
    fontSize: 11,
    color: Colours.tint,
  },

  textItem: {
    marginLeft: 10,
    fontSize: 12,
    color: Colours.tint,
  },
});

export default LibraryListItem;
