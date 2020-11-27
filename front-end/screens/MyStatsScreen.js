import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Constants from "expo-constants";
import send from "../requests/request.js";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
};

export default class MyStatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      imperial: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  displayItems = () => {
    // Dynamically
    if (this.state.imperial) {
      return <Text style={styles.statsNumber}>123 lb</Text>;
    } else {
      return <Text style={styles.statsNumber}>123 kg</Text>;
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
        <View style={{ justifyContent: "flex-start", flex: 0, marginTop: 5 }}>
          <View
            style={[styles.rowContainer, { justifyContent: "space-between" }]}
          >
            <Text style={styles.title}>My Stats</Text>
            <TouchableOpacity style={styles.infoButton}>
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
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.statsDescription}>Your footprint is</Text>
            {this.displayItems()}
            <Text style={styles.statsDescription}>of GHG this week</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            flex: 0,
          }}
        >
          <View style={styles.divider}></View>
        </View>
        <View>
          {/* TODO: values change depending on unit of measurement */}
          {/* TODO: see if there's a way to pass a custom for propsForLabels */}
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May"],
              datasets: [
                {
                  data: [500, 663, 302, 50, 888],
                },
              ],
            }}
            width={Dimensions.get("window").width}
            height={180}
            yAxisSuffix={this.state.imperial ? "lb" : "kg"}
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
        </View>
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
});
