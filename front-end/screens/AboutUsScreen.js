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

export default class AboutUsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      imperial: false,
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
            <Text style={styles.title}>About Us</Text>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={this.props.onCancel}
            >
              <Text style={styles.cancelText}>x</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.divider, { marginBottom: 20 }]}></View>
          <View
            style={{ justifyContent: "center", backgroundColor: "#ffffff" }}
          >
            <Text style={styles.aboutText}>
              Did you know that every year, an average Canadian puts about 140
              kg of food in garbage?
            </Text>
            <Text style={styles.aboutText}>
              Multiplied by an entire population, it equals to saving 9.8
              million tonnes of CO2 and taking 2.1 million cars off the road!*
            </Text>
            <Text style={styles.aboutText}>
              There are different ways of reducing this toll. Let us show you
              how to waste less food and save some pocket change with Wasteless!
            </Text>
            <Text style={styles.aboutText}>
              Don't know what to do with random ingredients? Want to stop
              wasting food?
            </Text>
            <Text style={styles.aboutText}>Search recipes now!</Text>
            <Text style={[styles.aboutText, { fontSize: 11 }]}>
              *Source: Lovefoodhatewaste.ca
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmText}>Learn More</Text>
          </TouchableOpacity>
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
  aboutText: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
    marginVertical: 10,
    marginHorizontal: 25,
  },
  confirmText: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
  },
  confirmButton: {
    width: 148,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#d8d8d8",
    margin: 40,
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
  cancelText: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
  },
  cancelButton: {
    width: 37,
    height: 37,
    borderRadius: 37,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "flex-end",
    backgroundColor: "#ffffff",
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
});
