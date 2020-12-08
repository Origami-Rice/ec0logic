import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import TextRegular from "./TextRegular";
import TextMedium from "./TextMedium";
import { Colours } from "../Constants/colours.js";

export default class IngredientsTable extends React.Component {
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
              : [styles.cell, { backgroundColor: Colours.filledButton }]
          }
        >
          {i !== 0 ? (
            <TextRegular style={styles.infoText} text={item.quantity} />
          ) : (
            <TextMedium style={styles.infoText} text={"Quantity"} />
          )}
        </View>
        <View
          style={
            i !== 0
              ? styles.cell
              : [styles.cell, { backgroundColor: Colours.filledButton }]
          }
        >
          {i !== 0 ? (
            <TextRegular style={styles.infoText} text={item.ingredient} />
          ) : (
            <TextMedium style={styles.infoText} text={"Ingredient"} />
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
    width: Dimensions.get("window").width * 0.45,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 5,
    borderWidth: 1,
    borderColor: Colours.tint,
    backgroundColor: Colours.borderedComponentFill,
  },
  infoText: {
    fontSize: 11,
    color: Colours.tint,
    textAlign: "left",
  },
});
