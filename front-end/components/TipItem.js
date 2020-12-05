import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

const TipItem = (props) => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.textInfo}>{props.tip}</Text>
        <View style={styles.checkFlex}>
          <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  listItem: {
    width: "85%",
    height: 95,
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
    fontFamily: "Montserrat_400Regular",
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
    backgroundColor: "#DDDDDD",
  },
});

export default TipItem;
