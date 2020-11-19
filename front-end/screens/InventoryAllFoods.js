import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Constants from "expo-constants";
import InventoryListItem from "../components/InventoryListItem";
import FinshedFoodScreen from "./FinishedFoodScreen";
import InventoryInputScreen from "./InventoryInputScreen";
import send from "../requests/request.js";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
};
// TODO: close modal on press
// TODO: android modal height when keyboard pops up
export default class InventoryAllFoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryArray: [
        { name: "Butter", expiryDate: "Nov 30, 2020", quantity: 2 },
        { name: "Cabbage" },
        { name: "Sweet Potato" },
        { name: "Mango" },
        { name: "Apples" },
      ],
      expiringArray: [{ name: "Banana" }],
      allFoods: true,
      visibleModal: null,
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    // Load the list of user's inventory items from server
    send("getInventory", {}, "test-user")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ inventoryArray: json });
      })
      .catch((error) => {
        console.log("Error getting user inventory");
        console.log(error);
      });

    // Load the list of user's expiring items
    send(getExpiring, {}, "test-user")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ expiringArray: json.expiring });
      })
      .catch((error) => {
        console.log("Error getting user's expiring items");
        console.log(error);
      });
  }

  displayItems = () => {
    // Dynamically
    if (this.state.allFoods) {
      return this.state.inventoryArray.map((data) => (
        <InventoryListItem item={data.name} />
      ));
    } else {
      return this.state.expiringArray.map((data) => (
        <InventoryListItem item={data.name} />
      ));
    }
  };

  switchItems = (state) => {
    this.setState((state) => ({
      allFoods: !state.allFoods,
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[styles.rowContainer, { justifyContent: "space-between" }]}
        >
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
            style={
              this.state.allFoods
                ? [styles.navButton, { backgroundColor: "#5A5A5A" }]
                : [styles.navButton, { backgroundColor: "#ffffff" }]
            }
            onPress={this.switchItems}
          >
            <Text
              style={
                this.state.allFoods
                  ? [styles.navText, { color: "#ffffff" }]
                  : [styles.navText, { color: "#000000" }]
              }
            >
              All Foods
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              !this.state.allFoods
                ? [styles.navButton, { backgroundColor: "#5A5A5A" }]
                : [styles.navButton, { backgroundColor: "#ffffff" }]
            }
            onPress={this.switchItems}
          >
            <Text
              style={
                !this.state.allFoods
                  ? [styles.navText, { color: "#ffffff" }]
                  : [styles.navText, { color: "#000000" }]
              }
            >
              Expiring Soon
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider}></View>
        <ScrollView style={styles.listContainer}>
          {this.displayItems()}
        </ScrollView>
        <View style={styles.divider}></View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.setState({ visibleModal: 1 })}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.visibleModal === 1}
          style={styles.bottomModal}
          avoidKeyboard={false}
        >
          {
            <ScrollView
              style={{
                height: Dimensions.get("window").height,
                width: Dimensions.get("window").width,
              }}
            >
              <View style={styles.modal}>
                <InventoryInputScreen></InventoryInputScreen>
              </View>
            </ScrollView>
          }
        </Modal>
      </View>
    );
  }
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
    //flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginVertical: 5,
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    //flex: 1,
    flexDirection: "row",
    padding: 8,
    marginVertical: 5,
  },
  listContainer: {
    height: Dimensions.get("window").height * 0.55,
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
  modal: {
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.1)",
    height: Dimensions.get("window").height,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
    height: Dimensions.get("window").height,
  },
});
