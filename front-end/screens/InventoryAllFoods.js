import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import Modal from "react-native-modal";
import * as Font from "expo-font";
import InventoryListItem from "../components/InventoryListItem";
import AboutUsScreen from "./AboutUsScreen";
import send from "../requests/request.js";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
};

let username = '/tester';

export default class InventoryAllFoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryArray: [],
      expiringArray: [],
      allFoods: true,
      fontsLoaded: false,
      isLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  _loadData = () => {
    this.setState ({ isLoaded: false })
    // Load the list of user's inventory items from server
    send("getInventory", {}, username)
      .then((response) => response.json())
      .then((json) => {
        const inventory = this.deserializeItems(json);
        this.setState({ inventoryArray: inventory, isLoaded: true });
      })
      .catch((error) => {
        console.log("Error getting user inventory");
        console.log(error);
      });

    // Load the list of user's expiring items
    send("getExpiring", {}, username)
      .then((response) => response.json())
      .then((json) => {
        const expiring = this.deserializeItems(json);
        this.setState({ expiringArray: expiring });
      })
      .catch((error) => {
        console.log("Error getting user's expiring items");
        console.log(error);
      });
  };

  deserializeItems = (json) => {
    var items = [];
    // Convert to useful info:
    for (let i = 0; i < json.length; i++) {
      const { name, quantity, unitsOfMeasure, expiryDate } = json[i];
      const item = {
        name: name,
        quantity: quantity,
        unitsOfMeasure: unitsOfMeasure,
        expiryDate: new Date(expiryDate),
      };

      items.push(item);
    }
    return items;
  };

  componentDidMount() {
    this._loadFontsAsync();

    // For getting the new item send by the inventory input screen
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      if (this.props.route.params?.new_item) {

        console.log("[Inventory] Added item to list:" + this.props.route.params.new_item.name);
        this.addItem(this.props.route.params.new_item);
        this.props.navigation.setParams({ new_item: null }); // Resetting params

      } else if (this.props.route.params?.update) {

        console.log("[Inventory] Update since item was deleted");
        this.updateInventory(this.state.inventoryArray);
        this.props.navigation.setParams({ update: null });

      } else {

        console.log("[Inventory] Nothing changed");
        this._loadData();

      }
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  addItem = (item) => {
    var currInventory = this.state.inventoryArray;
    currInventory.push(item);
    // Update displayed inventoryArray
    this.setState({ inventoryArray: currInventory });
    // This will add the item to the expiring array if applicable
    console.log(this.addToExpiring(item));

    this.updateInventory(currInventory);
  };

  /**
   * Adds item to expiringArray if applicable.
   * Returns true if item was added. 
   */
  addToExpiring = (item) => {
    var currExpiring = this.state.expiringArray;
    let now = new Date();
    let expires =
      (item.expiryDate.getTime() - now.getTime()) / (1000 * 3600 * 24);
    // check if expiring soon
    if (expires < 3) {
      currExpiring.push(item);
      this.setState({ expiringArray: currExpiring });
      return true;
    }
    return false;
  };

  updateInventory = (updatedInventory) => {
    const data = {
      list: updatedInventory,
    };

    // Send updated list to server
    send("addToInventory", data, username)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.error);
      })
      .catch((error) => {
        console.log("Error adding new item to inventory");
        console.log(error);
      });
  };

  createSelectionWindow = (item, i, expiring = false) => {
    Alert.alert(
      "Update Item Quantity",
      "Select an option.",
      [
        {
          text: "Mark as thrown out",
          onPress: () => this.navigateTo(item, i, "ThrownOut", expiring),
        },
        {
          text: "Mark as used",
          onPress: () => this.navigateTo(item, i, "Used", expiring),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  compareItems = (item1, item2) => {
    return (
      item1.name == item2.name &&
      item1.quantity == item2.quantity &&
      item1.expiryDate.getTime() == item2.expiryDate.getTime() &&
      item1.unitsOfMeasure == item2.unitsOfMeasure
    );
  };

  /**
   * Remove item from expiringArray at index position.
   * Also remove item from inventoryArray.
   */
  removeFromExpiring = (item, index) => {
    // We remove the item from the expiring list
    var currExpiring = this.state.expiringArray;
    currExpiring.splice(index, 1);
    this.setState({ expiringArray: currExpiring });

    var inventoryArray = this.state.inventoryArray;
    // find the item in the inventory array -> should always return true
    for (let i = 0; i < inventoryArray.length; i++) {
      if (this.compareItems(inventoryArray[i], item)) {
        inventoryArray.splice(i, 1);
        this.setState({ inventoryArray: inventoryArray });
        return true;
      }
    }
    return false;
  };

  removeFromInventory = (item, index) => {
    // We remove the item to be updated from our inventory
    var currInventory = this.state.inventoryArray;
    currInventory.splice(index, 1);
    this.setState({ inventoryArray: currInventory });

    // check if item is in expiring list -> return true if so
    var expiringArray = this.state.expiringArray;
    for (let i = 0; i < expiringArray.length; i++) {
      if (this.compareItems(expiringArray[i], item)) {
        expiringArray.splice(i, 1);
        this.setState({ expiringArray: expiringArray });
        return true;
      }
    }
    return false;
  };

  navigateTo = (item, i, screen, expiring) => {
    if (expiring) {
      this.removeFromExpiring(item, i);
    } else {
      this.removeFromInventory(item, i);
    }

    // Navigate to wasted food screen, pass in the item
    this.props.navigation.navigate(screen, {
      item: item,
    });
  };

  displayItems = () => {
    if (!this.state.isLoaded) {
      return (
      <View style={{flex: 1, alignItems:'center', justifyContent: 'center', padding: 24}}> 
        <ActivityIndicator animating={true} colour={"grey"}/>
      </View>
      );
    } else {
      // Dynamically
      if (this.state.allFoods) {
        return this.state.inventoryArray.map((data, i) => (
          <InventoryListItem
            key={data.name + data.expiryDate.toISOString() + Math.random()}
            item={data.name}
            expiryDate={data.expiryDate}
            quantity={data.quantity}
            unitsOfMeasure={data.unitsOfMeasure}
            onPressButton={() => this.createSelectionWindow(data, i)}
            onPressWhole={() => this.navigateTo(data, i, 'Edit', false)}
          />
        ));
      } else {
        return this.state.expiringArray.map((data, i) => (
          <InventoryListItem
            item={data.name}
            key={data.name + data.expiryDate.toISOString() + Math.random()}
            expiryDate={data.expiryDate}
            quantity={data.quantity}
            unitsOfMeasure={data.unitsOfMeasure}
            onPressButton={() => this.createSelectionWindow(data, i, true)}
            onPressWhole={() => this.navigateTo(data, i, 'Edit', true)}
          />
        ));
      }
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
        <View style={{ justifyContent: "flex-start", flex: 0, marginTop: 5 }}>
          <View
            style={[styles.rowContainer, { justifyContent: "space-between" }]}
          >
            <Text style={styles.title}>My Inventory</Text>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => this.setState({ visibleModal: 2 })}
            >
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
        </View>
        <ScrollView style={styles.listContainer}>
          {this.displayItems()}
        </ScrollView>
        <View
          style={{
            justifyContent: "flex-start",
            flex: 0,
          }}
        >
          <View style={styles.divider}></View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => this.props.navigation.navigate("Input")}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={this.state.visibleModal === 2}
          style={styles.bottomModal}
          avoidKeyboard={false}
        >
          {
            <View style={styles.modal}>
              <AboutUsScreen
                setSearchItem={this.setSearchedItem}
                onCancel={() => this.setState({ visibleModal: 0 })}
              ></AboutUsScreen>
            </View>
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
    flex: 1,
    padding: 8,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  rowContainer: {
    flexDirection: "row",
    padding: 8,
    marginVertical: 5,
  },
  listContainer: {
    flex: 1,
    flexGrow: 1,
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
    marginVertical: 20,
    backgroundColor: "#ffffff",
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0, .5)",
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "absolute",
    top: 0,
  },
  modal: {
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.1)",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
});
