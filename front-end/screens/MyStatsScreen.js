import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Modal from "react-native-modal";
import * as Font from "expo-font";

import AboutUsScreen from "./AboutUsScreen";
import RecentlyExpiredTable from "../components/RecentlyExpiredTable";
import send from "../requests/request.js";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
};

const username = "/tester";

export default class MyStatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      imperial: false,
      emissionsThisWeek: {},
      emissionsLastWeek: {},
      monthlyBreakdown: { months: [], kg: [], lbs: [] },
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  _loadData = () => {
    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    let timePeriod = {
      start: weekAgo,
      end: new Date(),
    };
    // Getting the GHG for the last week
    send("getGHG", timePeriod, username)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          emissionsThisWeek: json.emissions,
        });

        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });

    send("getGHG", timePeriod, username)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          emissionsThisWeek: json.emissions,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    send("getMonthlyGHGBreakdown", {}, username)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ monthlyBreakdown: json });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this._loadFontsAsync();
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this._loadData();
    });
  }

  displayItems = () => {
    // Dynamically
    if (this.state.imperial) {
      return (
        <Text style={styles.statsNumber}>
          {this.state.emissionsThisWeek.lbs} lbs
        </Text>
      );
    } else {
      return (
        <Text style={styles.statsNumber}>
          {this.state.emissionsThisWeek.kg} kg
        </Text>
      );
    }
  };

  switchItems = (state) => {
    this.setState((state) => ({
      imperial: !state.imperial,
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "flex-start", flex: 1, marginTop: 5 }}>
          <View
            style={[styles.rowContainer, { justifyContent: "space-between" }]}
          >
            <Text style={styles.title}>My Stats</Text>
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
                this.state.imperial
                  ? [styles.navButton, { backgroundColor: "#5A5A5A" }]
                  : [styles.navButton, { backgroundColor: "#ffffff" }]
              }
              onPress={this.switchItems}
            >
              <Text
                style={
                  this.state.imperial
                    ? [styles.navText, { color: "#ffffff" }]
                    : [styles.navText, { color: "#000000" }]
                }
              >
                Imperial
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                !this.state.imperial
                  ? [styles.navButton, { backgroundColor: "#5A5A5A" }]
                  : [styles.navButton, { backgroundColor: "#ffffff" }]
              }
              onPress={this.switchItems}
            >
              <Text
                style={
                  !this.state.imperial
                    ? [styles.navText, { color: "#ffffff" }]
                    : [styles.navText, { color: "#000000" }]
                }
              >
                Metric
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
          <ScrollView>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.statsDescription}>Your footprint is</Text>
              {this.displayItems()}
              <Text style={styles.statsDescription}>of CO2 this week</Text>
            </View>
            <View style={styles.divider}></View>
            <Text style={styles.subheading}>History</Text>
            <LineChart
              data={{
                labels: this.state.monthlyBreakdown.months,
                datasets: [
                  {
                    data: this.state.imperial
                      ? this.state.monthlyBreakdown.kg
                      : this.state.monthlyBreakdown.lbs,
                  },
                ],
              }}
              width={Dimensions.get("window").width}
              height={180}
              yAxisSuffix={this.state.imperial ? " lbs" : " kg"}
              withVerticalLines={false}
              withShadow={false}
              chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForLabels: {
                  fontSize: 10,
                },
                propsForBackgroundLines: {
                  stroke: "#D5D5D5",
                },
              }}
              style={{
                marginVertical: 10,
                borderRadius: 16,
                fontFamily: "Montserrat_400Regular",
              }}
            />
            <View style={styles.divider}></View>
            <Text style={styles.subheading}>Recently Expired</Text>
            <RecentlyExpiredTable
              items={[
                {
                  name: "Pineapple",
                  expiryDate: "blah",
                  quantity: 50,
                  unitsOfMeasure: "g",
                },
                {
                  name: "Blueberries",
                  expiryDate: "blah",
                  quantity: 30,
                  unitsOfMeasure: "g",
                },
              ]}
            ></RecentlyExpiredTable>
          </ScrollView>
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
    backgroundColor: "#CCC5C5",
  },
  container: {
    flex: 1,
    padding: 8,
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
  title: {
    fontSize: 34,
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
  subheading: {
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Montserrat_600SemiBold",
    margin: 5,
    marginTop: 15,
  },
  statsDescription: {
    fontSize: 24,
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_500Medium",
  },
  statsNumber: {
    fontSize: 72,
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
