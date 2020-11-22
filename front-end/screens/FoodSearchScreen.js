import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import { ListItem } from "react-native-elements";
import LibraryListItem from "../components/LibraryListItem";

import send from "../requests/request.js";
import endpoints from "../requests/endpoints.js";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
};

export default class FoodSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      items: [],
      itemsFiltered: [],
    };
  }

  componentDidMount() {
    send("getFoodLibrary")
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          items: json,
          itemsFiltered: json,
        });
      })
      .catch((error) => {
        console.log("Error getting food library");
        console.log(error);
      });
  }

  // Filter list items based on
  searchItem(textToSearch) {
    this.setState({
      itemsFiltered: this.state.items.filter((i) =>
        i.name.toLowerCase().includes(textToSearch.toLowerCase())
      ),
      search: textToSearch,
    });
  }

  getSearch = () => {
    alert(this.state.search);
  };

  onSelectItem = (item) => {
    alert("Item selected " + item.name);
    const { setSearchItem } = this.props; // Callback function in parent
    setSearchItem(item);
  };

  populateList = () => {
    return this.state.itemsFiltered.map((item) => (
      <LibraryListItem
        item={item.name}
        shelfLife={item.days}
        onPress={() => this.onSelectItem(item)}
      />
    ));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={this.props.onCancel}
          >
            <Text style={styles.cancelText}>x</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Search Common Foods"
          style={styles.inputFormat}
          onChangeText={(text) => {
            this.searchItem(text);
          }}
        />
        <ScrollView style={styles.listContainer}>
          {this.populateList()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    padding: 8,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  listContainer: {
    paddingVertical: 5,
  },
  inputFormat: {
    height: 31,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderBottomWidth: 1,
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
    zIndex: 1,
  },
  topButtonsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  cancelText: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    zIndex: 1,
  },
  cancelButton: {
    width: 37,
    height: 37,
    borderRadius: 37,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "flex-end",
    backgroundColor: "#ffffff",
    margin: 25,
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0, .5)",
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
