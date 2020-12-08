import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import TextRegular from "../components/TextRegular";
import { Colours } from "../constants/colours.js";
import LibraryListItem from "../components/LibraryListItem";

import send from "../requests/request.js";

let customFonts = {
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
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

  onSelectItem = (item) => {
    console.log("Food Search -- Item selected " + item.name);
    const { setSearchItem } = this.props; // Callback function in parent
    setSearchItem(item);
  };

  populateList = () => {
    return this.state.itemsFiltered.map((item) => (
      <LibraryListItem
        key={item.name + item.days}
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
            <TextRegular style={styles.cancelText} text={"x"} />
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
    backgroundColor: Colours.screenBackground,
    padding: 8,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  listContainer: {
    paddingVertical: 5,
  },
  inputFormat: {
    height: 31,
    backgroundColor: Colours.borderedComponentFill,
    borderColor: Colours.tint,
    borderBottomWidth: 1,
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
    color: Colours.tint,
    zIndex: 1,
  },
  topButtonsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  cancelText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    color: Colours.tint,
    zIndex: 1,
  },
  cancelButton: {
    width: 37,
    height: 37,
    borderRadius: 37,
    borderWidth: 1,
    borderColor: Colours.tint,
    justifyContent: "center",
    alignSelf: "flex-end",
    backgroundColor: Colours.borderedComponentFill,
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
