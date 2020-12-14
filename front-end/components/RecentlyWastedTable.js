import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import TextRegular from "./TextRegular";
import TextSemiBold from "./TextSemiBold";
import { Colours } from "../constants/colours.js";

export default class RecentlyWastedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{}].concat(this.props.items),
    };
  }

  createRows() {
    return this.state.items.map((item, i) => (
      <View style={styles.row} key={item.date || "header"}>
        <View
          style={i !== 0 ? styles.cell : [styles.cell, { borderTopWidth: 1 }]}
        >
          {i !== 0 ? (
            <TextSemiBold
              style={[styles.infoText, { textAlign: "left" }]}
              text={item.name}
            />
          ) : (
            <TextSemiBold
              style={[styles.infoText, { textAlign: "left" }]}
              text={"Item"}
            />
          )}
        </View>
        <View
          style={
            i !== 0
              ? [styles.cell, { justifyContent: "flex-start" }]
              : [styles.cell, { borderTopWidth: 1 }]
          }
        >
          {i !== 0 ? (
            <TextRegular
              style={[styles.infoText, { textAlign: "right" }]}
              text={new Date().toDateString()}
            />
          ) : (
            <TextSemiBold
              style={[styles.infoText, { textAlign: "right" }]}
              text={"Date Wasted"}
            />
          )}
        </View>
        <View
          style={
            i !== 0
              ? [styles.cell, { justifyContent: "flex-start" }]
              : [styles.cell, { borderTopWidth: 1 }]
          }
        >
          {i !== 0 ? (
            <TextRegular
              style={[styles.infoText, { textAlign: "right" }]}
              text={`${item.quantity.toString()} ${item.unitsOfMeasure}`}
            />
          ) : (
            <TextSemiBold
              style={[styles.infoText, { textAlign: "right" }]}
              text={"Quantity"}
            />
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
    height: "auto",
    width: Dimensions.get("window").width * 0.3,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: Colours.divider,
    backgroundColor: Colours.borderedComponentFill,
  },
  infoText: {
    width: "100%",
    fontSize: 11,
    color: Colours.tint,
  },
});
