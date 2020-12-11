import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  Linking
} from "react-native";
import TextRegular from "../components/TextRegular";
import TextMedium from "../components/TextMedium";
import RecipeCard from "../components/RecipeCard";
import { Colours } from "../constants/colours.js";
import Modal from "react-native-modal";
import ExpandedRecipeCard from "./ExpandedRecipeCard";
import * as WebBrowser from 'expo-web-browser';
import { json } from "body-parser";

// NOTE: Current items array does not reflect json result from spoonacular
export default class RecipeResultsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeArray: this.props.recipeArray,
      selectedItem: {},
      // email: "",
      visibleModal: 0,
      imageSource: this.props.imageSource,
    };
  }

  // TODO: Add onPressButton as prop for saving
  // CHANGES FROM ORIGINAL: Not passing email or resultId as props
  populateList = () => {
    return this.state.recipeArray.map((result) => (
      <RecipeCard
        key={result.id}
        onPressWhole={() => this.expand(result)}
        onPressButton={() => this.save(result)}
        foodName={result.title}
        description={
          "Preparation Time: " +
          result.readyInMinutes +
          " minutes" +
          "\nServings: " +
          result.servings
        }
        imageUri={
          this.state.imageSource + result.image
        }
      />
    ));
  };

  expand = (result) => {
    console.log("Opening external link...", result.sourceUrl);
    // this.setState({
    //   selectedItem: result,
    //   visibleModal: 1,
    // });
    WebBrowser.openBrowserAsync(result.sourceUrl);
    // Linking.openURL(result.sourceUrl);
  };

  save = (recipe) => {
    // TODO: save recipe to user's saved
    send("addRecipe", recipe, '/' + this.props.username)
    .then(response => response.json())
    .then(json => {
      alert("Recipe has been saved.");
      console.log(json);
    })
    .catch(error => console.log(error));
  }

  closeModal = () => {
    this.setState({
      visibleModal: 0,
    });
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
        <TextMedium style={styles.header} text={this.props.heading} />
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
        <Modal
          isVisible={this.state.visibleModal === 1}
          style={styles.bottomModal}
          avoidKeyboard={false}
        >
          {
            <View style={styles.modal}>
              <ExpandedRecipeCard
                imageUri={
                  this.state.imageSource + this.state.selectedItem.image
                }
                // title={this.state.selectedItem.title}
                // recipeId={this.state.selectedItem.id}
                // recipeSource={this.state.selectedItem.sourceUrl}
                recipeInfo={this.state.selectedItem}
                onCancel={this.closeModal}
              ></ExpandedRecipeCard>
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
