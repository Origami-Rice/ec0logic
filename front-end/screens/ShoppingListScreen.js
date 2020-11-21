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
import Modal from "react-native-modal";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Constants from "expo-constants";
import ShoppingListItem from "../components/ShoppingListItem";
import ShoppingListInputScreen from "./ShoppingListInputScreen";
import send from "../requests/request";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
};

// TODO: Close modal onpress (detect from child)
export default class ShoppingListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [
        { name: "Butter", quantity: 2 },
        { name: "Cabbage", quantity: "" },
        { name: "Sweet Potato" },
        { name: "Mango" },
        { name: "Apples" },
      ],
      inventoryArray: [],
      fontsLoaded: false,
      modalVisible: 0
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    
    // get user's shopping list from server
    send("getShoppingList", {}, "/test-user")
    .then(response => response.json())
    .then((json) => {
      this.setState({ shoppingList: json });
    })
    .catch(error => {
      console.log("Error getting shopping list");
      console.log(error);
    })

    // get the user's inventory list
    send("getInventory", {}, "/test-user")
    .then(response => response.json())
    .then((json) => {
      this.setState({ inventoryArray: json });
    })
    .catch((error) => {
      console.log("Error getting user inventory");
      console.log(error);
    });

  }

  displayItems = () => {
    // Dynamically
    return this.state.shoppingList.map((data, i) => (
      <ShoppingListItem 
      item={data.name} 
      quantity={data.quantity}
      unitsOfMeasure={data.unitsOfMeasure}
      checkedOff={data.checked_off}
      index={i}
      updateCheck={this.updateCheck} />
    ));
  };
  
  updateCheck = (index) => {
    var currlist = this.state.shoppingList;
    currlist[index].checked_off = !currlist[index].checked_off;
    this.setState({shoppingList: currlist});
  }

  addNewItem = (item) => {
    // add item to shopping list
    const currlist = this.state.shoppingList;
    currlist.push(item);
    this.setState({shoppingList: currlist});

    // add item to server
    send("addToShoppingList", item, '/test-user')
    .then(response => response.json())
    .catch(error => {
      console.log(error);
      console.log("Error adding new item to shopping list");
    });

    // close modal
    this.setState({visibleModal : 0});

  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[styles.rowContainer, { justifyContent: "space-between" }]}
        >
          <Text style={styles.title}>Shopping List</Text>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.infoText}>i</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider}></View>
        <ScrollView style={styles.listContainer}>
          {this.displayItems()}
        </ScrollView>
        <View style={styles.divider}></View>
        <View style={[styles.rowContainer, { justifyContent: "space-around" }]}>
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
            <TouchableOpacity style={styles.addButton}>
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
            <ScrollView
              style={{
                height: Dimensions.get("window").height,
                width: Dimensions.get("window").width,
              }}
            >
              <View style={styles.modal}>
                <ShoppingListInputScreen 
                  addNewItem={this.addNewItem}
                  inventoryArray={this.state.inventoryArray}
                  onCancel={() => this.setState({visibleModal: 0})}>
                </ShoppingListInputScreen>
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
    flexDirection: "column",
    justifyContent: "flex-start",
    marginVertical: 5,
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    flexDirection: "row",
    padding: 8,
    marginVertical: 5,
  },
  listContainer: {
    height: Dimensions.get("window").height * 0.6,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 5,
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
    marginBottom: "20%",
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
