import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

const LibraryListItem = (props) => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
    Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TouchableOpacity style={styles.listItem} onPress={props.onPress}>
        <View style={styles.textGroup}>
          <Text style={styles.textItem}>{props.item}</Text>
          <Text style={styles.textInfo}>Expires in {props.shelfLife} days</Text>
        </View>
      </TouchableOpacity>
    );
  }
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
    backgroundColor: "#ffffff",
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
    fontFamily: "Montserrat_400Regular",
  },

  textItem: {
    marginLeft: 10,
    fontSize: 12,
    fontFamily: "Montserrat_500Medium",
  },
});

export default LibraryListItem;
