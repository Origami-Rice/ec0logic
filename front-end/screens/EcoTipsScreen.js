import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import * as Font from "expo-font";
import AboutUsScreen from "./AboutUsScreen";
import TipItem from "../components/TipItem";
import { allTips } from "../Constants/AllTips";
import send from "../requests/request.js";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
};

let username = "/tester";

export default class EcoTipsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedTips: [],
      tipList: [],
      generateTips: true,
      fontsLoaded: false,
      isLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  getRandomTipList = () => {
    let randomNums = [];
    let randomTips = [];
    while (randomTips.length < 10) {
      var RandomNumber = Math.floor(Math.random() * 100) + 1;
      for (let i = 0; i < allTips.length; i++) {
        if (
          allTips[i].num == RandomNumber &&
          !randomNums.includes(RandomNumber)
        ) {
          randomTips.push(allTips[i]);
          randomNums.push(RandomNumber);
        }
      }
    }

    this.setState({ tipList: randomTips });
  };

  displayItems = () => {
    // Dynamically
    if (this.state.generateTips) {
      return this.state.tipList.map((data) => <TipItem tip={data.tip} />);
    } else {
      return this.state.savedTips.map((data) => <TipItem tip={data.tip} />);
    }
  };

  switchItems = (state) => {
    this.setState((state) => ({
      generateTips: !state.generateTips,
    }));
  };

  showRefresh = () => {
    if (this.state.generateTips) {
      return (
        <View>
          <View style={styles.divider}></View>
          <View
            style={{
              justifyContent: "flex-start",
              flex: 0,
              margin: 5,
              padding: 8,
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={() => this.getRandomTipList()}
              >
                <MaterialIcons
                  name="refresh"
                  size={30}
                  color="black"
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
              <Text style={styles.refreshButtonLabel}>
                Generate 10 Tips{"\n"}{" "}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "flex-start", flex: 0, marginTop: 5 }}>
          <View
            style={[styles.rowContainer, { justifyContent: "space-between" }]}
          >
            <Text style={styles.title}>Eco Tips</Text>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => this.setState({ visibleModal: 2 })}
            >
              <Text style={styles.infoText}>i</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
          <View
            style={[
              styles.rowContainer,
              { justifyContent: "center", backgroundColor: "#ffffff" },
            ]}
          >
            <TouchableOpacity
              style={
                this.state.generateTips
                  ? [styles.navButton, { backgroundColor: "#5A5A5A" }]
                  : [styles.navButton, { backgroundColor: "#ffffff" }]
              }
              onPress={this.switchItems}
            >
              <Text
                style={
                  this.state.generateTips
                    ? [styles.navText, { color: "#ffffff" }]
                    : [styles.navText, { color: "#000000" }]
                }
              >
                Find Tips
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                !this.state.generateTips
                  ? [styles.navButton, { backgroundColor: "#5A5A5A" }]
                  : [styles.navButton, { backgroundColor: "#ffffff" }]
              }
              onPress={this.switchItems}
            >
              <Text
                style={
                  !this.state.generateTips
                    ? [styles.navText, { color: "#ffffff" }]
                    : [styles.navText, { color: "#000000" }]
                }
              >
                Saved Tips
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
        </View>
        <ScrollView style={styles.listContainer}>
          {this.displayItems()}
        </ScrollView>
        {this.showRefresh()}
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
    backgroundColor: "#CCC5C5",
  },
  container: {
    flex: 1,
    padding: 8,
    paddingBottom: 0,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  rowContainer: {
    flexDirection: "row",
    padding: 8,
    marginVertical: 5,
  },
  listContainer: {
    flex: 1,
    flexGrow: 1,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
  navText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    textAlign: "center",
    alignSelf: "center",
  },
  navButton: {
    borderWidth: 1,
    borderColor: "#5A5A5A",
    justifyContent: "center",
    alignSelf: "center",
    height: 33,
    width: "40%",
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
  refreshButton: {
    width: 57,
    height: 57,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
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
  refreshButtonLabel: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 8,
    color: "#BDBDBD",
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
