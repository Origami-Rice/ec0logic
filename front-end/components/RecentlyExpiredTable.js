import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";

let customFonts = {
  Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
};

export default class RecentlyExpiredTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{}].concat(this.props.items),
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  createRows() {
    return this.state.items.map((item, i) => (
      <View style={styles.row}>
        <View
          style={
            i !== 0
              ? styles.cell
              : [styles.cell, { backgroundColor: "#D8D8D8" }]
          }
        >
          <Text
            style={
              i !== 0
                ? styles.infoText
                : [styles.infoText, { fontFamily: "Montserrat_500Medium" }]
            }
          >
            {i !== 0 ? item.name : "Item"}
          </Text>
        </View>
        <View
          style={
            i !== 0
              ? styles.cell
              : [styles.cell, { backgroundColor: "#D8D8D8" }]
          }
        >
          <Text
            style={
              i !== 0
                ? styles.infoText
                : [styles.infoText, { fontFamily: "Montserrat_500Medium" }]
            }
          >
            {i !== 0 ? item.expiryDate : "Expiry Date"}
          </Text>
        </View>
        <View
          style={
            i !== 0
              ? styles.cell
              : [styles.cell, { backgroundColor: "#D8D8D8" }]
          }
        >
          <Text
            style={
              i !== 0
                ? styles.infoText
                : [styles.infoText, { fontFamily: "Montserrat_500Medium" }]
            }
          >
            {i !== 0 ? `${item.quantity} ${item.unitsOfMeasure}` : "Quantity"}
          </Text>
        </View>
      </View>
    ));
  }

  render() {
    if (this.state.fontsLoaded) {
      return <View style={styles.viewFormat}>{this.createRows()}</View>;
    } else {
      return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  viewFormat: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    zIndex: 2500,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    height: 30,
    width: Dimensions.get("window").width * 0.3,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  infoText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 11,
    fontColor: "black",
    textAlign: "left",
  },
});
