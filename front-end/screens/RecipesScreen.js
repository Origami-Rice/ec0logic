import * as React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import TextRegular from "../components/TextRegular";
import TextMedium from "../components/TextMedium";
import TextSemiBold from "../components/TextSemiBold";
import { Colours } from "../constants/colours.js";
import Modal from "react-native-modal";
import InfoModals from "../Constants/InfoModals";
import * as Font from "expo-font";
import RecipeResultsScreen from "./RecipeResultsScreen";
import send from "../requests/request.js";

import { AuthContext } from "../AuthContext";

const username = "/tester";

let customFonts = {
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
};

export default class RecipesScreen extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isVegan: false,
      isVegetarian: false,
      isGlutenFree: false,
      search: "",
      lastSearch: "",
      recipeSearchResult: [],
      savedRecipes: [
        {
          title: "Pie",
          readyInMinutes: "5",
          servings: "6",
          id: 1,
          image:
            "https://images-gmi-pmc.edge-generalmills.com/94323808-18ab-4d37-a1ef-d6e1ff5fc7ae.jpg",
          sourceUrl: "https://google.com",
        },
      ],
      imageSourceBase: "",
      visibleModal: 0,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  createInfoWindow = () => {
    Alert.alert(
      "Information",
      "Select an option.",
      [
        {
          text: "About Us",
          onPress: () => this.setState({ visibleModal: 2 }),
        },
        {
          text: "Settings",
          onPress: () => this.setState({ visibleModal: 4 }),
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

  toggleVegan = (state) => {
    this.setState((state) => ({
      isVegan: !state.isVegan,
    }));
  };

  toggleVegetarian = (state) => {
    this.setState((state) => ({
      isVegetarian: !state.isVegetarian,
    }));
  };

  toggleGlutenFree = (state) => {
    this.setState((state) => ({
      isGlutenFree: !state.isGlutenFree,
    }));
  };

  closeModal = () => {
    this.setState({
      visibleModal: 0,
    });
  };

  // Set this.state.recipeArray
  getSavedRecipes = () => {
    send("getSavedRecipes", {}, "/" + this.context.user)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.results);

        this.setState({
          savedRecipes: json.results,
          imageSourceBase: json.baseUri,
          visibleModal: 1,
        });
      })
      .catch((error) => console.log(error));
  };

  // Set this.state.recipeArray
  searchForRecipes = () => {
    if (this.state.search.trim() == "") {
      alert("Enter at least 1 ingredient to start searching.");
      return;
    }

    // Separating search
    let searchQuery = this.state.search.trim();
    console.log("[Recipe Search]", searchQuery);

    const diet = this.state.isVegan
      ? "vegan"
      : this.state.isVegetarian
      ? "vegetarian"
      : "";
    const intolerances = this.state.isGlutenFree ? "gluten" : "";

    // if same search, we do not need to re-query
    if (searchQuery + diet + intolerances == this.state.lastSearch) {
      console.log("[Recipe Search] last search");
      this.setState({
        visibleModal: 3,
      });
      return;
    }

    const data = {
      query: searchQuery,
      diet: diet,
      intolerances: intolerances,
    };

    send("searchRecipes", data)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          recipeSearchResult: json.results,
          imageSourceBase: json.baseUri,
          visibleModal: 3,
          lastSearch: searchQuery + diet + intolerances,
        });
        // TODO: activitiy indicator for loading
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteRecipe = (recipe, i) => {
    send("removeRecipe", {}, "/" + this.context.user + "/" + recipe.id)
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          alert("Recipe has been removed.");
          console.log(json);

          // Update the list
          let prev = this.state.savedRecipes;
          prev.splice(i, 1); // Removing the deleted recipe
          this.setState({
            savedRecipes: prev,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  saveRecipe = (recipe, i) => {
    console.log(recipe);
    // TODO: save recipe to user's saved
    send("addRecipe", recipe, "/" + this.context.user)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.success) {
          alert("Recipe has been saved.");
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "flex-start", flex: 1, marginTop: 5 }}>
          <View
            style={[styles.rowContainer, { justifyContent: "space-between" }]}
          >
            <TextSemiBold style={styles.title} text={"Recipes"} />
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => this.createInfoWindow()}
            >
              <TextMedium style={styles.infoText} text={"i"} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
          <ScrollView>
            <View>
              <TouchableOpacity
                style={styles.unitButton}
                onPress={this.getSavedRecipes}
              >
                <TextMedium style={styles.unitText} text={"Saved Recipes"} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextRegular
                style={styles.notice}
                text={"Powered by Spoonacular API"}
              />
              <TextInput
                style={styles.inputFormat}
                placeholder="Ingredient"
                onChangeText={(text) => this.setState({ search: text })}
              />
              <TextRegular
                style={[styles.notice, { marginTop: 0, fontSize: 12 }]}
                text={"Separate ingredients by commas or spaces"}
              />
              <View
                style={[
                  styles.rowContainer,
                  {
                    width: Dimensions.get("window").width * 0.8,
                    paddingHorizontal: 0,
                  },
                ]}
              >
                <TextMedium style={styles.switchText} text={"Vegan"} />
                <Switch
                  trackColor={{
                    false: Colours.toggleSliderNotSelected,
                    true: Colours.toggleSliderSelected,
                  }}
                  thumbColor={Colours.borderedComponentFill}
                  style={{ marginRight: 10, alignSelf: "center" }}
                  value={this.state.isVegan}
                  onValueChange={this.toggleVegan}
                />
              </View>
              <View
                style={[
                  styles.rowContainer,
                  {
                    width: Dimensions.get("window").width * 0.8,
                    paddingHorizontal: 0,
                  },
                ]}
              >
                <TextMedium style={styles.switchText} text={"Vegetarian"} />
                <Switch
                  trackColor={{
                    false: Colours.toggleSliderNotSelected,
                    true: Colours.toggleSliderSelected,
                  }}
                  thumbColor={Colours.borderedComponentFill}
                  style={{ marginRight: 10, alignSelf: "center" }}
                  value={this.state.isVegetarian}
                  onValueChange={this.toggleVegetarian}
                />
              </View>
              <View
                style={[
                  styles.rowContainer,
                  {
                    width: Dimensions.get("window").width * 0.8,
                    paddingHorizontal: 0,
                  },
                ]}
              >
                <TextMedium style={styles.switchText} text={"Gluten-Free"} />
                <Switch
                  trackColor={{
                    false: Colours.toggleSliderNotSelected,
                    true: Colours.toggleSliderSelected,
                  }}
                  thumbColor={Colours.borderedComponentFill}
                  style={{ marginRight: 10, alignSelf: "center" }}
                  value={this.state.isGlutenFree}
                  onValueChange={this.toggleGlutenFree}
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                zIndex: -1,
                marginBottom: 25,
              }}
            >
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={this.searchForRecipes}
              >
                <TextMedium style={styles.confirmText} text={"Find Recipes"} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <Modal
          isVisible={this.state.visibleModal === 1}
          style={styles.bottomModal}
          avoidKeyboard={false}
        >
          {
            <View style={styles.modal}>
              <RecipeResultsScreen
                onCancel={this.closeModal}
                heading={"Your Saved Recipes"}
                recipeArray={this.state.savedRecipes}
                imageSource={this.state.imageSourceBase}
                username={this.context.user}
                clickAction={this.deleteRecipe}
                isDeletable={true}
              ></RecipeResultsScreen>
            </View>
          }
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 3}
          style={styles.bottomModal}
          avoidKeyboard={false}
        >
          {
            <View style={styles.modal}>
              <RecipeResultsScreen
                onCancel={this.closeModal}
                heading={
                  "We Found " +
                  this.state.recipeSearchResult.length +
                  " Recipes"
                }
                recipeArray={this.state.recipeSearchResult}
                imageSource={this.state.imageSourceBase}
                username={this.context.user}
                clickAction={this.saveRecipe}
                isDeletable={false}
              ></RecipeResultsScreen>
            </View>
          }
        </Modal>
        <InfoModals
          visibleModal={this.state.visibleModal}
          closeModal={this.closeModal}
        />
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
    justifyContent: "space-between",
    padding: 8,
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 0,
  },
  title: {
    fontSize: 34,
    color: Colours.tint,
    textAlign: "center",
    alignSelf: "center",
  },
  notice: {
    width: "80%",
    textAlign: "left",
    fontSize: 10,
    color: Colours.notice,
    margin: 10,
  },
  inputFormat: {
    width: "80%",
    height: 31,
    backgroundColor: Colours.screenBackground,
    borderColor: Colours.tint,
    borderBottomWidth: 1,
    fontSize: 14,
    color: Colours.tint,
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
  },
  switchText: {
    flex: 1,
    fontSize: 14,
    color: Colours.tint,
    margin: 10,
  },
  unitText: {
    fontSize: 14,
    color: Colours.filledButtonText,
    textAlign: "center",
    alignSelf: "center",
  },
  unitButton: {
    borderRadius: 30,
    backgroundColor: Colours.filledButton,
    justifyContent: "center",
    alignSelf: "flex-start",
    height: 28,
    width: 125,
    marginHorizontal: 5,
    marginTop: 10,
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
    backgroundColor: Colours.borderedComponentFill,
    justifyContent: "center",
    alignSelf: "center",
  },
  confirmText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    color: Colours.filledButtonText,
    zIndex: 1,
  },
  confirmButton: {
    width: 148,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: Colours.filledButton,
    marginVertical: 15,
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
    zIndex: 1,
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
