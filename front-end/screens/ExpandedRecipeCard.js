import * as React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import TextRegular from "../components/TextRegular";
import TextMedium from "../components/TextMedium";
import { Colours } from "../constants/colours.js";
import IngredientsTable from "../components/IngredientsTable";

export default class ExpandedRecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      instructions: [],
      recipeInfo: this.props,
      recipeSource: "",
    };
  }

  componentDidMount() {
    this.getSource(this.state.recipeInfo.recipeId);
    this.getIngredients(this.state.recipeInfo.recipeId);
    this.getInstructions(this.state.recipeInfo.recipeId);
  }

  getSource = (recipeId) => {
    this.setState((state) => ({
      recipeSource: "The Bakery",
    }));
  };

  getIngredients = (recipeId) => {
    this.setState((state) => ({
      ingredients: [
        { name: "Apples", amount: "3", unit: "" },
        { name: "Flour", amount: "500", unit: "g" },
      ],
    }));
  };

  // NOTE: previous group had step numbers
  getInstructions = (recipeId) => {
    this.setState((state) => ({
      instructions: "3.14159265358979323846264338327950288419716939937510",
    }));
  };

  render() {
    return (
      <ScrollView
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
        }}
      >
        <View style={styles.container}>
          <View style={styles.topButtonsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={this.props.onCancel}
            >
              <TextRegular style={styles.cancelText} text={"x"} />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center" }}>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://images-gmi-pmc.edge-generalmills.com/94323808-18ab-4d37-a1ef-d6e1ff5fc7ae.jpg",
              }}
              resizeMethod={"scale"}
            />
          </View>
          <TextRegular
            style={styles.notice}
            text={"Recipe Credits to " + this.state.recipeSource}
          />
          <TextMedium style={styles.header} text={"Pie"} />
          <View style={styles.divider}></View>
          <TextMedium style={styles.subheading} text={"Ingredients"} />
          <IngredientsTable items={this.state.ingredients} />
          <View style={[styles.divider, { marginTop: 10 }]}></View>
          <TextMedium style={styles.subheading} text={"Instructions"} />
          <TextRegular
            style={[styles.subheading, { marginTop: 0 }]}
            text={this.state.instructions}
          />
        </View>
      </ScrollView>
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
    flexDirection: "column",
    justifyContent: "flex-start",
    marginVertical: 5,
    backgroundColor: Colours.screenBackground,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
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
    backgroundColor: Colours.screenBackground,
    margin: 10,
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
  image: {
    height: 200,
    width: "95%",
    margin: 10,
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colours.tint,
    alignSelf: "center",
  },
  header: {
    textAlign: "left",
    fontSize: 24,
    color: Colours.tint,
    margin: 10,
  },
  subheading: {
    textAlign: "left",
    fontSize: 14,
    color: Colours.tint,
    margin: 10,
  },
  notice: {
    textAlign: "right",
    fontSize: 10,
    color: Colours.notice,
    marginHorizontal: 10,
  },
});
