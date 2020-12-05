import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import TextRegular from "../components/TextRegular";
import TextMedium from "../components/TextMedium";
import TextSemiBold from "../components/TextSemiBold";
import { Colours } from "../constants/colours.js";
import { ActivityIndicator } from "react-native-paper";
import Modal from "react-native-modal";
import InventoryListItem from "../components/InventoryListItem";
import AboutUsScreen from "./AboutUsScreen";
import send from "../requests/request.js";

let username = "/tester";

export default class InventoryAllFoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryArray: [],
      expiringArray: [],
      allFoods: true,
      isLoaded: false,
    };
  }

  _loadData = () => {
    this.setState({ isLoaded: false });
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
    // For getting the new item send by the inventory input screen
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      if (this.props.route.params?.new_item) {
        console.log(
          "[Inventory] Added item to list:" +
            this.props.route.params.new_item.name
        );
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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <ActivityIndicator animating={true} colour={Colours.notice} />
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
            onPressWhole={() => this.navigateTo(data, i, "Edit", false)}
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
            onPressWhole={() => this.navigateTo(data, i, "Edit", true)}
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
            <TextSemiBold style={styles.title} text={"My Inventory"} />
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => this.setState({ visibleModal: 2 })}
            >
              <TextMedium style={styles.infoText} text={"i"} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
          <View
            style={[
              styles.rowContainer,
              {
                justifyContent: "center",
                backgroundColor: Colours.screenBackground,
              },
            ]}
          >
            <TouchableOpacity
              style={
                this.state.allFoods
                  ? [
                      styles.navButton,
                      { backgroundColor: Colours.switchButtonSelected },
                    ]
                  : [
                      styles.navButton,
                      { backgroundColor: Colours.switchButtonNotSelected },
                    ]
              }
              onPress={this.switchItems}
            >
              <TextMedium
                style={
                  this.state.allFoods
                    ? [
                        styles.navText,
                        { color: Colours.switchButtonSelectedText },
                      ]
                    : [
                        styles.navText,
                        { color: Colours.switchButtonNotSelectedText },
                      ]
                }
                text={"All Foods"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={
                !this.state.allFoods
                  ? [
                      styles.navButton,
                      { backgroundColor: Colours.switchButtonSelected },
                    ]
                  : [
                      styles.navButton,
                      { backgroundColor: Colours.switchButtonNotSelected },
                    ]
              }
              onPress={this.switchItems}
            >
              <TextMedium
                style={
                  !this.state.allFoods
                    ? [
                        styles.navText,
                        { color: Colours.switchButtonSelectedText },
                      ]
                    : [
                        styles.navText,
                        { color: Colours.switchButtonNotSelectedText },
                      ]
                }
                text={"Expiring Soon"}
              />
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
            <TextRegular style={styles.addText} text={"+"} />
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
    backgroundColor: Colours.divider,
  },
  container: {
    flex: 1,
    padding: 8,
    paddingBottom: 0,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: Colours.screenBackground,
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
    color: Colours.tint,
    textAlign: "center",
    alignSelf: "center",
  },
  navText: {
    fontSize: 14,
    textAlign: "center",
    alignSelf: "center",
  },
  navButton: {
    borderWidth: 1,
    borderColor: Colours.switchButtonSelected,
    justifyContent: "center",
    alignSelf: "center",
    height: 33,
    width: "40%",
  },
  infoText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 13,
    color: Colours.tint,
  },
  infoButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colours.tint,
    justifyContent: "center",
    alignSelf: "center",
  },
  addText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 24,
    color: Colours.tint,
  },
  addButton: {
    width: 57,
    height: 57,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 20,
    backgroundColor: Colours.screenBackground,
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
    backgroundColor: Colours.screenBackground,
    borderColor: "rgba(0, 0, 0, 0.1)",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
});
