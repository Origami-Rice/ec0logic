import * as React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import TextRegular from "../components/TextRegular";
import TextMedium from "../components/TextMedium";
import { Colours } from "../constants/colours.js";
import IngredientsTable from "../components/IngredientsTable";

export default class ExpandedRecipeCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView
        style={[
          styles.container,
          { marginBottom: Dimensions.get("window").width * 0.1 },
        ]}
      >
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={this.props.onCancel}
          >
            <TextRegular style={styles.cancelText} text={"x"} />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Image
            style={styles.image}
            source={{
              uri:
                "https://images-gmi-pmc.edge-generalmills.com/94323808-18ab-4d37-a1ef-d6e1ff5fc7ae.jpg",
            }}
            resizeMethod={"scale"}
          />
        </View>
        <TextRegular style={styles.notice} text={"Recipe Credits to"} />
        <TextMedium style={styles.header} text={"Pie"} />
        <View style={styles.divider}></View>
        <TextMedium style={styles.subheading} text={"Ingredients"} />
        <IngredientsTable
          items={[
            { ingredient: "Apples", quantity: "3" },
            { ingredient: "Flour", quantity: "500 g" },
          ]}
        />
        <View style={[styles.divider, { marginTop: 10 }]}></View>
        <TextMedium style={styles.subheading} text={"Instructions"} />
        <TextRegular
          style={[styles.subheading, { marginTop: 0 }]}
          text={"3.14159265358979323846264338327950288419716939937510"}
        />
      </ScrollView>
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
    flexDirection: "column",
    justifyContent: "flex-start",
    marginVertical: 5,
    backgroundColor: Colours.screenBackground,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  topButtonsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  cancelText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    color: Colours.tint,
    zIndex: 1,
  },
  cancelButton: {
    width: 37,
    height: 37,
    borderRadius: 37,
    borderWidth: 1,
    borderColor: Colours.tint,
    justifyContent: "center",
    alignSelf: "flex-end",
    backgroundColor: Colours.screenBackground,
    margin: 25,
    marginBottom: 5,
    zIndex: 1,
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
  image: {
    height: 200,
    width: "100%",
    margin: 10,
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colours.tint,
    alignSelf: "center",
  },
  header: {
    width: "100%",
    textAlign: "left",
    fontSize: 24,
    color: Colours.tint,
    margin: 10,
  },
  subheading: {
    textAlign: "left",
    fontSize: 14,
    color: Colours.tint,
    margin: 10,
  },
  notice: {
    width: "100%",
    textAlign: "right",
    fontSize: 10,
    color: Colours.notice,
    marginHorizontal: 10,
  },
});
