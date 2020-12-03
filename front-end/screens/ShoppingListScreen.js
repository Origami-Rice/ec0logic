import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import Modal from "react-native-modal";
import * as Font from "expo-font";
import ShoppingListItem from "../components/ShoppingListItem";
import ShoppingListInputScreen from "./ShoppingListInputScreen";
import ShoppingListEditScreen from './ShoppingListEditScreen';
import AboutUsScreen from "./AboutUsScreen";
import send from "../requests/request";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
};

let username = "/tester";

export default class ShoppingListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [],
      inventoryArray: [],
      fontsLoaded: false,
      modalVisible: 0,
      isLoaded: false,
      itemSelected: {},
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  _loadData = () => {
    this.setState({ isLoaded: false });
    // get user's shopping list from server
    send("getShoppingList", {}, username)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ shoppingList: json, isLoaded: true });
      })
      .catch((error) => {
        console.log("Error getting shopping list");
        console.log(error);
      });

    // get the user's inventory list
    send("getInventory", {}, username)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ inventoryArray: json });
      })
      .catch((error) => {
        console.log("Error getting user inventory");
        console.log(error);
      });
  };

  componentDidMount() {
    this._loadFontsAsync();

    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this._loadData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  displayItems = () => {
    if (!this.state.isLoaded) {
      return (
      <View style={{flex: 1, alignItems:'center', justifyContent: 'center', padding: 24}}> 
        <ActivityIndicator animating={true} colour={"grey"}/>
      </View>);  
    } else {
      const now = new Date().toISOString();
      // Dynamically
      return this.state.shoppingList.map((data, i) => (
        <ShoppingListItem
          key={data.name + now}
          item={data.name}
          quantity={data.quantity}
          unitsOfMeasure={data.unitsOfMeasure}
          checkedOff={data.checked_off}
          index={i}
          updateCheck={this.updateCheck}
          onPress={() => this.toEdit(data, i)}
        />
      ));
    }
  };

  toEdit = (item, index) => {
    var currlist = this.state.shoppingList;
    currlist.splice(index, 1);

    // Delete item from shopping list
    this.setState({shoppingList: currlist, itemSelected: item, visibleModal: 3});
    // Update the list in server
    this.updateList(currlist);
  }

  updateCheck = (index) => {
    var currlist = this.state.shoppingList;
    currlist[index].checked_off = !currlist[index].checked_off;
    this.setState({ shoppingList: currlist });

    // send back to server
    this.updateList(currlist);
  };

  updateList = (updatedList) => {
    send("updateShoppingList", updatedList, username)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        console.log("Error updating shopping list");
      });
  };

  addNewItem = (item) => {
    // add item to shopping list
    const currlist = this.state.shoppingList;
    currlist.push(item);
    this.setState({ shoppingList: currlist });

    // add item to server
    send("addToShoppingList", item, username)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        console.log("Error adding new item to shopping list");
      });

    // close modal
    this.setState({ visibleModal: 0 });
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

  addCheckedOffToInventory = () => {
    const { shoppingList } = this.state;
    var currInventory = this.state.inventoryArray;

    var defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);

    var quantity_missing = false;
    var unchecked = [];
    // create a list of unchecked items to be new shopping list
    for (let i = 0; i < shoppingList.length; i++) {
      let item = shoppingList[i];
      if (item.checked_off && item.quantity !== 0) {
        currInventory.push({
          name: item.name,
          quantity: item.quantity,
          unitsOfMeasure: item.unitsOfMeasure,
          expiryDate: defaultDate, // Default expiry date is a week from today
        });
      } else {
        if (item.checked_off) {
          quantity_missing = true;
        }
        unchecked.push(item);
      }
    }

    if (quantity_missing) {
      alert("Some checked off items had no quantities specified. " + 
        "These were not added to your inventory. " + 
        "Please edit these items and try again if you wish to add them.")
    }

    this.setState({
      inventoryArray: currInventory,
      shoppingList: unchecked,
    });

    this.updateList(unchecked);
    this.updateInventory(currInventory);
  };

  render() {
    // if (!this.state.fontsLoaded) {
    //   return <AppLoading />;
    // }
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "flex-start", flex: 0, marginTop: 5 }}>
          <View
            style={[styles.rowContainer, { justifyContent: "space-between" }]}
          >
            <Text style={styles.title}>Shopping List</Text>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => this.setState({ visibleModal: 2 })}
            >
              <Text style={styles.infoText}>i</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
        </View>
        <ScrollView style={styles.listContainer}>
          {this.displayItems()}
        </ScrollView>
        <View style={styles.divider}></View>
        <View
          style={[
            styles.rowContainer,
            { justifyContent: "flex-start", flex: 0 },
          ]}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => this.setState({ visibleModal: 1 })}
            >
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.addButtonLabel}>
              Add New Item to List{"\n"}{" "}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={this.addCheckedOffToInventory}
            >
              <Text style={styles.addText}>↑</Text>
            </TouchableOpacity>
            <Text style={styles.addButtonLabel}>
              Add Checked Off Items{"\n"}to Inventory
            </Text>
          </View>
        </View>
        <Modal
          isVisible={this.state.visibleModal === 1}
          style={styles.bottomModal}
          avoidKeyboard={false}
        >
          {
            <View style={styles.modal}>
              <ShoppingListInputScreen
                addNewItem={this.addNewItem}
                inventoryArray={this.state.inventoryArray}
                onCancel={() => this.setState({ visibleModal: 0 })}
              ></ShoppingListInputScreen>
            </View>
          }
        </Modal>
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
        <Modal
          isVisible={this.state.visibleModal === 3}
          style={styles.bottomModal}
          avoidKeyboard={false}>
          {
            <View style={styles.modal}>
              <ShoppingListEditScreen
                addNewItem={this.addNewItem}
                item={this.state.itemSelected}
                onCancel={() =>
                  this.setState({ visibleModal: 0 })}
                onDelete={() => this.setState({ visibleModal: 0 })}
                >
                </ShoppingListEditScreen>
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
    justifyContent: "space-between",
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
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 34,
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_600SemiBold",
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
    marginBottom: 15,
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
  addButtonLabel: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 8,
    color: "#BDBDBD",
  },
  modal: {
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.1)",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  bottomModal: {
    margin: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "absolute",
    top: 0,
  },
});
