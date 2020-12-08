import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import TextRegular from "../components/TextRegular";
import TextMedium from "../components/TextMedium";
import RecipeCard from "../components/RecipeCard";
import { Colours } from "../constants/colours.js";

// NOTE: Current items array does not reflect json result from spoonacular
export default class FoundRecipesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { foodName: "Pie", description: "Yummy" },
        { foodName: "Pie", description: "Yummy" },
        { foodName: "Pie", description: "Yummy" },
        { foodName: "Pie", description: "Yummy" },
      ],
    };
  }

  populateList = () => {
    return this.state.items.map((item) => (
      <RecipeCard
        foodName={item.foodName}
        description={item.description}
        imageURL={
          "https://images-gmi-pmc.edge-generalmills.com/94323808-18ab-4d37-a1ef-d6e1ff5fc7ae.jpg"
        }
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
        <TextMedium style={styles.header} text={"We Found 4 Recipes"} />
        <View style={styles.divider}></View>
        <ScrollView style={styles.listContainer}>
          {this.populateList()}
        </ScrollView>
        <View
          style={[
            styles.divider,
            {
              marginBottom: Dimensions.get("window").height * 0.1,
            },
          ]}
        ></View>
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
  topButtonsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    color: Colours.tint,
    margin: 10,
    marginTop: 0,
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
    backgroundColor: Colours.screenBackground,
    margin: 25,
    marginBottom: 5,
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
