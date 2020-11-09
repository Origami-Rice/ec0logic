import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import Constants from "expo-constants";
import InventoryListItem from "./components/InventoryListItem";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular: require("./fonts/Montserrat-Regular.ttf"),
    Montserrat_500Medium: require("./fonts/Montserrat-Medium.ttf"),
    Montserrat_600SemiBold: require("./fonts/Montserrat-SemiBold.ttf"),
  });
  return (
    <View style={styles.container}>
      <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
        <Text style={styles.title}>My Inventory</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoText}>i</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider}></View>
      <View
        style={[
          styles.rowContainer,
          { justifyContent: "center", backgroundColor: "#ffffff" },
        ]}
      >
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: "#5A5A5A" }]}
        >
          <Text style={[styles.navText, { color: "#ffffff" }]}>All Foods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Expiring Soon</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider}></View>
      <ScrollView style={styles.listContainer}>
        <InventoryListItem> </InventoryListItem>
        <InventoryListItem> </InventoryListItem>
        <InventoryListItem> </InventoryListItem>
        <InventoryListItem> </InventoryListItem>
      </ScrollView>
      <View style={styles.divider}></View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#CCC5C5",
  },
  container: {
    padding: 8,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginVertical: 5,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 8,
    marginVertical: 5,
  },
  listContainer: {
    height: Dimensions.get("window").height * 0.47,
    paddingVertical: 5,
  },
  title: {
    fontSize: 34,
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
  navText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    textAlign: "center",
    alignSelf: "center",
  },
  navButton: {
    borderWidth: 1,
    borderColor: "#5A5A5A",
    justifyContent: "center",
    alignSelf: "center",
    height: 33,
    width: "40%",
  },
  infoText: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
  },
  infoButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  addText: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_400Regular",
    fontSize: 24,
  },
  addButton: {
    width: 57,
    height: 57,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "5%",
    marginBottom: "20%",
    backgroundColor: "#ffffff",
    // iOS shadow
    shadowColor: "rgba(0,0,0, .5)",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // Android shadow
    elevation: 4,
  },
});
