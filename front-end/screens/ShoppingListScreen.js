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
import ShoppingListItem from "../components/ShoppingListItem";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
};

// SHOPPING LIST SCREEN
export default class ShoppingListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingListArray: [
        { name: "Butter", quantity: 2 },
        { name: "Cabbage", quantity: "" },
        { name: "Sweet Potato" },
        { name: "Mango" },
        { name: "Apples" },
      ],
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  displayItems = () => {
    // Dynamically
    return this.state.shoppingListArray.map((data) => (
      <ShoppingListItem item={data.name} />
    ));
  };

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
              <View style={styles.modal}></View>
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
    // iOS shadow
    shadowColor: "rgba(0,0,0, .5)",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // Android shadow
    elevation: 4,
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
