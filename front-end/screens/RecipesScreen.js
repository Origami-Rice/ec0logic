import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import TextRegular from "../components/TextRegular";
import TextMedium from "../components/TextMedium";
import TextSemiBold from "../components/TextSemiBold";
import { Colours } from "../Constants/colours.js";
import Modal from "react-native-modal";
import * as Font from "expo-font";
import AboutUsScreen from "./AboutUsScreen";
import send from "../requests/request.js";

const username = "/tester";

let customFonts = {
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
};

export default class RecipesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isVegan: false,
      isVegetarian: false,
      isGlutenFree: false,
      ingredient: "",
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

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
              onPress={() => this.setState({ visibleModal: 2 })}
            >
              <TextMedium style={styles.infoText} text={"i"} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
          <View>
            <TouchableOpacity
              style={styles.unitButton}
              onPress={this.switchItems}
            >
              <TextMedium style={styles.unitText} text={"Saved Recipes"} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputFormat} placeholder="Ingredient" />
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
                  false: Colours.navActiveTint,
                  true: Colours.navInactiveTint,
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
                  false: Colours.navActiveTint,
                  true: Colours.navInactiveTint,
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
                  false: Colours.navActiveTint,
                  true: Colours.navInactiveTint,
                }}
                thumbColor={Colours.borderedComponentFill}
                style={{ marginRight: 10, alignSelf: "center" }}
                value={this.state.isGlutenFree}
                onValueChange={this.toggleGlutenFree}
              />
            </View>
          </View>
        </View>
        <View
          style={{ justifyContent: "flex-end", zIndex: -1, marginBottom: 25 }}
        >
          <TouchableOpacity style={styles.confirmButton}>
            <TextMedium style={styles.confirmText} text={"Find Recipes"} />
          </TouchableOpacity>
        </View>
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
    color: Colours.tint,
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
    color: Colours.tint,
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