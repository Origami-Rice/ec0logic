import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import * as Font from "expo-font";
import { AppLoading } from "expo";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
};

export default class FinishedFoodScreen extends React.Component {
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.header}>PITA BREAD</Text>
          <Text style={styles.label}>Enter the amount that you finished:</Text>
          <View style={styles.inputWithDetails}>
            <Text style={[styles.notice, { color: "#C90000", marginTop: 10 }]}>
              Please enter an amount.
            </Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.inputFormat} placeholder="Amount" />
              <View
                style={{
                  width: Dimensions.get("window").width * 0.4,
                  justifyContent: "center",
                }}
              >
                <Text style={styles.unitText}>Package(s)</Text>
              </View>
            </View>
            <Text style={[styles.notice, { color: "#BDBDBD" }]}>
              You had 2 packages remaining.
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: "flex-end", flex: 1 }}>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmText}>Confirm Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.confirmButton,
              { marginBottom: Dimensions.get("window").height * 0.1 },
            ]}
          >
            <Text style={styles.confirmText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#ffffff",
  },
  inputContainer: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inputWithDetails: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 24,
    marginTop: 40,
  },
  label: {
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    marginBottom: 5,
    marginTop: 40,
  },
  notice: {
    width: Dimensions.get("window").width * 0.8,
    textAlign: "left",
    fontFamily: "Montserrat_500Medium",
    fontSize: 10,
    marginHorizontal: 10,
  },
  inputFormat: {
    width: Dimensions.get("window").width * 0.4,
    height: 31,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 1,
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    marginHorizontal: 10,
    textAlign: "left",
    fontFamily: "Montserrat_500Medium",
  },
  unitText: {
    textAlign: "left",
    fontFamily: "Montserrat_500Medium",
    fontSize: 12,
  },
  confirmText: {
    textAlign: "center",
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
  },
});
