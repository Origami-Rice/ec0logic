import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import TextRegular from "../components/TextRegular";
import TextMedium from "../components/TextMedium";
import TextSemiBold from "../components/TextSemiBold";

export default class AboutUsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imperial: false,
      visibleModal: 0,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "flex-start", flex: 0, marginTop: 5 }}>
          <View style={[styles.rowContainer, { justifyContent: "flex-start" }]}>
            <Image
              source={require("../assets/wasteless-logo.png")}
              style={{ height: 44, width: 53, marginRight: 10 }}
            />
            <TextSemiBold style={styles.title} text={"About Us"} />
            <View style={{ justifyContent: "flex-end", flex: 1 }}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={this.props.onCancel}
              >
                <TextRegular style={styles.cancelText} text={"x"} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.divider, { marginBottom: 20 }]}></View>
          <View
            style={{ justifyContent: "center", backgroundColor: "#ffffff" }}
          >
            <TextRegular
              style={styles.aboutText}
              text={
                "Did you know that every year, an average Canadian puts about 140 kg of food in garbage?"
              }
            />
            <TextRegular
              style={styles.aboutText}
              text={
                "Multiplied by an entire population, it equals to saving 9.8 million tonnes of CO2 and taking 2.1 million cars off the road!*"
              }
            />
            <TextRegular
              style={styles.aboutText}
              text={
                "There are different ways of reducing this toll. Let us show you how to waste less food and save some pocket change with Wasteless!"
              }
            />
            <TextRegular
              style={styles.aboutText}
              text={
                "Don't know what to do with random ingredients? Want to stop wasting food?"
              }
            />
            <TextRegular
              style={styles.aboutText}
              text={"Search recipes now!"}
            />
            <TextRegular
              style={[styles.aboutText, { fontSize: 11 }]}
              text={"*Source: Lovefoodhatewaste.ca"}
            />
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity style={styles.confirmButton}>
            <TextMedium style={styles.confirmText} text={"Learn More"} />
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
  },
  aboutText: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: 25,
  },
  confirmText: {
    textAlign: "center",
    alignSelf: "center",
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
