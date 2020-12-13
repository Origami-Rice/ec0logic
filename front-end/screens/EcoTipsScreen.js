import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import TextMedium from "../components/TextMedium";
import TextSemiBold from "../components/TextSemiBold";
import { Colours } from "../constants/colours.js";
import { ActivityIndicator } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import InfoModals from "../constants/InfoModals";
import ExpandTipScreen from "./ExpandTipScreen";
import TipItem from "../components/TipItem";
import { allTips } from "../constants/AllTips";
import send from "../requests/request.js";

import { AuthContext } from "../AuthContext";

export default class EcoTipsScreen extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      savedTips: [],
      tipList: [],
      generateTips: true,
      isLoaded: false,
      tipSelected: {},
      visibleModal: 0,
      savable: true,
    };
  }

  getSavedTips = () => {
    console.log(this.context.user);
    send("getSavedTips", {}, "/" + this.context.user)
      .then((response) => response.json())
      .then((json) => {
        // Returned data is a list of indices into the tips list
        var saved = [];
        for (let i = 0; i < json.length; i++) {
          saved.push(allTips[json[i] - 1]); // Subtract since their indices start at 1
        }
        this.setState({ savedTips: saved, isLoaded: true });
      })
      .catch((err) => {
        console.log(err);
        console.log("Error getting saved tips");
      });
  };

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

  displayItems = () => {
    // Dynamically
    if (this.state.generateTips) {
      return this.state.tipList.map((data) => (
        <TipItem
          key={data.num}
          tip={data.tip}
          onPressWhole={() => this.expand(data)}
          onPressCheck={() => this.saveTip(data.num)}
        />
      ));
    } else {
      if (!this.state.isLoaded) {
        return (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <ActivityIndicator animating={true} colour={Colours.notice} />
          </View>
        );
      } else {
        return this.state.savedTips.map((data, i) => (
          <TipItem
            key={data.num}
            tip={data.tip}
            onPressWhole={() => this.expand(data)}
            onPressCheck={() => this.deleteTip(data.num, i)}
          />
        ));
      }
    }
  };

  expand = (data) => {
    this.setState({
      tipSelected: data,
      visibleModal: 3,
    });
  };

  saveTip = (tipNum) => {
    send("addTip", {}, `/${this.context.user}/${tipNum}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        alert("Tip successfully added.");
        this.setState({ visibleModal: 0, isLoaded: false });
      });
  };

  deleteTip = (tipNum, i) => {
    send("deleteTip", {}, `/${this.context.user}/${tipNum}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        alert("Tip successfully removed.");
        let prev = this.state.savedTips;
        prev.splice(i, 1);
        this.setState({
          savedTips: prev,
        });
      });
  };

  closeModal = () => {
    this.setState({
      visibleModal: 0,
    });
  };

  switchItems = (state) => {
    const prev = this.state.generateTips;

    if (prev && !this.state.isLoaded) {
      this.getSavedTips();
      console.log("getting saved tips");
    }

    this.setState((state) => ({
      generateTips: !state.generateTips,
      savable: !state.savable,
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
                onPress={() => {
                  this.getRandomTipList();
                  this.scrollView.scrollTo({ y: 0, animated: false });
                }}
              >
                <MaterialIcons
                  name="refresh"
                  size={30}
                  color={Colours.tint}
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
              <TextMedium
                style={styles.refreshButtonLabel}
                text={`Generate 10 Tips${"\n"}${" "}`}
              />
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
            <TextSemiBold style={styles.title} text={"Eco Tips"} />
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => this.createInfoWindow()}
            >
              <TextMedium style={styles.infoText} text={"i"} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
          <View
            style={[
              styles.rowContainer,
              {
                justifyContent: "center",
                backgroundColor: Colours.screenBackground,
              },
            ]}
          >
            <TouchableOpacity
              style={
                this.state.generateTips
                  ? [
                      styles.navButton,
                      { backgroundColor: Colours.switchButtonSelected },
                    ]
                  : [
                      styles.navButton,
                      { backgroundColor: Colours.switchButtonNotSelected },
                    ]
              }
              onPress={this.switchItems}
            >
              <TextMedium
                style={
                  this.state.generateTips
                    ? [
                        styles.navText,
                        { color: Colours.switchButtonSelectedText },
                      ]
                    : [
                        styles.navText,
                        { color: Colours.switchButtonNotSelectedText },
                      ]
                }
                text={"Find Tips"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={
                !this.state.generateTips
                  ? [
                      styles.navButton,
                      { backgroundColor: Colours.switchButtonSelected },
                    ]
                  : [
                      styles.navButton,
                      { backgroundColor: Colours.switchButtonNotSelected },
                    ]
              }
              onPress={this.switchItems}
            >
              <TextMedium
                style={
                  !this.state.generateTips
                    ? [
                        styles.navText,
                        { color: Colours.switchButtonSelectedText },
                      ]
                    : [
                        styles.navText,
                        { color: Colours.switchButtonNotSelectedText },
                      ]
                }
                text={"Saved Tips"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
        </View>
        <ScrollView
          style={styles.listContainer}
          ref={(ref) => (this.scrollView = ref)}
        >
          {this.displayItems()}
        </ScrollView>
        {this.showRefresh()}
        <Modal
          isVisible={this.state.visibleModal === 3}
          style={styles.bottomModal}
          avoidKeyboard={false}
        >
          {
            <View style={styles.modal}>
              <ExpandTipScreen
                tip={this.state.tipSelected.tip}
                onCancel={this.closeModal}
                onSave={() => this.saveTip(this.state.tipSelected.num)}
                savable={this.state.savable}
              ></ExpandTipScreen>
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
    color: Colours.tint,
    textAlign: "center",
    alignSelf: "center",
  },
  navText: {
    fontSize: 14,
    color: Colours.tint,
    textAlign: "center",
    alignSelf: "center",
  },
  navButton: {
    borderWidth: 1,
    borderColor: Colours.switchButtonSelected,
    justifyContent: "center",
    alignSelf: "center",
    height: 33,
    width: "40%",
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
  refreshButton: {
    width: 57,
    height: 57,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colours.tint,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: Colours.borderedComponentFill,
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
    fontSize: 10,
    color: Colours.notice,
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
