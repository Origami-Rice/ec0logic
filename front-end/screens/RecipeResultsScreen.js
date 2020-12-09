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
import Modal from "react-native-modal";
import ExpandedRecipeCard from "./ExpandedRecipeCard";

// NOTE: Current items array does not reflect json result from spoonacular
export default class RecipeResultsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeArray: this.props.recipeArray,
      selectedItem: {},
      email: "",
      visibleModal: 0,
    };
  }

  // TODO: Add onPressButton as prop for saving
  // CHANGES FROM ORIGINAL: Not passing email or resultId as props
  populateList = () => {
    return this.state.recipeArray.map((result) => (
      <RecipeCard
        onPressWhole={(result) => this.expand(result)}
        foodName={result.title}
        description={
          "Preparation Time: " +
          result.readyInMinutes +
          " minutes" +
          "\nServings: " +
          result.servings
        }
        imageUri={
          "https://images-gmi-pmc.edge-generalmills.com/94323808-18ab-4d37-a1ef-d6e1ff5fc7ae.jpg"
        }
      />
    ));
  };

  expand = (result) => {
    this.setState({
      selectedItem: result,
      visibleModal: 1,
    });
  };

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
                  "https://images-gmi-pmc.edge-generalmills.com/94323808-18ab-4d37-a1ef-d6e1ff5fc7ae.jpg"
                }
                title={this.state.selectedItem.title}
                recipeId={this.state.selectedItem.id}
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
