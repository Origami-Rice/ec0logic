import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import TextRegular from "./TextRegular";
import TextMedium from "./TextMedium";

export default class RecentlyExpiredTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{}].concat(this.props.items),
    };
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
          {i !== 0 ? (
            <TextRegular style={styles.infoText} text={item.name} />
          ) : (
            <TextMedium style={styles.infoText} text={"Item"} />
          )}
        </View>
        <View
          style={
            i !== 0
              ? styles.cell
              : [styles.cell, { backgroundColor: "#D8D8D8" }]
          }
        >
          {i !== 0 ? (
            <TextRegular style={styles.infoText} text={item.expiryDate} />
          ) : (
            <TextMedium style={styles.infoText} text={"Expiry Date"} />
          )}
        </View>
        <View
          style={
            i !== 0
              ? styles.cell
              : [styles.cell, { backgroundColor: "#D8D8D8" }]
          }
        >
          {i !== 0 ? (
            <TextRegular
              style={styles.infoText}
              text={`${item.quantity} ${item.unitsOfMeasure}`}
            />
          ) : (
            <TextMedium style={styles.infoText} text={"Quantity"} />
          )}
        </View>
      </View>
    ));
  }

  render() {
    return <View style={styles.viewFormat}>{this.createRows()}</View>;
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
    fontSize: 11,
    fontColor: "black",
    textAlign: "left",
  },
});
