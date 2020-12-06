import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import TextMedium from "../components/TextMedium";
import TextSemiBold from "../components/TextSemiBold";
import { Colours } from "../constants/colours.js";
import { LineChart } from "react-native-chart-kit";
import Modal from "react-native-modal";

import AboutUsScreen from "./AboutUsScreen";
import RecentlyWastedTable from "../components/RecentlyWastedTable";
import send from "../requests/request.js";

const username = "/tester";

export default class MyStatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imperial: false,
      emissionsThisWeek: {},
      emissionsLastWeek: {},
      monthlyBreakdown: { months: [], kg: [], lbs: [] },
    };
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
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this._loadData();
    });
  }

  displayItems = () => {
    // Dynamically
    if (this.state.imperial) {
      return (
        <TextSemiBold
          style={styles.statsNumber}
          text={`${this.state.emissionsThisWeek.lbs} lbs`}
        />
      );
    } else {
      return (
        <TextSemiBold
          style={styles.statsNumber}
          text={`${this.state.emissionsThisWeek.kg} kg`}
        />
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
            <TextSemiBold style={styles.title} text={"My Stats"} />
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => this.setState({ visibleModal: 2 })}
            >
              <TextMedium style={styles.infoText} text={"i"} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
          <ScrollView>
            <TouchableOpacity
              style={styles.unitButton}
              onPress={this.switchItems}
            >
              <TextMedium
                style={styles.unitText}
                text={this.state.imperial ? "Metric" : "Imperial"}
              />
            </TouchableOpacity>
            <View style={{ marginVertical: 10 }}>
              <TextMedium
                style={styles.statsDescription}
                text={"Your footprint is"}
              />
              {this.displayItems()}
              <TextMedium
                style={styles.statsDescription}
                text={"of CO2 this week"}
              />
            </View>
            <View style={styles.divider}></View>
            <TextSemiBold style={styles.subheading} text={"History"} />
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
                backgroundGradientFrom: Colours.screenBackground,
                backgroundGradientTo: Colours.screenBackground,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForLabels: {
                  fontSize: 10,
                },
                propsForBackgroundLines: {
                  stroke: Colours.filledButton,
                },
              }}
              style={{
                marginVertical: 10,
                borderRadius: 16,
                fontFamily: "Montserrat_400Regular",
                color: Colours.tint,
              }}
            />
            <View style={styles.divider}></View>
            <TextSemiBold style={styles.subheading} text={"Recently Expired"} />
            <RecentlyWastedTable
              items={[
                {
                  name: "Pineapple",
                  dateWasted: "blah",
                  quantity: 50,
                  unitsOfMeasure: "g",
                },
                {
                  name: "Blueberries",
                  dateWasted: "blah",
                  quantity: 30,
                  unitsOfMeasure: "g",
                },
              ]}
            ></RecentlyWastedTable>
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
  title: {
    fontSize: 34,
    color: Colours.tint,
    textAlign: "center",
    alignSelf: "center",
  },
  subheading: {
    fontSize: 14,
    color: Colours.tint,
    textAlign: "left",
    margin: 5,
    marginTop: 15,
  },
  statsDescription: {
    fontSize: 24,
    color: Colours.tint,
    textAlign: "center",
    alignSelf: "center",
  },
  statsNumber: {
    fontSize: 72,
    color: Colours.tint,
    textAlign: "center",
    alignSelf: "center",
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
    width: "25%",
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
